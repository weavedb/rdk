const { expect } = require("chai")
const DB = require("weavedb-node-client")
const { wait, Test } = require("./lib/utils")
const crypto = require("crypto")
const EthCrypto = require("eth-crypto")

describe("rollup node", function () {
  this.timeout(0)
  let admin, network, bundler, test

  const RPC_NODE = "localhost:9090"
  const DATABASE_KEY = "testdb"
  const COLLECTION_NAME = "posts"
  const CONTRACT_TX_ID = DATABASE_KEY

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

  it("should add new db offchain", async () => {
    try {
      const db = new DB({
        rpc: RPC_NODE,
        contractTxId: CONTRACT_TX_ID,
      })
      await wait(2000)
      const stats = await db.node({ op: "stats" })
      expect(stats).to.eql({ dbs: [] })
      const tx = await db.admin(
        {
          op: "add_db",
          key: DATABASE_KEY,
          db: {
            app: "http://localhost:3000",
            name: "Jots",
            rollup: false,
            owner: admin.address.toLowerCase(),
          },
        },
        { privateKey: admin.privateKey },
      )
      expect(tx.success).to.eql(true)
      await wait(2000)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
  it("should set rules", async () => {
    try {
      const db = new DB({
        rpc: RPC_NODE,
        contractTxId: CONTRACT_TX_ID,
      })

      const txSetRules = await db.setRules(
        [["allow()"]],
        COLLECTION_NAME,
        "write",
        { privateKey: admin.privateKey },
      )
      expect(txSetRules.success).to.eql(true)
      // console.log("getRules", await db.getRules(COLLECTION_NAME))
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
  it("should add new docs in parallel", async () => {
    try {
      const db = new DB({
        rpc: RPC_NODE,
        contractTxId: CONTRACT_TX_ID,
      })

      const TX_COUNT = 100

      const addPost1 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost1"
      }
      const addPost2 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost2"
      }
      const addPost3 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost3"
      }
      const addPost4 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost4"
      }
      const addPost5 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost5"
      }
      const addPost6 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost6"
      }
      const addPost7 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost7"
      }
      const addPost8 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost8"
      }
      const addPost9 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost9"
      }
      const addPost10 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost10"
      }
      const addPost11 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost11"
      }
      const addPost12 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost12"
      }
      const addPost13 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost13"
      }
      const addPost14 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost14"
      }
      const addPost15 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost15"
      }
      const addPost16 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost16"
      }
      const addPost17 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost17"
      }
      const addPost18 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost18"
      }
      const addPost19 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost19"
      }
      const addPost20 = async () => {
        const randomBytes = crypto.randomBytes(16).toString("hex")
        const userAuth = EthCrypto.createIdentity()
        for (let i = 0; i < TX_COUNT; i++) {
          const txAddPost = await db.add(
            { name: randomBytes },
            COLLECTION_NAME,
            userAuth,
          )
        }
        return "addPost20"
      }

      const results = await Promise.allSettled([
        addPost1(),
        addPost2(),
        addPost3(),
        addPost4(),
        addPost5(),
        addPost6(),
        addPost7(),
        addPost8(),
        addPost9(),
        addPost10(),
        addPost11(),
        addPost12(),
        addPost13(),
        addPost14(),
        addPost15(),
        addPost16(),
        addPost17(),
        addPost18(),
        addPost19(),
        addPost20(),
      ])
      // console.log(results)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })

  it("should not have null data in WAL", async () => {
    try {
      const db = new DB({
        rpc: RPC_NODE,
        contractTxId: `${CONTRACT_TX_ID}#log`,
      })
      const page1 = await db.cget("txs", 1000)
      const filteredItemsPage1 = page1.filter(item => {
        if (item.data && typeof item.data === "object") {
          return Object.keys(item.data).length === 0
        }
        return true
      })
      console.log("items that have null data in WAL : ", filteredItemsPage1)
      if (filteredItemsPage1.length > 0)
        throw "data is null on some items fetched from WAL"
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
