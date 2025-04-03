const EthCrypto = require("eth-crypto")
const { readFileSync } = require("fs")
const { join, resolve } = require("path")
const { VM } = require("../../vm")
const { Server } = require("../../server")
const Arweave = require("arweave")
const { rmSync } = require("fs")
const { CU, MU, SU } = require("cwao-units")
const CUWDB = require("cwao-units/cu-weavedb")

const wait = ms => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise(res => setTimeout(() => res(), ms))
}

class Test {
  constructor({
    aos,
    snapshot,
    sequencerUrl,
    apiKey,
    secure = true,
    weavedb_version,
    weavedb_srcTxId,
    dbname,
    bundler,
    validators,
    committers,
    staking,
    admin,
    admin_l1,
    evm_network,
    cosmwasm = false,
    admin_contract,
    mem,
    network,
    alchemy_key,
    zk_contract,
  }) {
    this.zk_contract = zk_contract
    this.alchemy_key = alchemy_key
    this.evm_network = evm_network
    this.committers = committers
    this.aos = aos
    this.admin_contract = admin_contract
    this.snapshot = snapshot
    this.sequencerUrl = sequencerUrl
    this.apiKey = apiKey
    this.admin = admin
    this.admin_l1 = admin_l1
    this.bundler = bundler
    this.validators = validators
    this.staking = staking
    this.secure = secure
    this.weavedb_srcTxId = weavedb_srcTxId
    this.weavedb_version = weavedb_version ?? "0.45.0"
    this.network = network ?? {
      host: "localhost",
      port: 4000,
      protocol: "http",
    }

    this.dbname = dbname ?? `test-${Math.floor(Math.random() * 1000)}`
  }
  async addFunds(wallet, amount = "1000000000000000") {
    if (!this.aos?.mem) {
      const addr = await this.arweave.wallets.getAddress(wallet)
      await this.arweave.api.get(`/mint/${addr}/${amount}`)
    }
  }
  async genBunder() {
    if (!this.bundler) {
      this.arweave = Arweave.init(this.network)
      this.bundler = await this.arweave.wallets.generate()
      await this.addFunds(this.bundler)
    } else {
      console.log("bundler already exists")
      await this.addFunds(this.bundler)
    }
  }
  async genAdmin() {
    if (!this.admin) {
      this.admin = EthCrypto.createIdentity()
    } else {
      console.log("admin already exists")
    }
    if (!this.admin_l1) {
      this.admin_l1 = EthCrypto.createIdentity()
    } else {
      console.log("L2 admin already exists")
    }
  }
  async startVM() {
    this.conf = {
      zk_contract: this.zk_contract,
      evm_network: this.evm_network,
      alchemy_key: this.alchemy_key,
      aos: this.aos,
      ao: this.base,
      admin_contract: this.admin_contract,
      snapshot: this.snapshot,
      sequencerUrl: this.sequencerUrl,
      apiKey: this.apiKey,
      secure: this.secure,
      weavedb_srcTxId: this.weavedb_srcTxId,
      weavedb_version: this.weavedb_version,
      arweave: this.network,
      dbname: this.dbname,
      admin: this.admin.privateKey,
      admin_l1: this.admin_l1.privateKey,
      bundler: this.bundler,
      validators: this.validators,
      committers: this.committers,
      staking: this.staking,
      rollups: {},
      contracts: this.contracts,
    }
    this.vm = new VM({ conf: this.conf })
  }
  async startServer() {
    this.server = new Server({ query: this.vm.query.bind(this.vm) })
  }

  async start() {
    await this.genBunder()
    await this.genAdmin()
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
      admin: this.admin,
      admin_l1: this.admin_l1,
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
  async stop() {
    this.stopServer()
    await this.stopVM()
    this.deleteCache()
    setTimeout(() => process.exit(), 100)
  }
}

module.exports = { Test, wait }
