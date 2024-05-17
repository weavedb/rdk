const EthCrypto = require("eth-crypto")
const { readFileSync } = require("fs")
const { join, resolve } = require("path")
const { LoggerFactory, WarpFactory } = require("warp-contracts")
const { VM } = require("../../vm")
const { Server } = require("../../server")
const Arweave = require("arweave")
const ArLocal = require("arlocal").default
const { DeployPlugin } = require("warp-contracts-plugin-deploy")
const { rmSync } = require("fs")
const { CU, MU, SU } = require("cwao-units")
const CUWDB = require("cwao-units/cu-weavedb")

class Deploy {
  constructor({ warp, wallet }) {
    this.warp = warp
    this.wallet = wallet
  }
  async deploy({ tar, ver = "0.0.1", init = {} }) {
    const dir = join(__dirname, "../../contracts", tar)
    const src = readFileSync(join(dir, `${ver}.js`), "utf8")
    const state = JSON.parse(
      readFileSync(join(dir, "initial-state.json"), "utf8"),
    )
    const initState = JSON.stringify({
      ...state,
      ...{ owner: this.wallet.address },
    })
    return await this.warp.createContract.deploy({
      wallet: this.wallet,
      initState,
      src,
    })
  }
  async weavedb({ ver }) {
    this.dfinity = await this.deploy({ tar: "dfinity" })
    this.ethereum = await this.deploy({ tar: "ethereum" })
    this.bundler = await this.deploy({ tar: "bundler" })
    this.nostr = await this.deploy({ tar: "nostr" })
    this.weavedb = await this.deploy({
      tar: "weavedb",
      ver,
      init: {
        dfinity: this.dfinity.contractTxId,
        ethereum: this.ethereum.contractTxId,
        bundler: this.bundler.contractTxId,
        nostr: this.nostr.contractTxId,
      },
    })
    return this.weavedb
  }
  get contracts() {
    return {
      dfinity: this.dfinity.contractTxId,
      ethereum: this.ethereum.contractTxId,
      bundler: this.bundler.contractTxId,
      nostr: this.nostr.contractTxId,
    }
  }
}

const wait = ms => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise(res => setTimeout(() => res(), ms))
}

class Test {
  constructor({
    snapshot,
    sequencerUrl,
    apiKey,
    secure = true,
    weavedb_version,
    weavedb_srcTxId,
    dbname,
    bundler,
    admin,
    network,
    ao = false,
    cosmwasm = false,
  }) {
    this.ao = ao
    this.cosmwasm = cosmwasm
    this.snapshot = snapshot
    this.sequencerUrl = sequencerUrl
    this.apiKey = apiKey
    this.admin = admin
    this.bundler = bundler
    this.secure = secure
    this.weavedb_srcTxId = weavedb_srcTxId
    this.weavedb_version = weavedb_version ?? "0.40.0"
    this.arLocal_started = false
    this.network = network ?? {
      host: "localhost",
      port: 1984,
      protocol: "http",
    }

    this.dbname = dbname ?? `test-${Math.floor(Math.random() * 1000)}`
  }
  async addFunds(wallet, amount = "1000000000000000") {
    const addr = await this.arweave.wallets.getAddress(wallet)
    await this.arweave.api.get(`/mint/${addr}/${amount}`)
  }
  async startArLocal() {
    if (!this.arLocal_started) {
      LoggerFactory.INST.logLevel("error")
      this.arweave = Arweave.init(this.network)
      this.arLocal = new ArLocal(1984, false)
      await this.arLocal.start()
      this.arLocal_started = true
      await wait(1000)
    } else {
      console.log("arLocal already started")
    }
  }
  async genBunder() {
    if (!this.bundler) {
      this.bundler = await this.arweave.wallets.generate()
      await this.addFunds(this.bundler)
    } else {
      console.log("bundler already exists")
    }
    if (!this.bundler2) {
      this.bundler2 = await this.arweave.wallets.generate()
      await this.addFunds(this.bundler2)
    } else {
      console.log("bundler2 already exists")
    }
  }
  async genAdmin() {
    if (!this.admin) {
      this.admin = EthCrypto.createIdentity()
    } else {
      console.log("admin already exists")
    }
  }
  async deployWeaveDB() {
    if (!this.weavedb_srcTxId) {
      const warp = WarpFactory.forLocal()
      warp.use(new DeployPlugin())
      const deploy = new Deploy({ warp, wallet: this.bundler })
      const weavedb = await deploy.weavedb({ ver: this.weavedb_version })
      this.contracts = deploy.contracts
      this.weavedb_srcTxId = weavedb.srcTxId
    } else {
      console.log("weavedb src contract already deployed")
    }
  }
  async startVM() {
    this.conf = {
      ao: this.base,
      snapshot: this.snapshot,
      sequencerUrl: this.sequencerUrl,
      apiKey: this.apiKey,
      secure: this.secure,
      weavedb_srcTxId: this.weavedb_srcTxId,
      weavedb_version: this.weavedb_version,
      arweave: this.network,
      dbname: this.dbname,
      admin: this.admin.privateKey,
      bundler: this.bundler,
      rollups: {},
      contracts: this.contracts,
    }
    this.vm = new VM({ conf: this.conf })
  }
  async startServer() {
    this.server = new Server({ query: this.vm.query.bind(this.vm) })
  }
  async startAO() {
    const base = {
      mu: "http://localhost:1995",
      su: "http://localhost:1996",
      cu: "http://localhost:1997",
      arweave: this.network,
      graphql: "http://localhost:1984/graphql",
    }
    this.base = base
    this.mu = new MU({ wallet: this.bundler, port: 1995, ...base })
    this.su = new SU({ wallet: this.bundler, port: 1996, ...base })
    this.cu = new CUWDB({
      wallet: this.bundler,
      port: 1997,
      ...base,
      wasmRU: resolve(__dirname, "../../cirtuits/rollup/index_js/index.wasm"),
      zkeyRU: resolve(__dirname, "../../circuits/rollup/index_0001.zkey"),
      wasm: resolve(__dirname, "../../circuits/db/index_js/index.wasm"),
      zkey: resolve(__dirname, "../../circuits/db/index_0001.zkey"),
    })
  }

  async startCW() {
    const base = {
      mu: "http://localhost:1975",
      su: "http://localhost:1976",
      cu: "http://localhost:1977",
      arweave: this.network,
      graphql: "http://localhost:1984/graphql",
    }
    this.base_cw = base
    this.mu_cw = new MU({ wallet: this.bundler2, port: 1975, ...base })
    this.su_cw = new SU({ wallet: this.bundler2, port: 1976, ...base })
    this.cu_cw = new CU({
      wallet: this.bundler2,
      port: 1977,
      ...base,
    })
  }

  async start() {
    await this.startArLocal()
    await this.genBunder()
    await this.genAdmin()
    await this.deployWeaveDB()
    if (this.ao) await this.startAO()
    if (this.cosmwasm) await this.startCW()
    await this.startVM()
    await this.startServer()
    await wait(1000)
    return {
      base: this.base,
      base_cw: this.base_cw,
      mu: this.mu,
      su: this.su,
      cu: this.cu,
      mu_cw: this.mu_cw,
      su_cw: this.su_cw,
      cu_cw: this.cu_cw,
      dbname: this.dbname,
      network: this.network,
      arweave: this.arweave,
      bundler: this.bundler,
      bundler2: this.bundler2,
      admin: this.admin,
      arLocal: this.arLocal,
      contracts: this.contracts,
      weavedb_srcTxId: this.weavedb_srcTxId,
      conf: this.conf,
      vm: this.vm,
      server: this.server,
    }
  }
  async stopVM() {
    await this.vm.stop()
  }
  stopServer() {
    this.server.server.forceShutdown()
  }
  deleteCache() {
    try {
      rmSync(resolve(__dirname, "../../cache", this.dbname), {
        recursive: true,
        force: true,
      })
    } catch (e) {
      console.log(e)
    }
    try {
      rmSync(resolve(__dirname, "../../backup", this.dbname), {
        recursive: true,
        force: true,
      })
    } catch (e) {
      console.log(e)
    }
  }
  async stopArLocal() {
    await this.arLocal.stop()
    this.arLocal_started = false
  }
  async stop() {
    this.stopServer()
    await this.stopVM()
    await this.stopArLocal()
    this.deleteCache()
    if (this.ao) {
      this.mu.stop()
      this.su.stop()
      this.cu.stop()
    }
    if (this.cosmwasm) {
      this.mu_cw.stop()
      this.su_cw.stop()
      this.cu_cw.stop()
    }
  }
}

module.exports = { Test, Deploy, wait }
