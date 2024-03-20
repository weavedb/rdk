const EthCrypto = require("eth-crypto")
const Arweave = require("arweave")
const ArLocal = require("arlocal").default
const { rmSync } = require("fs")
const { resolve } = require("path")
const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { VM } = require("../vm")
const { Server } = require("../server")
const { DeployPlugin } = require("warp-contracts-plugin-deploy")
const { LoggerFactory, WarpFactory } = require("warp-contracts")
const wait = ms => new Promise(res => setTimeout(() => res(), ms))
const { readFileSync } = require("fs")
const { join } = require("path")

async function addFunds(arweave, wallet) {
  const walletAddress = await arweave.wallets.getAddress(wallet)
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`)
}

class Deploy {
  constructor({ warp, wallet }) {
    this.warp = warp
    this.wallet = wallet
  }
  async deploy({ tar, ver = "0.0.1", init = {} }) {
    const dir = join(__dirname, "../contracts", tar)
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

describe("rollup node", function () {
  this.timeout(0)
  let vm,
    server,
    admin,
    bundler,
    conf,
    dbname,
    arLocal,
    arweave,
    _arweave,
    weavedb_srcTxId,
    contracts

  before(async () => {
    LoggerFactory.INST.logLevel("error")
    dbname = `test-${Math.floor(Math.random() * 1000)}`
    _arweave = {
      host: "localhost",
      port: 1984,
      protocol: "http",
    }
    arweave = Arweave.init(_arweave)
    bundler = await arweave.wallets.generate()
    admin = EthCrypto.createIdentity()
    arLocal = new ArLocal(1984, false)
    await arLocal.start()
    await wait(1000)
    await addFunds(arweave, bundler)
    const warp = WarpFactory.forLocal()
    warp.use(new DeployPlugin())
    const deploy = new Deploy({ warp, wallet: bundler })
    const weavedb = await deploy.weavedb({ ver: "0.37.2" })
    contracts = deploy.contracts
    weavedb_srcTxId = weavedb.srcTxId
    conf = {
      secure: false,
      weavedb_srcTxId,
      arweave: _arweave,
      dbname,
      admin: admin.privateKey,
      bundler,
      rollups: {},
      contracts,
    }
    vm = new VM({ conf })
    server = new Server({ query: vm.query.bind(vm) })
    await wait(1000)
  })

  after(async () => {
    server.server.forceShutdown()
    await vm.stop()
    await arLocal.stop()
    try {
      rmSync(resolve(__dirname, "../cache", dbname), {
        recursive: true,
        force: true,
      })
    } catch (e) {}
    try {
      rmSync(resolve(__dirname, "../backup", dbname), {
        recursive: true,
        force: true,
      })
    } catch (e) {}
    process.exit()
  })

  it("should start server", async () => {
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave,
    })
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [] })

    // add a DB to node
    const tx = await db.admin(
      {
        op: "add_db",
        key: "testdb",
        db: {
          app: "http://localhost:3000",
          name: "Jots",
          rollup: true,
          owner: admin.address,
        },
      },
      { privateKey: admin.privateKey },
    )
    expect(tx.success).to.eql(true)
    await wait(2000)

    // deploy L1 contract (via node)
    const { contractTxId, srcTxId } = await db.admin(
      { op: "deploy_contract", key: "testdb" },
      { privateKey: admin.privateKey },
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
    await wait(2000)

    // check L1 contract info directly with SDK (not via node)
    const l1_db = new SDK({
      type: 3,
      contractTxId,
      arweave: _arweave,
    })
    await l1_db.init()
    expect((await l1_db.getInfo()).version).to.eql("0.37.2")

    // update the DB (via node)
    const db2 = new DB({
      rpc: "localhost:9090",
      contractTxId,
    })
    const Bob = { name: "Bob" }
    const tx2 = await db2.set(Bob, "ppl", "Bob", {
      privateKey: admin.privateKey,
    })
    expect(tx2.success).to.eql(true)
    expect(await db2.get("ppl", "Bob")).to.eql(Bob)

    // check rollup
    await wait(5000)
    expect((await l1_db.db.readState()).cachedValue.state.rollup.height).to.eql(
      1,
    )
  })
})
