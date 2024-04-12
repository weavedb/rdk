const { expect } = require("chai")
const SDK = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")

describe("rollup node", function () {
  this.timeout(0)

  const CONTRACT_TX_ID = "tbg8t02nuUl_KahdVcOd6lxDeFDgtEQnVIyyqR8i8Nw"
  const COLLECTION_NAME = "people"
  const TX_COUNT = 200

  before(async () => {})

  after(async () => {
    process.exit()
  })

  it("should not fail", async () => {
    try {
      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        nocache: true,
      })
      await db.init()

      for (let i = 0; i < TX_COUNT; i++) {
        const userAuth = EthCrypto.createIdentity()
        const userAddress = userAuth.address.toLowerCase()
        const txAddPost = await db.upsert(
          { name: "sample", address: userAddress },
          COLLECTION_NAME,
          userAddress,
          userAuth
        )
        expect(txAddPost.success).to.eql(true)
        console.log(`[${i}] ${txAddPost.docID} txAddPost: ${txAddPost.success}`)
      }
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
