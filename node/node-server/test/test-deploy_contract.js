const { expect } = require("chai")
const DB = require("weavedb-node-client")
const { wait, Test } = require("./lib/utils")
const config = require("../weavedb.config")

describe("deploy_contract", function () {
  this.timeout(0)
  let admin, network, bundler, test
  let dbName = "testdb"

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

  it("should deploy_contract", async () => {
    try {
      const auth = { privateKey: config.admin }
      const db = new DB({
        rpc: "localhost:9090",
        contractTxId: dbName,
        arweave: network,
      })
      const stats = await db.node({ op: "stats" })
      console.log("before add_db", stats)
      expect(stats).to.eql({ dbs: [] })

      // add a DB to node
      const tx = await db.admin(
        {
          op: "add_db",
          key: dbName,
          db: {
            app: "http://localhost:3000",
            name: "Test",
            rollup: true,
            owner: admin.address,
          },
        },
        auth
      )
      expect(tx.success).to.eql(true)
      await wait(2000)
      console.log(
        "after add_db dbName:",
        (await db.node({ op: "stats" })).dbs[0].id
      )

      // deploy L1 warp contract (via node)
      const { contractTxId, srcTxId } = await db.admin(
        { op: "deploy_contract", key: dbName },
        auth
      )
      expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
      console.log("after deploy_contract", await db.node({ op: "stats" }))
      console.log("contractTxId", contractTxId)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
