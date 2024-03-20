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

const wait = ms => new Promise(res => setTimeout(() => res(), ms))

class Test {
  constructor({ secure = true }) {
    this.secure = secure
  }
  async addFunds(wallet, amount = "1000000000000000") {
    const addr = await this.arweave.wallets.getAddress(wallet)
    await this.arweave.api.get(`/mint/${addr}/${amount}`)
  }
  async start() {
    this.weavedb_version = "0.37.2"
    LoggerFactory.INST.logLevel("error")
    this.dbname = `test-${Math.floor(Math.random() * 1000)}`
    this.network = {
      host: "localhost",
      port: 1984,
      protocol: "http",
    }
    this.arweave = Arweave.init(this.network)
    this.bundler = await this.arweave.wallets.generate()
    this.admin = EthCrypto.createIdentity()
    this.arLocal = new ArLocal(1984, false)
    await this.arLocal.start()
    await wait(1000)
    await this.addFunds(this.bundler)
    const warp = WarpFactory.forLocal()
    warp.use(new DeployPlugin())
    const deploy = new Deploy({ warp, wallet: this.bundler })
    const weavedb = await deploy.weavedb({ ver: this.weavedb_version })
    this.contracts = deploy.contracts
    this.weavedb_srcTxId = weavedb.srcTxId
    this.conf = {
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
    this.server = new Server({ query: this.vm.query.bind(this.vm) })
    await wait(1000)
    return {
      dbname: this.dbname,
      network: this.network,
      arweave: this.arweave,
      bundler: this.bundler,
      admin: this.admin,
      arLocal: this.arLocal,
      contracts: this.contracts,
      weavedb_srcTxId: this.weavedb_srcTxId,
      conf: this.conf,
      vm: this.vm,
      server: this.server,
    }
  }
  async stop() {
    this.server.server.forceShutdown()
    await this.vm.stop()
    await this.arLocal.stop()
    try {
      rmSync(resolve(__dirname, "../cache", this.dbname), {
        recursive: true,
        force: true,
      })
    } catch (e) {}
    try {
      rmSync(resolve(__dirname, "../backup", this.dbname), {
        recursive: true,
        force: true,
      })
    } catch (e) {}
  }
}

module.exports = { Test, Deploy, wait }
