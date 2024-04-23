const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK_NODE = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")
const EthCrypto = require("eth-crypto")
const config = require("../weavedb.config")
const nodeAdmin = { privateKey: config.admin }

describe("rollup node", function () {
  this.timeout(0)
  let admin, network, bundler, test

  const RPC_NODE = "localhost:9090"
  const DATABASE_KEY = "testdb"
  const COLLECTION_NAME = "posts"

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({ secure: false })
    ;({ network, bundler, admin } = await test.start())
    this.bail(true)
  })

  after(async () => {
    await test.stop()
    // some processes linger, so force exit for now
    process.exit()
  })

  it("should commit parallel write queries to warp", async () => {
    const dbOwner = admin

    try {
      const db = new DB({
        rpc: RPC_NODE,
        contractTxId: DATABASE_KEY,
      })
      const stats = await db.node({ op: "stats" })
      expect(stats).to.eql({ dbs: [] })

      const tx = await db.admin(
        {
          op: "add_db",
          key: DATABASE_KEY,
          db: {
            app: "http://localhost:3000",
            name: "Jots",
            rollup: true,
            owner: dbOwner.address.toLowerCase(),
          },
        },
        nodeAdmin
      )
      console.log("DB owner: ", dbOwner.address.toLowerCase())
      expect(tx.success).to.eql(true)
      await wait(2000)

      const { contractTxId, srcTxId } = await db.admin(
        { op: "deploy_contract", key: DATABASE_KEY },
        nodeAdmin
      )
      console.log("contractTxId", contractTxId)
      expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
      await wait(2000)

      const db2 = new DB({
        rpc: RPC_NODE,
        contractTxId,
      })

      const txSetRules = await db2.setRules(
        [["allow()"]],
        COLLECTION_NAME,
        "write",
        dbOwner
      )
      expect(txSetRules.success).to.eql(true)
      await wait(25000)

      const warpDb = new SDK_NODE({
        contractTxId,
        nocache: true,
        type: 3,
      })
      await warpDb.init()
      expect(
        (await warpDb.db.readState()).cachedValue.state.rollup.height
      ).to.eql(1)

      const TX_COUNT = 4
      const addPost1 = async () => {
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db2.add(
            { address: userAuth.address },
            COLLECTION_NAME,
            userAuth
          )
        }
        return "addPost1"
      }
      const addPost2 = async () => {
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db2.add(
            { address: userAuth.address },
            COLLECTION_NAME,
            userAuth
          )
        }
        return "addPost2"
      }
      const addPost3 = async () => {
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db2.add(
            { address: userAuth.address },
            COLLECTION_NAME,
            userAuth
          )
        }
        return "addPost3"
      }
      const addPost4 = async () => {
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db2.add(
            { address: userAuth.address },
            COLLECTION_NAME,
            userAuth
          )
        }
        return "addPost4"
      }

      for (let i = 0; i < TX_COUNT; i++) {
        const results = await Promise.allSettled([
          addPost1(),
          addPost2(),
          addPost3(),
          addPost4(),
        ])
        console.log(results)
        await wait(25000)
        const dbLog = new DB({
          contractTxId: `${contractTxId}#log`,
          rpc: RPC_NODE,
        })
        const txLogRes = await dbLog.get("txs", ["id", "desc"], 1)
        const lastBlock = txLogRes[0].block
        const height = (await warpDb.db.readState()).cachedValue.state.rollup
          .height
        console.log("lastBlock", lastBlock)
        console.log("height", height)
        expect(height).to.eql(lastBlock)
      }
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
