const { expect } = require("chai")
const SDK = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")

describe("Rate Limit Error 403", function () {
  this.timeout(0)

  const CONTRACT_TX_ID = "AoKUJICroTBG5QO4Hdduy7ag-KTGCFLo-B21irCyVWs"
  const COLLECTION_NAME = "people"
  const TX_COUNT = 200

  before(async () => {
    this.bail(true)
  })

  after(async () => {
    process.exit()
  })

  it("should write to DB contract without rate limiting error", async () => {
    try {
      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        nocache: true,
        sequencerUrl: "https://gw.warp.cc/",
        apiKey: process.env.apiKey,
      })
      await db.init()

      for (let i = 0; i < TX_COUNT; i++) {
        const userAuth = EthCrypto.createIdentity()
        const userAddress = userAuth.address.toLowerCase()
        const txAddPost = await db.upsert(
          { name: "sample", address: userAddress },
          COLLECTION_NAME,
          userAddress,
          userAuth,
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
