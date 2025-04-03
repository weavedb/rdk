const { connect } = require("@permaweb/ao-scheduler-utils")
const { DB: ZKDB } = require("zkjson")
const fs = require("fs")
const { Connected } = require("./connection")
const { cpSync, rmSync } = require("fs")
const {
  uniq,
  concat,
  equals,
  o,
  sortBy,
  mergeLeft,
  prop,
  last,
  keys,
  isNil,
  is,
  pluck,
  map,
  includes,
  path: _path,
  flatten,
} = require("ramda")
const DB = require("weavedb-offchain")
const { open } = require("lmdb")
const path = require("path")
const EthCrypto = require("eth-crypto")
let arweave = require("arweave")
let AO = null
const getId = async (contractTxId, input, timestamp) => {
  const str = JSON.stringify({
    contractTxId,
    input,
    timestamp,
  })

  return arweave.utils.bufferTob64Url(
    await arweave.crypto.hash(arweave.utils.stringToBuffer(str)),
  )
}

const getHash = async ids => {
  return arweave.utils.bufferTob64(
    await arweave.crypto.hash(
      arweave.utils.concatBuffers(
        map(v2 => arweave.utils.stringToBuffer(v2))(ids),
      ),
      "SHA-384",
    ),
  )
}

const getNewHash = async (last_hash, current_hash) => {
  const hashes = arweave.utils.concatBuffers([
    arweave.utils.stringToBuffer(last_hash),
    arweave.utils.stringToBuffer(current_hash),
  ])
  return arweave.utils.bufferTob64(await arweave.crypto.hash(hashes, "SHA-384"))
}

class Rollup {
  constructor({
    sequencerUrl,
    aos,
    apiKey,
    txid,
    srcTxId,
    rollup = false,
    owner,
    secure,
    dbname = "weavedb",
    dir,
    backup,
    plugins = {},
    tick = null,
    admin = null,
    initial_state = {},
    bundler,
    contractTxId,
    arweave,
    snapshot,
    type = "warp",
  }) {
    if (aos?.mem) {
      const { AO: TAO } = require("wao/test")
      AO = TAO
    } else {
      const { AO: MAO } = require("wao")
      AO = MAO
    }
    this.hash = null
    this.snapshot = snapshot
    this.cb = {}
    this.type = type
    this.aos = aos
    this.sequencerUrl = sequencerUrl
    this.apiKey = apiKey
    this.arweave = arweave
    this.recovering = false
    this.count = 0
    this.height = 0
    this.contractTxId = contractTxId
    this.srcTxId = srcTxId
    this.last_hash = contractTxId
    this.initial_state = initial_state
    this.admin = admin
    this.bundler = bundler
    this.tick = tick
    this.last = 0
    this.secure = secure
    this.owner = owner
    this.rollup = rollup
    this.txid = txid
    this.txs = []
    this.tx_count = 0
    this.bundling = null
    this.kvs = {}
    this.kvs_wal = {}
    this.error_count = 0
    this.partial_recovery = false
    this.full_recovery = false
    this.full_recovery_failure = false
    this.dir = path.resolve(
      dir ?? path.resolve(__dirname, "cache"),
      dbname,
      this.txid,
    )
    this.dir_backup = path.resolve(
      backup ?? path.resolve(__dirname, "backup"),
      dbname,
      this.txid,
    )
    this.plugins = plugins
  }

  async init() {
    await this.initDB()
    if (this.rollup) this.bundle()
  }

  async genZKP(col, doc, path, query) {
    let col_id = this.cols[col]
    let zkp = null
    if (isNil(col_id)) return { err: "collection doesn't exist", zkp }
    let json = null
    try {
      json = await this.db.get(col, doc)
    } catch (e) {
      console.log(e)
    }
    if (!json) return { err: "doc doesn't exist", zkp }
    if (isNil(json[path])) return { err: "path doesn't exist", zkp }
    try {
      const start = Date.now()
      let params = {
        json,
        col_id,
        path,
        id: doc,
      }
      if (query) params.query = query
      zkp = await this.zkdb.genProof(params)
    } catch (e) {
      console.log(e)
      return { err: e }
    }
    return { err: null, zkp, col_id }
  }

  async measureSizes(bundles, last_hash) {
    let sizes = 0
    let b = [{ bundles: [], t: [], size: 0 }]
    let i = 0
    for (let v of bundles) {
      if (isNil(v.data?.input)) continue
      const len = JSON.stringify(v.data.input).length
      const max = 15000
      if (this.type !== "ao" && sizes + len > max) {
        i += 1
        sizes = 0
        b[i] = { bundles: [], t: [], size: 0 }
      }
      b[i].bundles.push(v)
      b[i].t.push(v.data.tx_ts)
      sizes += len
      b[i].size += len
    }
    for (let v of b) {
      if (v.bundles.length === 0) {
        console.log("the query is too large and stuck")
        break
      }
      const ids = map(_path(["data", "txid"]))(v.bundles)
      const current_hash = await getHash(ids)
      const new_hash = await getNewHash(last_hash, current_hash)
      v.hash = new_hash
      last_hash = new_hash
    }
    return b
  }

  async _bundle() {
    return new Promise(async _res => {
      try {
        if (this.init_warp !== true) {
          _res({ err: null, len: 0, success: null })
        } else {
          const bundling = await this.wal.cget(
            "txs",
            ["commit"],
            ["id"],
            ["commit", "==", false],
          )
          if (bundling.length > 0) {
            const b = await this.measureSizes(bundling, this.last_hash)
            this.cb[++this.count] = (
              _err,
              { err, results, success, state },
            ) => {
              _res({
                state,
                success,
                err,
                len: b.length,
                results,
              })
            }
            if (this.type === "ao") {
              let height = this.height
              let results = []
              let validity = {}
              let _hash = this.last_hash
              // need fix
              for (let v of b) {
                const { bundles, hash, t } = v
                _hash = hash
                const diffs = o(flatten, map(_path(["data", "diff"])))(bundles)
                let _zkp = null
                if (diffs.length > 0) {
                  for (const v of diffs) {
                    let col_id = this.cols[v.collection]
                    if (isNil(col_id)) {
                      col_id = await this.zkdb.addCollection()
                      this.cols[v.collection] = col_id
                    }
                    const res = await this.zkdb.insert(col_id, v.doc, v.data)
                  }
                  let txs = diffs.map(v => {
                    const col_id = this.cols[v.collection]
                    return [col_id, v.doc, v.data]
                  })
                  _zkp = this.zkdb.tree.F.toObject(
                    this.zkdb.tree.root,
                  ).toString()
                  console.log("zkp hash:", _zkp)
                }
                const txs = map(v => {
                  return {
                    id: v.data.txid,
                    ts: v.data.tx_ts,
                    input: v.data.input,
                  }
                })(bundles)
                const data = {
                  diffs: map(v => {
                    v.data = v.diff
                    delete v.diff
                    return v
                  })(diffs),
                  txs,
                  tx_height: last(bundles).id * 1,
                  block_height: ++height,
                  hash,
                  zkdb: _zkp,
                }
                console.log("rolling up............................")
                const { err, mid, res } = await this.syncer.msg({
                  pid: this.contractTxId,
                  act: "Rollup",
                  data,
                  check: "committed!",
                })
                console.log(res.Messages[0])
                if (!err) {
                  results.push({
                    hash,
                    height,
                    tx: { originalTxId: mid },
                    items: v,
                    //duration: result.duration,
                  })
                  validity[mid] = true
                  this.hash = _zkp
                } else if (res.Messages[0]) {
                  results.push({
                    hash,
                    height,
                    tx: { originalTxId: mid },
                    items: v,
                    //duration: result.duration,
                  })
                  validity[mid] = true
                  this.hash = _zkp
                } else {
                  // [TODO] need to handle this
                  console.log(data)
                  console.log(err)
                  console.log(
                    (
                      await this.syncer.result({
                        message: mid,
                        process: this.contractTxId,
                      })
                    ).Messages[0].Tags,
                  )
                  console.log("something went wrong with bundling")
                }
              }
              this.height = height
              this.last_hash = _hash
              const state = { validity, state: { rollup: { height } } }
              _res({
                state,
                success: true,
                err: null,
                len: b.length,
                results,
              })
            }
          } else {
            _res({ err: null, len: 0, success: null })
          }
        }
      } catch (e) {
        console.log(e)
        _res({ err: true, success: false, len: 0 })
      }
    })
  }

  async bundle() {
    let done = false
    let recovery = false
    setTimeout(
      () => {
        if (!done) {
          recovery = true
          console.log("this must be stuck....")
          this.init_warp = false
          this.initSyncer()
          this.bundle()
        }
      },
      this.aos?.mem ? 2000 : 20000,
    )
    let { err, success, len, results, state } = await this._bundle()
    done = true
    if (recovery) console.log("this process is aborted!")
    if (success) {
      let valids = {}
      let valid_height = 0
      try {
        valids = state?.validity ?? {}
        valid_height = state?.state?.rollup?.height ?? 0
      } catch (e) {
        console.log(e)
      }
      for (let v of sortBy(prop("height"))(results)) {
        console.log(
          `valid: ${valids[v.tx.originalTxId]} : [${v.height}] : ${
            v.tx.originalTxId
          }`,
        )
        if (v.height > valid_height) {
          console.log(`commit not valid ${v.height} > ${valid_height}`)
          err = true
          break
        }
        if (v.height > this.height) {
          this.height = v.height
          this.last_hash = v.hash
        }
        let batch = map(
          v2 => [
            "update",
            {
              commit: true,
              warp: v.tx.originalTxId,
              block: v.height,
            },
            "txs",
            v2.id,
          ],
          v.items.bundles,
        )
        batch.push([
          "set",
          {
            height: v.height,
            txs: map(_path(["data", "txid"]))(v.items.bundles),
            date: v.tx.bundlerResonse?.timestamp ?? Date.now(),
            txid: v.tx.originalTxId,
            hash: v.hash,
          },
          "blocks",
          `${v.height}`,
        ])
        await this.wal.batch(batch)
      }
      if (err !== true) this.error_count = 0
    }
    if (err) this.error_count += 1
    if (this.error_count < 2) {
      setTimeout(() => this.bundle(), success === true ? 0 : 3000)
    } else {
      console.log("too many errors", this.error_count)
      this.recover()
    }
  }

  async recover() {
    this.init_warp = false
    this.error_count = 0
    this.cb[++this.count] = (
      err,
      { partial_recovery, full_recovery, full_recovery_failure, success },
    ) => {
      if (err) {
        console.log(`warp recovery unsuccessful... ${this.contractTxId}`)
      } else {
        console.log(`warp successfully recovered! ${this.contractTxId}`)
        this.init_warp = true
        this.bundle()
      }
      this.partial_recovery = partial_recovery
      this.full_recovery = full_recovery
      this.full_recovery_failure = full_recovery_failure
    }
    if (this.type === "ao") {
      // TODO: need implementation
      console.log("ao is not recoverable at the moment")
    }
  }

  async initDB() {
    console.log(
      `[${this.srcTxId}] Owner Account: ${this.owner}.......................................................`,
    )
    await this.initWAL()
    await this.initOffchain()
    await this.initZKDB()
    await this.initWarp()
    await this.initPlugins()
  }

  /*
  async recoverWAL() {
    this.recovering = true
    this.cb[++this.count] = async (err, { txs }) => {
      if (err) {
        console.log(`recover WAL unsuccessful... ${this.contractTxId}`)
      } else {
        console.log(`WAL successfully recovered! ${this.contractTxId}`)
        // need L1 copy and L2 copy
        const _arweave = arweave.init(this.arweave)
        const bundler = await _arweave.wallets.jwkToAddress(this.bundler)
        const state = {
          ...{
            owner: this.owner,
            secure: this.secure ?? true,
            bundlers: [bundler],
            auth: {
              algorithms: ["secp256k1", "secp256k1-2", "ed25519", "rsa256"],
              name: "weavedb",
              version: "1",
              //skip_validation: true,
            },
            bridges: ["ethereum"],
          },
        }
        try {
          rmSync(path.resolve(this.dir, "__temp__"), {
            recursive: true,
            force: true,
          })
        } catch (e) {
          console.log(e)
        }
        const l1 = new DB({
          caller: bundler,
          contractTxId: this.contractTxId,
          type: 3,
          cache: {
            initialize: async obj => {
              obj.lmdb = open({
                path: path.resolve(this.dir, "__temp__"),
              })
              let saved_state = await obj.lmdb.get("state")
              if (!isNil(saved_state)) obj.state = saved_state
              console.log(`DB initialized!`)
              console.log(obj.state)
            },
            onWrite: async (tx, obj, param) => {
              let prs = [obj.lmdb.put("state", tx.state)]
              for (const k in tx.result.kvs) {
                prs.push(obj.lmdb.put(k, tx.result.kvs[k]))
              }
              await Promise.all(prs).then(() => {})
            },
            get: async (key, obj) => {
              let val
              if (typeof val === "undefined") val = await obj.lmdb.get(key)
              return val
            },
          },
          state,
        })
        await l1.initialize()
        let valid_txs = []
        let raw_txs = {}
        let blocks = {}
        this.recovery_map = {}
        for (let v of txs) {
          const block_time = v.block.timestamp * 1000
          let input = null
          for (const tag of v.tags || []) {
            if (tag.name === "Input") {
              input = JSON.parse(tag.value)
              if (input.function === "bundle") {
                const compressed = new Uint8Array(
                  Buffer.from(input.query, "base64")
                    .toString("binary")
                    .split("")
                    .map(function (c) {
                      return c.charCodeAt(0)
                    }),
                )
                const query = JSON.parse(
                  pako.inflate(compressed, { to: "string" }),
                )
                let ids = []
                for (let [i, input] of query.q.entries()) {
                  const id = await getId(this.contractTxId, input, query.t[i])
                  ids.push(id)
                }
                blocks[query.n] = { ids, query, date: block_time, txid: v.id }
                for (const [i, input] of query.q.entries()) {
                  const id = ids[i]
                  raw_txs[id] ??= {}
                  raw_txs[id][query.n] = { q: input, t: query.t[i] }
                }
                break
              }
            }
          }
          const tx = await l1.write(
            input.function,
            input,
            undefined,
            undefined,
            undefined,
            undefined,
            block_time,
          )
          if (tx?.success) {
            const validities = await l1.getValidities(tx.originalTxId)
            let _blocks = {}
            for (const v2 of validities) {
              if (v2[2] === 0) {
                _blocks[v2[1]] ??= []
                _blocks[v2[1]].push(v2[0])
                valid_txs.push(v2)
                this.recovery_map[v2[0]] = {
                  warp: blocks[v2[1]].txid,
                  block: v2[1],
                }
                const input = raw_txs[v2[0]][v2[1]]
                if (!isNil(input)) {
                  const _tx = await this.db.write(
                    input.q.function,
                    input.q,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    input.t,
                  )
                }
              }
            }
            for (const k in _blocks) {
              const b = blocks[k]
              await this.wal.set(
                {
                  height: +k,
                  txs: _blocks[k],
                  date: b.date,
                  txid: b.txid,
                  hash: b.h,
                },
                "blocks",
                k,
              )
            }
          }
        }
        const info = await l1.getInfo()
        console.log("rollup fully recovered")
        console.log(info.rollup)
        this.height = info.rollup.height
        this.last_hash = info.rollup.hash
      }
      this.recovering = false
    }
    this.syncer.send({
      id: this.count,
      op: "txs",
      opt: {},
    })
  }*/

  async initSyncer() {
    if (this.type === "ao") {
      if (isNil(this.srcTxId)) {
        console.log("srcTxId is missing...", this.contractTxId)
        return
      }
      this.syncer = await new AO(this.aos).init(this.bundler)
      // we need recovery here....read tx from SU
      let res = { error: true }
      if (this.aos.mem) {
        res = { edges: [] }
      } else {
        let opt = {}
        if (!isNil(this.aos?.aoconnect?.GATEWAY_URL)) {
          opt.GRAPHQL_URL = `${this.aos.aoconnect.GATEWAY_URL}/graphql`
        }
        const { validate, locate, raw } = connect(opt)
        let { url, address } = await locate(this.contractTxId)
        if (url === "http://su") url = "http://localhost:4003"
        res = fetch(`${url}/${this.contractTxId}`).then(r => r.json())
      }
      if (res.error) {
        console.log(res.error)
      } else {
        let items = 0
        for (let v of res?.edges ?? []) {
          const v2 = v.node
          try {
            const json = JSON.parse(v2.message.data)
            for (const v3 of json?.diffs ?? []) {
              items++
              let col_id = this.cols[v3.collection]
              if (isNil(col_id)) {
                col_id = await this.zkdb.addCollection()
                // colnumber not consistent
                this.cols[v3.collection] = col_id
              }
              await this.zkdb.insert(col_id, v3.doc, v3.data)
            }
            this.hash = this.zkdb.tree.F.toObject(
              this.zkdb.tree.root,
            ).toString()
          } catch (e) {}
        }
        console.log("zkp hash:", this.hash, items, "items recovered")
        console.log(this.cols)
      }
      this.init_warp = true
      return
    }
  }

  async initPlugins() {
    for (let k in this.plugins) {
      const Plugin = require(`./plugins/${k}`)
      this.plugins[k].db = new Plugin({
        owner: this.plugins[k].owner ?? this.owner,
        dir: this.plugins[k].dir ?? this.dir,
        db: this.db,
        txid: this.txid,
      })
      await this.plugins[k].db.pdb.initialize()
      console.log(`plugin initialized: ${k}`)
      const last_wal =
        (await this.plugins[k].db.pdb.get("conf", k))?.last_wal ?? null
      console.log(JSON.stringify(last_wal))
      console.log(`last WAL: ${last_wal}`)
      await this.getWAL(last_wal, this.plugins[k].db)
    }
  }

  async initWAL() {
    this.wal = new DB({
      type: 3,
      local: true,
      noauth: true,
      cache: {
        initialize: async obj => {
          obj.lmdb_wal = open({
            path: path.resolve(this.dir, "wal"),
          })
          let saved_state = await obj.lmdb_wal.get("state")
          if (!isNil(saved_state)) obj.state = saved_state
        },
        onWrite: async (tx, obj, param) => {
          let prs = [obj.lmdb_wal.put("state", tx.state)]
          for (const k in tx.result.kvs) {
            this.kvs_wal[k] = tx.result.kvs[k]
            prs.push(obj.lmdb_wal.put(k, tx.result.kvs[k]))
          }
          await Promise.all(prs).then(() => {})
        },
        get: async (key, obj) => {
          let val = this.kvs_wal[key]
          if (typeof val === "undefined") val = await obj.lmdb_wal.get(key)
          return val
        },
      },
      state: {
        owner: this.owner,
        secure: false,
        auth: {
          algorithms: ["secp256k1", "secp256k1-2", "ed25519", "rsa256"],
          name: "weavedb",
          version: "1",
          //skip_validation: true,
        },
      },
    })
    await this.wal.initialize()
    await this.wal.addIndex([["commit"], ["id"]], "txs")
    await this.wal.addIndex([["input.caller"], ["id", "desc"]], "txs")
    await this.wal.addIndex([["block"], ["id", "desc"]], "txs")
    this.tx_count = (await this.wal.get("txs", ["id", "desc"], 1))[0]?.id ?? 0
    const last_block = await this.wal.get("blocks", ["height", "desc"], 1)
    this.height = last_block[0]?.height ?? 0
    this.last_hash = last_block[0]?.hash ?? this.contractTxId
    console.log(
      `${this.tx_count} txs has been cached: ${this.height} blocks commited`,
    )
  }
  async initZKDB() {
    this.zkdb = new ZKDB({
      wasmRU: path.resolve(__dirname, "circom/rollup/index_js/index.wasm"),
      zkeyRU: path.resolve(__dirname, "circom/rollup/index_0001.zkey"),
      wasm: path.resolve(__dirname, "circom/db/index_js/index.wasm"),
      zkey: path.resolve(__dirname, "circom/db/index_0001.zkey"),
    })
    await this.zkdb.init()
    this.cols = {}
  }
  async initOffchain() {
    let state = {
      ...{
        owner: this.owner,
        secure: this.secure ?? true,
        auth: {
          algorithms: [
            "secp256k1",
            "secp256k1-2",
            "ed25519",
            "rsa256",
            "rsa-pss",
          ],
          name: "weavedb",
          version: "1",
          //skip_validation: true,
        },
        bridges: ["ethereum"],
      },
      ...this.initial_state,
    }
    this.db = new DB({
      local: true,
      contractTxId: this.contractTxId ?? this.txid,
      type: 3,
      cache: {
        initialize: async obj => {
          obj.lmdb = open({
            path: path.resolve(this.dir, "rollup"),
          })
          let saved_state = await obj.lmdb.get("state")
          if (!isNil(saved_state)) obj.state = saved_state
          console.log(`DB initialized!`)
          console.log(obj.state)
        },
        onWrite: async (tx, obj, param) => {
          let prs = [obj.lmdb.put("state", tx.state)]
          let diff = []
          for (const k in tx.result.kvs) {
            if (k.split("///")[1]?.split("/")[0] === "data") {
              let op = "none"
              let val = null
              if (isNil(this.kvs[k]) && !isNil(tx.result.kvs[k])) {
                op = "set"
                val = tx.result.kvs[k].val
              } else if (!isNil(this.kvs[k]) && isNil(tx.result.kvs[k])) {
                op = "delete"
                val = null
              } else if (!equals(this.kvs[k].val, tx.result.kvs[k].val)) {
                op = "update"
                const v1 = this.kvs[k].val ?? {}
                const v2 = tx.result.kvs[k].val ?? {}
                const keys1 = keys(v1)
                const keys2 = keys(v2)
                val = {}
                const keys3 = o(uniq, concat(keys1))(keys2)
                for (const v of keys3) {
                  if (v1[v] !== v2[v]) val[v] = v2[v] ?? null
                }
              }
              let sps = k.split("///")
              diff.push({
                op,
                collection: sps[0],
                doc: k.split("///")[1]?.split("/")[1],
                data: tx.result.kvs[k].val ?? null,
                diff: val,
              })
            }
            this.kvs[k] = tx.result.kvs[k]
            prs.push(obj.lmdb.put(k, tx.result.kvs[k]))
          }
          Promise.all(prs).then(() => {})
          let t = {
            id: ++this.tx_count,
            txid: tx.result.transaction.id,
            commit: false,
            tx_ts: tx.result.transaction.timestamp,
            input: param,
            docID: tx.result.docID,
            doc: tx.result.doc,
            diff,
          }
          if (this.recovering && !isNil(this.recovery_map[t.txid])) {
            t = mergeLeft(this.recovery_map[t.txid], t)
          }
          this.wal.set(t, "txs", `${t.id}`).then(async res => {
            if (!res.success) console.log("wal error")
          })
          this.last = Date.now()
          for (let k in this.plugins) {
            this.plugins[k].db
              .exec({ id: t.id, data: t })
              .catch(e => console.log("err", e))
          }
        },
        get: async (key, obj) => {
          let val = this.kvs[key]
          if (typeof val === "undefined") val = await obj.lmdb.get(key)
          return val
        },
      },
      state,
    })
    await this.db.initialize()
    if (!isNil(this.tick)) {
      setInterval(async () => {
        if (Date.now() - this.last > this.tick) {
          await this.db.tick({ privateKey: this.admin })
        }
      }, this.tick)
    }
  }

  async initWarp() {
    if (this.rollup && !isNil(this.contractTxId)) {
      await this.initSyncer()
    }
  }

  async getWAL(next = null, pdb) {
    const limit = 10
    let params = ["txs", ["id"]]
    if (!isNil(next)) params.push(["startAfter", next])
    let cache = {}
    const txs = await this.wal.cget(...params, limit)
    for (let v of txs) await pdb.exec(v, cache)
    if (txs.length === limit) this.getWAL(last(txs), pdb)
  }

  async execUser(parsed) {
    const { type, res, nocache, txid, func, query } = parsed
    if (type === "log" && !includes(func)(["get", "cget"])) {
      res("only get/cget is allowed with log", null)
      return
    }
    const _query = JSON.parse(query)
    const key = DB.getKeyInfo(
      type,
      !isNil(_query.query) ? _query : { function: func, query: _query },
    )
    let data = null
    let result, err, dryWrite
    ;({ result, err, dryWrite } = await this.sendQuery(parsed, key))
    //if (!dryWrite) res(err, result)
    res(err, result)
  }

  async sendQuery({ type, func, txid, nocache, query, res }, key) {
    let result = null
    let err = null
    let dryWrite = false
    let _onDryWrite = null
    const db =
      type === "log"
        ? this.wal
        : type === "offchain"
          ? this.db
          : this.plugins[type]?.db?.pdb
    if (isNil(db)) res("DB not found", null)
    try {
      let _query = query === `""` ? [] : JSON.parse(query)
      if (is(Object, _query) && is(Object, _query.dryWrite)) {
        _onDryWrite = _query.dryWrite
        delete _query.dryWirte
      }
      if (func === "getNonce") {
        result = await db.getNonce(..._query)
      } else if (key.func === "cget") {
        if (nocache) {
          result = await db.cget(..._query, true)
        } else {
          result = await db.cget(..._query)
        }
        if (key.type === "collection") {
          if (func === "get") result = pluck("data", result)
        } else {
          if (func === "get") result = isNil(result) ? null : result.data
        }
      } else if (includes(func)(db.reads)) {
        if (includes(func)(["getVersion"]) || nocache) {
          try {
            _query.push(true)
          } catch (e) {
            console.log(e)
          }
        }
        result = await db[key.func](..._query)
      } else {
        dryWrite = !nocache
        let virtual_txid = null
        const cache = _onDryWrite?.cache || true
        const onDryWrite = nocache
          ? null
          : {
              cb: _res => {
                delete _res.state
                res(null, _res)
                virtual_txid = _res?.result?.transaction?.id || null
              },
              cache,
              read: _onDryWrite?.read || null,
            }
        //result = { success: true }
        result = await db.write(key.func, _query, true, true, false, onDryWrite)
        //if (!isNil(virtual_txid)) this.results[virtual_txid] = result
      }
    } catch (e) {
      err =
        typeof e === "string"
          ? e
          : typeof e.message === "string"
            ? e.message
            : "unknown error"
    }
    return { result, err, dryWrite }
  }
}

class RNode {
  constructor() {
    this.rollup = null
    this.funcs = {
      _: ({ op, id, send }) => send({ op, id }),
      new: ({ op, id, msg, send }) => {
        this.rollup = new Rollup(msg.params)
      },
      init: async ({ op, id, msg, send }) => {
        await this.rollup.init()
        send({ err: null, result: null, op, id })
      },
      execUser: async ({ op, id, msg, send }) => {
        this.rollup.execUser({
          ...msg.params,
          res: (err, result) => send({ err, result, op, id }),
        })
      },
      deploy_contract: async ({ msg, send, op, id }) => {
        this.rollup.type = msg.type
        this.rollup.ao = msg.ao
        this.rollup.contractTxId = msg.contractTxId
        this.rollup.last_hash = msg.contractTxId
        this.rollup.db.contractTxId = msg.contractTxId
        this.rollup.rollup = true
        this.rollup.srcTxId = msg.srcTxId
        await this.rollup.initWarp()
        this.rollup.bundle()
        send({ op, id })
      },
      hash: async ({ msg, send, op, id }) => {
        send({ op, id, result: { hash: this.rollup.hash } })
      },
      zkp: async ({ msg, send, op, id }) => {
        const { err, zkp, col_id } = await this.rollup.genZKP(
          msg.collection,
          msg.doc,
          msg.path,
          msg.query,
        )
        send({
          op,
          id,
          err,
          result: { zkp, col_id },
        })
      },
    }
  }
}

const rnode = new RNode()

new Connected({ parent: process, funcs: rnode.funcs })

module.exports = RNode
