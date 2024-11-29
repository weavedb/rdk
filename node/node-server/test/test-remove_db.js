const { expect } = require("chai")
const DB = require("weavedb-node-client")
const { wait, Test } = require("./lib/utils")
const config = require("../weavedb.config")

describe("remove_db", function () {
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

  it("should remove_db", async () => {
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

      const tx_remove_db = await db.admin(
        { op: "remove_db", key: dbName },
        auth
      )
      console.log("tx_remove_db", tx_remove_db)
      console.log(`DB [${dbName}] removed!`)
      console.log("after remove_db", await db.node({ op: "stats" }))
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
