const EthCrypto = require("eth-crypto")
const Arweave = require("arweave")
const { rmSync } = require("fs")
const { resolve } = require("path")
const { expect } = require("chai")
const DB = require("weavedb-node-client")

const { VM } = require("../vm")
const { Server } = require("../server")

const sleep = ms => new Promise(res => setTimeout(() => res(), ms))

describe("rollup node", function () {
  this.timeout(0)
  let vm, server, admin, bundler, conf, dbname

  before(async () => {
    dbname = `test-${Math.floor(Math.random() * 1000)}`
    const arweave = Arweave.init()
    bundler = await arweave.wallets.generate()
    admin = EthCrypto.createIdentity()
    conf = { dbname, admin: admin.privateKey, bundler, rollups: {} }
    vm = new VM({ conf })
    server = new Server({ query: vm.query.bind(vm) })
    await sleep(1000)
  })

  after(async () => {
    server.server.forceShutdown()
    await vm.stop()
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
    })
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [] })
  })
})
