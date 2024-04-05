const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")

describe("add_db", function () {
  this.timeout(0)
  let admin, network, bundler, test

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({ secure: false })
    ;({ network, bundler, admin } = await test.start())
  })

  after(async () => {
    await test.stop()

    // some processes linger, so force exit for now
    process.exit()
  })

  it("should add and recover existing DBs", async () => {
    const auth = { privateKey: admin.privateKey }
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
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
      auth,
    )
    expect(tx.success).to.eql(true)
    await wait(2000)

    // deploy L1 warp contract (via node)
    const { contractTxId, srcTxId } = await db.admin(
      { op: "deploy_contract", key: "testdb" },
      auth,
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
    console.log(await db.node({ op: "stats" }))
    await wait(2000)

    // check L1 warp contract info directly with SDK (not via node)
    const warp_db = new SDK({
      type: 3,
      contractTxId,
      arweave: network,
    })
    await warp_db.init()
    expect((await warp_db.getInfo()).version).to.eql("0.37.2")

    // update the DB (via node)
    const db2 = new DB({ rpc: "localhost:9090", contractTxId })
    const Bob = { name: "Bob" }
    const tx2 = await db2.set(Bob, "ppl", "Bob", auth)
    expect(tx2.success).to.eql(true)
    expect(await db2.get("ppl", "Bob")).to.eql(Bob)

    // check rollup
    await wait(5000)
    expect(
      (await warp_db.db.readState()).cachedValue.state.rollup.height,
    ).to.eql(1)

    // check if L1 Warp state is the same as L2 DB state
    expect(await warp_db.get("ppl", "Bob")).to.eql(Bob)

    // shutdown vm and server, but keep arLocal running
    test.server.server.forceShutdown()
    await test.vm.stop()
    await wait(1000)

    // new config
    const conf = {
      secure: test.secure,
      weavedb_srcTxId: test.weavedb_srcTxId,
      weavedb_version: test.weavedb_version,
      arweave: test.network,
      dbname: `test2-${Math.floor(Math.random() * 1000)}`,
      admin: test.admin,
      bundler: test.bundler,
      rollups: {},
      contracts: test.contracts,
    }

    // starting a new node
    const test2 = new Test({
      secure: test.secure,
      dbname: conf.dbname,
      admin: conf.admin,
      bundler: conf.bundler,
      network: test.network,
      weavedb_version: conf.weavedb_version,
      weavedb_srcTxId: conf.weavedb_srcTxId,
    })
    await test2.startVM()
    await test2.startServer()
    await wait(1000)

    // add the existing DB to the new node with contractTxId
    const test2_db = new DB({
      rpc: "localhost:9090",
      contractTxId: "test2_testdb",
      arweave: network,
    })

    const test2_tx = await test2_db.admin(
      {
        op: "add_db",
        key: "test2_testdb",
        db: {
          app: "http://localhost:3000",
          name: "Jots",
          rollup: true,
          owner: admin.address,
          contractTxId,
        },
      },
      auth,
    )
    await wait(3000)
    expect(
      (await test2_db.node({ op: "stats" })).dbs[0].data.contractTxId,
    ).to.eql(contractTxId)

    // check if the DB is recovered
    const test2_db2 = new DB({ rpc: "localhost:9090", contractTxId })
    expect(await test2_db2.get("ppl", "Bob")).to.eql(Bob)

    // stop the new node
    test2.stopServer()
    await test2.stopVM()
  })
})
