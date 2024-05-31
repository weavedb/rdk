const Arweave = require("arweave")
const SDK = require("weavedb-node-client")
const { Wallet, isAddress } = require("ethers")
const { validate } = require("./lib/validate")
const Snapshot = require("./lib/snapshot")
const { CWAO } = require("cwao")
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
const {
  DeployPlugin,
  ArweaveSigner,
} = require("weavedb-warp-contracts-plugin-deploy")
const { WarpFactory } = require("warp-contracts")

class Rollup {
  constructor({
    type,
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
  }) {
    this.cb = {}
    this.txid = txid
    this.db = fork(path.resolve(__dirname, "rollup"))
    this.db.on("message", async ({ err, result, op, id }) => {
      if (!isNil(id)) {
        await this.cb[id]?.(err, result)
        delete this.cb[id]
      } else if (op === "init") {
        if (is(Function, this.afterInit)) this.afterInit()
      }
    })
    this.db.send({
      op: "new",
      params: {
        ao,
        type,
        snapshot,
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
    this.afterInit = afterInit
    this.db.send({ op: "init" })
  }
  execUser(parsed, id) {
    this.cb[id] = parsed.res
    delete parsed.res
    this.db.send({ op: "execUser", params: parsed, id })
  }
  deployContract(contractTxId, id, res, type = "warp", ao) {
    this.cb[id] = res
    this.db.send({ op: "deploy_contract", contractTxId, id, type, ao })
  }
  kill() {
    this.db.kill()
  }
}

class VM {
  constructor({ dbname, conf }) {
    this.count = 0
    this.conf = conf
    if (!isNil(dbname)) this.conf.dbname = dbname
    // TODO: more prisice validations
    if (!isNil(this.bundler)) throw Error("bundler is not defined")
    if (!isNil(this.owner)) throw Error("owner is not defined")
    if (!isNil(this.admin)) throw Error("admin is not defined")
    if (!isNil(this.rollups)) throw Error("rollups are not defined")
    this.admin = new Wallet(this.conf.admin)
    console.log(`Rollup Admin: ${this.admin.address}`)
    this.rollups = {}
    this.txid_map = {}
    this.init()
  }
  getRollup(v, txid) {
    return new Rollup({
      ao: this.conf.ao,
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
      admin: v.admin ?? this.conf.admin,
      initial_state: v.initial_state ?? this.conf.initial_state,
      bundler: this.conf.bundler,
      contractTxId: v.contractTxId ?? null,
      rollup: v.rollup ?? false,
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
      const tx = await this.admin_db.setRules(rules, "dbs", auth)
      console.log(`__admin__ rules added: ${tx.success}`)
      const rollups = this.conf.rollups || { offchain: {} }
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
          await this.checkSnapShot({ dbname, dir, contractTxId })
        }
        this.rollups[k] = this.getRollup(ru, k)
        this.rollups[k].init()
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
        const { op, module, scheduler, key, db, type } = JSON.parse(query).query
        const auth = { privateKey: this.conf.admin }
        let err, signer
        switch (op) {
          case "stats":
            if (isNil(key)) {
              callback(null, {
                result: JSON.stringify({
                  dbs: await this.admin_db.cget("dbs"),
                }),
                err: null,
              })
            } else {
              callback(null, {
                result: JSON.stringify({
                  db: await this.admin_db.cget("dbs", key),
                }),
                err: null,
              })
            }

            break
          case "deploy_contract":
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
            } else {
              const _db = await this.admin_db.get("dbs", key)
              if (isNil(_db)) {
                callback(null, { result: null, err: `${key} doesn't exists` })
                return
              } else if (!isNil(_db.contractTxId)) {
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
                  version: this.conf.weavedb_version ?? "0.43.2",
                  canEvolve: true,
                  evolve: null,
                  secure: _db.secure ?? this.conf.secure,
                  auth: {
                    algorithms: [
                      "secp256k1",
                      "secp256k1-2",
                      "ed25519",
                      "rsa256",
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
                initialState.owner = _db.owner
                initialState.bundlers = [
                  await arweave.wallets.jwkToAddress(this.conf.bundler),
                ]
                if (type === "ao") {
                  initialState.contracts = {
                    ethereum: "ethereum",
                    dfinity: "dfinity",
                    nostr: "nostr",
                    bundler: "bundler",
                    polygonID: "polygon-id",
                    jsonschema: "jsonschema",
                  }
                  const cwao = new CWAO({
                    wallet: this.conf.bundler,
                    ...this.conf.ao,
                  })
                  const pr = await cwao.instantiate({
                    module,
                    scheduler,
                    input: initialState,
                  })
                  const tx = await this.admin_db.update(
                    { contractTxId: pr.id, type: "ao" },
                    "dbs",
                    key,
                    auth,
                  )
                  console.log(
                    `contract deployed: ${pr.id} [${key}:${tx.success}]`,
                  )
                  callback(null, {
                    result: JSON.stringify({
                      contractTxId: pr.id,
                      srcTxId: module,
                    }),
                    err,
                  })
                  this.txid_map[pr.id] = key
                  this.rollups[key].deployContract(
                    pr.id,
                    ++this.count,
                    () => {
                      console.log(`AO contract initialized! ${pr.id}`)
                    },
                    "ao",
                    this.conf.ao,
                  )
                  return
                } else {
                  const warp =
                    this.conf.arweave?.host === "localhost"
                      ? WarpFactory.forLocal().use(new DeployPlugin())
                      : WarpFactory.forMainnet().use(new DeployPlugin())
                  const srcTxId =
                    this.conf.weavedb_srcTxId ??
                    "E14TapQNshyUIyN_DNhI0-YdUs8OP4-KXSgZnSxnROM"
                  let res = null
                  let err = null
                  try {
                    initialState.contracts = this.conf.contracts ?? {
                      dfinity: "3OnjOPuWzB138LOiNxqq2cKby2yANw6RWcQVEkztXX8",
                      ethereum: "Awwzwvw7qfc58cKS8cG3NsPdDet957-Bf-S1RcHry0w",
                      bundler: "lry5KMRj6j13sLHsKxs1D2joLjcj6yNHtNQQQoaHRug",
                      nostr: "PDuTzRpn99EwiUvT9XrUhg8nyhW20Wcd-XcRXboCpHs",
                      polygonID: "Lmu_BUdDuzja4X_egjPeOPdrQH6SQ5HgW7tKUpX37Gc",
                      jsonschema: "Mu5RtB1v_N6vW2cf0zRhOsIrrpcvSaEW8zeFlHMuVNI",
                    }
                    res = await warp.createContract.deployFromSourceTx({
                      wallet:
                        _arweave.host === "localhost"
                          ? this.conf.bundler
                          : new ArweaveSigner(this.conf.bundler),
                      initState: JSON.stringify(initialState),
                      srcTxId,
                      evaluationManifest: {
                        evaluationOptions: {
                          useKVStorage: true,
                          internalWrites: true,
                          allowBigInt: true,
                        },
                      },
                    })
                  } catch (e) {
                    err = e
                    console.log(e)
                  }
                  if (isNil(res?.contractTxId) || !isNil(err)) {
                    callback(null, {
                      result: null,
                      err: err ?? "unknown error",
                    })
                    return
                  } else {
                    const tx = await this.admin_db.update(
                      { contractTxId: res.contractTxId, type: "warp" },
                      "dbs",
                      key,
                      auth,
                    )
                    console.log(
                      `contract deployed: ${res.contractTxId} [${key}:${tx.success}]`,
                    )
                    callback(null, {
                      result: JSON.stringify(res),
                      err,
                    })
                    this.txid_map[res.contractTxId] = key
                    this.rollups[key].deployContract(
                      res.contractTxId,
                      ++this.count,
                      () => {
                        console.log(
                          `Warp contract initialized! ${res.contractTxId}`,
                        )
                      },
                    )
                  }
                }
              }
            }
            break
          case "add_db":
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
            } else if (!isNil(await this.admin_db.get("dbs", key))) {
              callback(null, {
                result: null,
                err: `${key} exists`,
              })
              return
            } else if (isNil(db.owner)) {
              callback(null, { result: null, err: "owner is missing" })
            } else if (
              Array.isArray(db.owner)
                ? !all(isAddress)(db.owner)
                : !isAddress(db.owner)
            ) {
              callback(null, {
                result: null,
                err: "owner is not a valid EVM address",
              })
            } else if (db.rollup !== true && db.contractTxId) {
              callback(null, {
                result: null,
                err: `rollup setting must be true with contractTxId specified`,
              })
              return
            }
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
                ao: this.conf.ao,
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
              })
              this.rollups[key].init(() => {
                if (db.contractTxId) {
                  this.txid_map[db.contractTxId] = key
                  this.rollups[key].deployContract(
                    db.contractTxId,
                    ++this.count,
                    () => {
                      console.log(`contract initialized! ${db.contractTxId}`)
                      callback(null, {
                        result: tx.success ? JSON.stringify(tx) : null,
                        err: tx.success ? null : "error",
                      })
                    },
                  )
                } else {
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
        this.rollups[this.txid_map[txid] ?? txid].execUser(parsed, ++this.count)
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
    this.rollups[txid].execUser(parsed, ++this.count)
  }

  async stop() {
    this.admin_db.rollup.db.kill()
    for (const k in this.rollups) this.rollups[k].db.kill()
  }
}

module.exports = { VM, Rollup }
