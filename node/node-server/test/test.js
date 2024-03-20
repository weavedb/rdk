const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")

describe("rollup node", function () {
  this.timeout(0)
  let arweave, admin, network, bundler, test

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({ secure: false })
    ;({ network, arweave, bundler, admin } = await test.start())
  })

  after(async () => {
    await test.stop()

    // some processes linger, so force exit for now
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

    // deploy L2 warp contract (via node)
    const { contractTxId, srcTxId } = await db.admin(
      { op: "deploy_contract", key: "testdb" },
      { privateKey: admin.privateKey },
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
    await wait(2000)

    // check L2 warp contract info directly with SDK (not via node)
    const warp_db = new SDK({
      type: 3,
      contractTxId,
      arweave: network,
    })
    await warp_db.init()
    expect((await warp_db.getInfo()).version).to.eql("0.37.2")

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
    expect(
      (await warp_db.db.readState()).cachedValue.state.rollup.height,
    ).to.eql(1)

    // check if L2 Warp state is the same as L3 DB state
    expect(await warp_db.get("ppl", "Bob")).to.eql(Bob)
  })
})
