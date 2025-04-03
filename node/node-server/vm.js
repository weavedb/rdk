const Arweave = require("arweave")
const SDK = require("weavedb-node-client")
const { Wallet, isAddress } = require("ethers")
const { validate } = require("./lib/validate")
const Snapshot = require("./lib/snapshot")
const { readFileSync } = require("fs")
const { resolve } = require("path")
const RNode = require("./rollup")
const VNode = require("./validator")
const CNode = require("./committer")
let AO = null
const {
  all,
  indexBy,
  prop,
  concat,
  mergeLeft,
  isNil,
  includes,
  mapObjIndexed,
  is,
} = require("ramda")

const { privateToAddress } = require("ethereumjs-util")
const path = require("path")
const { fork } = require("child_process")

const { Connect, Connected } = require("./connection")

class Committer {
  constructor(params) {
    this.cb = {}
    const cnode = new CNode()
    const c = params.aos.mem
      ? new Connected({ funcs: cnode.funcs })
      : fork(path.resolve(__dirname, "committer"))
    this.db = new Connect({
      c,
      setParent: params.aos.mem ? true : false,
      op: "new",
      params,
    })
  }
  kill() {
    this.db.kill()
  }
}

class Validator {
  constructor(params) {
    this.cb = {}
    const vnode = new VNode()
    const c = params.aos.mem
      ? new Connected({ funcs: vnode.funcs })
      : fork(path.resolve(__dirname, "validator"))
    this.db = new Connect({
      c,
      setParent: params.aos.mem ? true : false,
      op: "new",
      params,
    })
  }
  kill() {
    this.db.kill()
  }
}

class Rollup {
  constructor({
    type,
    srcTxId,
    txid,
    secure,
    owner,
    dbname,
    dir,
    plugins,
    tick,
    admin,
    bundler,
    contractTxId,
    rollup,
    initial_state = {},
    arweave,
    sequencerUrl,
    apiKey,
    snapshot,
    ao,
    aos,
  }) {
    this.cb = {}
    this.txid = txid
    const rnode = new RNode()
    const c = aos.mem
      ? new Connected({ funcs: rnode.funcs })
      : fork(path.resolve(__dirname, "rollup"))

    this.db = new Connect({
      c,
      setParent: aos.mem ? true : false,
      op: "new",
      params: {
        aos,
        type,
        snapshot,
        srcTxId,
        sequencerUrl,
        apiKey,
        arweave,
        txid,
        secure,
        owner,
        dbname,
        dir,
        plugins,
        tick,
        admin,
        initial_state,
        bundler,
        contractTxId,
        rollup,
      },
    })
  }
  init(afterInit) {
    this.db.to({ op: "init", cb: afterInit })
  }
  execUser(parsed) {
    const cb = parsed.res
    delete parsed.res
    try {
      this.db.to({ op: "execUser", params: { params: parsed }, cb })
    } catch (e) {
      console.log(e)
    }
  }
  hash(res) {
    try {
      this.db.to({ op: "hash", cb: res })
    } catch (e) {
      console.log(e)
    }
  }
  zkp(collection, doc, path, query, res) {
    try {
      this.db.to({
        op: "zkp",
        params: { collection, doc, path, query },
        cb: res,
      })
    } catch (e) {
      console.log(e)
    }
  }
  deployContract(contractTxId, srcTxId, res, type = "warp", ao) {
    try {
      this.db.to({
        cb: res,
        op: "deploy_contract",
        params: {
          type,
          contractTxId,
          srcTxId,
          ao,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  kill() {
    this.db.kill()
  }
}

class VM {
  constructor({ dbname, conf }) {
    if (conf.aos?.mem) {
      const { AO: TAO } = require("wao/test")
      AO = TAO
    } else {
      const { AO: MAO } = require("wao")
      AO = MAO
    }
    this.conf = conf
    if (!isNil(dbname)) this.conf.dbname = dbname
    // TODO: more prisice validations
    this.conf.dbname ??= "weavedb"
    if (isNil(this.conf.bundler)) throw Error("bundler is not defined")
    if (isNil(this.conf.admin_contract))
      throw Error("admin_contract is not defined")
    if (isNil(this.conf.admin)) throw Error("admin is not defined")
    this.admin = new Wallet(this.conf.admin)
    console.log(`Rollup Admin: ${this.admin.address}`)
    this.rollups = {}
    this.txid_map = {}
    this.init()
  }
  getRollup(v, txid) {
    return new Rollup({
      aos: this.conf.aos,
      type: v.type,
      snapshot: this.conf.snapshot,
      sequencerUrl: this.conf.sequencerUrl,
      apiKey: this.conf.apiKey,
      arweave: this.conf.arweave,
      txid,
      secure: v.secure ?? this.conf.secure,
      owner: v.owner ?? this.conf.owner,
      dbname: v.dbname ?? this.conf.dbname,
      dir: v.dir ?? this.conf.dir,
      plugins: v.plugins ?? this.conf.plugins ?? {},
      tick: v.tick ?? this.conf.tick ?? null,
      admin: this.conf.admin,
      initial_state: v.initial_state ?? this.conf.initial_state,
      bundler: this.conf.bundler,
      contractTxId: v.contractTxId ?? null,
      rollup: v.rollup ?? false,
      srcTxId: v.srcTxId,
    })
  }
  async init() {
    const admin_db = this.getRollup(
      { secure: true, plugins: {}, owner: this.admin.address.toLowerCase() },
      "__admin__",
    )
    admin_db.init(async () => {
      const auth = { privateKey: this.conf.admin }
      this.admin_db = new SDK({ rollup: admin_db })
      const signer = this.admin.address.toLowerCase()
      const rules = [
        [
          "write",
          [
            ["=$isAdmin", ["equals", "$signer", signer]],
            ["allowif()", "$isAdmin"],
          ],
        ],
      ]
      // we dont' need to set rules every time we start it out
      const tx = await this.admin_db.setRules(rules, "dbs", auth)
      const tx2 = await this.admin_db.setRules(rules, "validators", auth)
      const tx3 = await this.admin_db.setRules(rules, "committers", auth)
      console.log(
        `__admin__ rules added: ${tx.success}: ${tx2.success}: ${tx3.success}`,
      )
      const rollups = this.conf.rollups || {
        offchain: { owner: this.conf.admin },
      }
      const dbs = indexBy(prop("id"), await this.admin_db.cget("dbs"))
      for (let k in rollups) {
        if (isNil(dbs[k])) await this.admin_db.set(rollups[k], "dbs", k, auth)
      }
      for (let k in dbs) rollups[k] = dbs[k].data

      for (let k in rollups) {
        const ru = rollups[k]
        const contractTxId = ru.contractTxId
        if (!isNil(contractTxId)) {
          this.txid_map[contractTxId] = k
          const dbname = ru.dbname ?? this.conf.dbname
          const dir = path.resolve(
            ru.dir ?? this.conf.dir ?? path.resolve(__dirname, "cache"),
            dbname,
            k,
          )
          // is this working??
          await this.checkSnapShot({ dbname, dir, contractTxId })
        }
        this.rollups[k] = this.getRollup(ru, k)
        this.rollups[k].init(() => {})
      }
    })
  }

  async checkSnapShot({ dbname, contractTxId, dir }) {
    if (isNil(this.conf.snapshot)) return
    const snapshot = new Snapshot({ ...this.conf.snapshot, dir })
    try {
      await snapshot.recover(contractTxId)
      console.log("snapshot found", contractTxId)
    } catch (e) {
      console.log(e)
    }
  }

  parseQuery(call, callback) {
    const res = (err, result = null) => {
      callback(null, {
        result: isNil(result) ? null : JSON.stringify(result),
        err,
      })
    }
    const { method, query, nocache } = call.request
    const [func, id] = method.split("@")
    let txid, type
    if (!isNil(id)) {
      ;[txid, type] = id.split("#")
    }
    type ??= "offchain"
    return { type, nocache, res, txid, func, query, isAdmin: func === "admin" }
  }

  async query(call, callback) {
    try {
      const parsed = this.parseQuery(call, callback)
      const { type, res, nocache, txid, func, query, isAdmin } = parsed
      if (isAdmin) {
        let {
          op,
          key,
          db,
          type,
          collection,
          doc,
          path,
          pid,
          query: query2,
        } = JSON.parse(query).query
        const auth = { privateKey: this.conf.admin }
        let err, signer
        const ao2 = new AO(this.conf.aos)
        switch (op) {
          case "add_committer":
            ;({ err, signer } = await validate(JSON.parse(query), txid))
            let committer = null
            let committer_addr = null
            for (let v of this.conf.committers ?? []) {
              if (v.address.toLowerCase() === signer) {
                committer = v
                committer_addr = signer
              }
            }
            const val2 = await this.admin_db.get("committers", signer)
            if (val2?.dbs?.[txid]) callback("already exists")
            else {
              const _val = new Committer({
                alchemy_key: this.conf.alchemy_key,
                evm_network: this.conf.evm_network,
                contract: this.conf.zk_contract,
                staking: this.conf.staking,
                aos: this.conf.aos,
                pid,
                committer,
              })
              await this.admin_db.upsert(
                { addr: signer, dbs: this.admin_db.union([txid]) },
                "committers",
                signer,
                auth,
              )
              callback(null, {
                result: JSON.stringify({ committer: committer_addr }),
              })
            }
            break
          case "add_validator":
            ;({ err, signer } = await validate(JSON.parse(query), txid))
            let validator = null
            let validator_addr = null
            for (let v of this.conf.validators ?? []) {
              if ((await ao2.ar.toAddr(v)) === signer) {
                validator = v
                validator_addr = signer
              }
            }
            const val = await this.admin_db.get("validators", signer)
            if (val?.dbs?.[pid]) callback("already exists")
            else {
              const _val = new Validator({
                staking: this.conf.staking,
                aos: this.conf.aos,
                pid,
                addr: validator_addr,
                jwk: validator,
              })
              await this.admin_db.upsert(
                { addr: signer, dbs: this.admin_db.union([pid]) },
                "validators",
                signer,
                auth,
              )
              callback(null, {
                result: JSON.stringify({ validator: validator_addr }),
              })
            }
            break
          case "stats":
            const _arweave = this.conf.arweave ?? {
              host: "arweave.net",
              port: 443,
              protocol: "https",
            }
            const arweave = Arweave.init(_arweave)
            const bundler = await arweave.wallets.jwkToAddress(
              this.conf.bundler,
            )
            if (isNil(key)) {
              callback(null, {
                result: JSON.stringify({
                  bundler,
                  dbs: await this.admin_db.cget("dbs"),
                }),
                err: null,
              })
            } else {
              callback(null, {
                result: JSON.stringify({
                  bundler,
                  db: await this.admin_db.cget("dbs", key),
                }),
                err: null,
              })
            }

            break
          case "zkp":
            this.rollups[key].zkp(collection, doc, path, query2, (err, res) => {
              callback(null, {
                result: JSON.stringify({ zkp: res.zkp, col_id: res.col_id }),
                err: null,
              })
            })
            break
          case "hash":
            this.rollups[key].hash((err, res) => {
              callback(null, {
                result: JSON.stringify({ hash: res.hash }),
                err: null,
              })
            })
            break
          case "deploy_contract":
            ;({ err, signer } = await validate(JSON.parse(query), txid))
            const _db = await this.admin_db.get("dbs", key)
            if (isNil(_db)) {
              callback(null, { result: null, err: `${key} doesn't exists` })
              return
            } else if (signer !== _db.admin) {
              callback(null, {
                result: null,
                err: `signer [${signer}] is not DB admin [${db.admin}]`,
              })
              return
            } else if (isNil(key)) {
              callback(null, { result: null, err: "key is not specified" })
              return
            } else {
              if (!isNil(_db.contractTxId)) {
                callback(null, {
                  result: null,
                  err: `${_db.contractTxId} already deployed`,
                })
                return
              } else if (_db.rollup !== true) {
                callback(null, {
                  result: null,
                  err: `rollup setting is off, it cannot be changed after deployment`,
                })
                return
              } else {
                type ??= "warp"
                let initialState = {
                  version: this.conf.weavedb_version ?? "0.45.0",
                  canEvolve: true,
                  evolve: null,
                  secure: _db.secure ?? this.conf.secure,
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
                    links: {},
                  },
                  crons: {
                    lastExecuted: 0,
                    crons: {},
                  },
                  contracts: {},
                  triggers: {},
                  tokens: {
                    available: {},
                    available_l2: {},
                    locked: {},
                    allocated: {},
                  },
                  bridges: ["ethereum"],
                  max_doc_size: 256,
                  max_collection_id_length: 28,
                }
                const _arweave = this.conf.arweave ?? {
                  host: "arweave.net",
                  port: 443,
                  protocol: "https",
                }
                const arweave = Arweave.init(_arweave)
                const bundler = await arweave.wallets.jwkToAddress(
                  this.conf.bundler,
                )
                initialState.owner = _db.owner
                initialState.bundlers = [bundler]
                if (type === "ao") {
                  initialState.contracts = {
                    ethereum: "ethereum",
                    dfinity: "dfinity",
                    nostr: "nostr",
                    bundler: "bundler",
                    polygonID: "polygon-id",
                    jsonschema: "jsonschema",
                  }

                  const ao = await new AO(this.conf.aos).init(this.conf.bundler)
                  const data = readFileSync(
                    resolve(__dirname, "./lua/weavedb.lua"),
                    "utf8",
                  )
                  const { pid } = await ao.deploy({
                    src_data: data,
                    fills: { BUNDLER: bundler, STAKING: this.conf.staking },
                  })
                  const stake = ao.p(this.conf.staking)
                  try {
                    await stake.m(
                      "Add-DB",
                      {
                        Allocations: {
                          infra: "40",
                          protocol: "10",
                          validators: "40",
                          [_db.owner]: "10",
                        },
                        Node: 1,
                        Price: "1000000000000",
                        DB: pid,
                        Validators: 2,
                        "Min-Stake": "1000000000000000000",
                      },
                      { check: "db added!" },
                    )
                    console.log("db added to the staking process...")
                  } catch (e) {
                    console.log(e)
                  }
                  const tx = await this.admin_db.update(
                    {
                      contractTxId: pid,
                      type: "ao",
                      srcTxId: this.conf.aos.module,
                    },
                    "dbs",
                    key,
                    auth,
                  )
                  console.log(
                    `contract deployed: ${pid} [${key}:${tx.success}]`,
                  )
                  callback(null, {
                    result: JSON.stringify({
                      contractTxId: pid,
                      srcTxId: this.conf.aos.module,
                    }),
                    err,
                  })
                  this.txid_map[pid] = key
                  this.rollups[key].deployContract(
                    pid,
                    this.conf.aos.module,
                    () => {
                      console.log(`AO contract initialized! ${pid}`)
                    },
                    "ao",
                    this.conf.ao,
                  )
                  return
                }
              }
            }
            break
          case "add_db":
            ;({ err, signer } = await validate(JSON.parse(query), txid))
            const ao = await new AO(this.conf.aos).init(this.conf.bundler)
            let token = "0"
            try {
              const { out } = await ao.dry({
                pid: this.conf.admin_contract,
                act: "Balance",
                tags: { Target: signer },
                get: "Balance",
              })
              token = out || "0"
            } catch (e) {
              console.log(e)
            }
            if (BigInt(token) < BigInt("100000000000000")) {
              callback(null, {
                result: null,
                err: `signer [${signer}] does not have enough token`,
              })
              return
            }
            if (isNil(key)) {
              callback(null, { result: null, err: "key is not specified" })
              return
            } else if (!isNil(await this.admin_db.get("dbs", key))) {
              callback(null, {
                result: null,
                err: `${key} exists`,
              })
              return
            } else if (isNil(db.owner)) {
              callback(null, { result: null, err: "owner is missing" })
            } else if (db.rollup !== true && db.contractTxId) {
              callback(null, {
                result: null,
                err: `rollup setting must be true with contractTxId specified`,
              })
              return
            }
            db.admin = signer
            const tx = await this.admin_db.set(db, "dbs", key, auth)

            if (db.contractTxId) {
              const dbname = db.dbname ?? this.conf.dbname
              const dir = path.resolve(
                db.dir ?? this.conf.dir ?? path.resolve(__dirname, "cache"),
                dbname,
                key,
              )
              await this.checkSnapShot({
                dbname,
                dir,
                contractTxId: db.contractTxId,
              })
            }
            if (tx.success) {
              this.rollups[key] = new Rollup({
                aos: this.conf.aos,
                type: db.type,
                snapshot: this.conf.snapshot,
                sequencerUrl: this.conf.sequencerUrl,
                apiKey: this.conf.apiKey,
                arweave: this.conf.arweave,
                txid: key,
                secure: db.secure ?? this.conf.secure,
                owner: db.owner ?? this.conf.owner,
                dbname: db.dbname ?? this.conf.dbname,
                dir: db.dir ?? this.conf.dir,
                tick: db.tick ?? this.conf.tick ?? null,
                plugins: db.plugins ?? this.conf.plugins ?? {},
                bundler: this.conf.bundler,
                admin: this.conf.admin,
              })
              this.rollups[key].init(async () => {
                if (db.contractTxId) {
                  this.txid_map[db.contractTxId] = key
                  this.rollups[key].deployContract(
                    db.contractTxId,
                    async () => {
                      console.log(`contract initialized! ${db.contractTxId}`)
                      callback(null, {
                        result: tx.success ? JSON.stringify(tx) : null,
                        err: tx.success ? null : "error",
                      })
                    },
                  )
                } else {
                  let _err2 = null
                  try {
                    const {
                      out,
                      err: err2,
                      res,
                    } = await ao.msg({
                      pid: this.conf.admin_contract,
                      act: "Transfer",
                      tags: {
                        Sender: signer,
                        Recipient: ao.ar.addr,
                        Quantity: "100000000000000",
                      },
                      get: { obj: { recipient: "Recipient" } },
                    })
                    _err2 = err2
                    if (out.recipient === this.conf.admin_contract)
                      _err2 = "wrong recipient"
                  } catch (e) {
                    _err2 = e
                  }

                  if (_err2) {
                    console.log(_err2)
                    callback(null, {
                      result: null,
                      err: `token transfer failed`,
                    })
                    return
                  }
                  callback(null, {
                    result: tx.success ? JSON.stringify(tx) : null,
                    err: tx.success ? null : "error",
                  })
                }
              })
            }
            break
          case "update_db":
            ;({ err, signer } = await validate(JSON.parse(query), txid))
            if (signer !== this.admin.address.toLowerCase()) {
              callback(null, {
                result: null,
                err: `signer [${signer}] is not admin [${this.admin.address.toLowerCase()}]`,
              })
              return
            } else if (isNil(key)) {
              callback(null, { result: null, err: "key is not specified" })
              return
            } else if (isNil(await this.admin_db.get("dbs", key))) {
              callback(null, {
                result: null,
                err: `${key} doesn't exist`,
              })
              return
            }
            const tx_3 = await this.admin_db.update(db, "dbs", key, auth)
            callback(null, {
              result: tx_3.success ? JSON.stringify(tx_3) : null,
              err: tx_3.success ? null : "error",
            })
            break

          case "remove_db":
            ;({ err, signer } = await validate(JSON.parse(query), txid))
            if (signer !== this.admin.address.toLowerCase()) {
              callback(null, {
                result: null,
                err: `signer [${signer}] is not admin [${this.admin.address.toLowerCase()}]`,
              })
              return
            } else if (isNil(key)) {
              callback(null, { result: null, err: "key is not specified" })
              return
            } else if (isNil(await this.admin_db.get("dbs", key))) {
              callback(null, {
                result: null,
                err: `${key} doesn't exist`,
              })
              return
            }
            const tx2 = await this.admin_db.delete("dbs", key, auth)
            if (tx2.success) {
              this.rollups[key].kill()
              delete this.rollups[key]
            }
            callback(null, {
              result: tx2.success ? JSON.stringify(tx2) : null,
              err: tx2.success ? null : "error",
            })
            break
          default:
            callback(null, {
              result: null,
              err: "op not found",
            })
        }
      } else {
        if (isNil(this.rollups[this.txid_map[txid] ?? txid])) {
          res(`DB [${txid}] doesn't exist`, null)
          return
        }
        this.rollups[this.txid_map[txid] ?? txid].execUser(parsed)
      }
    } catch (e) {
      console.log(e)
      callback(null, { result: null, err: "unknown error" })
    }
  }

  parseQueryNostr(query, id = "offchain", callback) {
    const res = (err, result = null) => {
      callback(null, {
        result: isNil(result) ? null : JSON.stringify(result),
        err,
      })
    }
    const nocache = true
    let txid, type
    if (!isNil(id)) {
      ;[txid, type] = id.split("#")
    }
    type ??= "offchain"
    return {
      type,
      nocache,
      res,
      txid,
      func: query.function,
      query: JSON.stringify(query.query),
      isAdmin: query.function === "admin",
    }
  }

  async execAdmin({ query, res }) {
    res(null, await this.admin_db.get("dbs"))
    return
  }

  async queryNostr(call, id = "offchain", callback) {
    const parsed = this.parseQueryNostr(call, id, callback)
    const { type, res, nocache, txid, func, query, isAdmin } = parsed
    if (isNil(this.rollups[txid])) {
      res(`DB [${txid}] doesn't exist`, null)
      return
    }
    this.rollups[txid].execUser(parsed)
  }

  async stop() {
    this.admin_db.rollup.db.kill()
    for (const k in this.rollups) this.rollups[k].db.kill()
  }
}

module.exports = { VM, Rollup }
