const EthCrypto = require("eth-crypto")
const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")

describe("rollup node", function () {
  this.timeout(0)
  let admin, network, bundler, test

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({ secure: false })
    ;({ network, bundler, admin } = await test.start())
    await wait(3000)
  })

  after(async () => {
    await test.stop()
    // some processes linger, so force exit for now
    process.exit()
  })

  it("should achieve 1000 tps", async () => {
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
    })
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [] })
    await wait(2000)
    // add a DB to node
    const tx = await db.admin(
      {
        op: "add_db",
        key: "testdb",
        db: {
          app: "http://localhost:3000",
          name: "Jots",
          rollup: false,
          owner: admin.address,
        },
      },
      { privateKey: admin.privateKey },
    )
    expect(tx.success).to.eql(true)

    let txs = []
    let done = 0
    let count = 5000
    let pr = 10
    for (let i = 0; i < count; i++) {
      const user = EthCrypto.createIdentity()
      txs.push(
        await db.sign("upsert", { age: db.inc(1) }, "ppl", "bob", {
          privateKey: user.privateKey,
          nonce: 1,
        }),
      )
    }
    await db.write(txs[0].function, txs[0], true, true, false)
    let i = 1
    let start = Date.now()
    const go = async num => {
      await db.write(txs[num].function, txs[num], true, true, false)
      done += 1
      if (i >= count) return
      go(i++)
    }
    for (let i2 = 0; i < pr; i2++) go(i++)
    await wait(1000)
    console.log(done, "tps")
    expect((await db.get("ppl", "bob")).age).to.be.gt(1000)
  })
})
