const { expect } = require("chai")
const SDK = require("weavedb-sdk-node")
const fs = require("fs")
const path = require("path")

describe("Rate Limit Error 429", function () {
  this.timeout(0)
  const COLLECTION_NAME = "people"
  const CONTRACT_TX_ID = "tbg8t02nuUl_KahdVcOd6lxDeFDgtEQnVIyyqR8i8Nw"
  const DOC_ID_TEST = "0x00f1cc125b21c0a865a5da1c0278f5f97bf716db"

  before(async () => {
    this.bail(true)
  })

  after(async () => {
    process.exit()
  })

  it("should not have a cache folder", () => {
    const cachePath = path.resolve(__dirname, "../cache")
    const folderExists = fs.existsSync(cachePath) // Check if the folder exists
    expect(folderExists).to.be.false // Assert that the folder does not exist
  })

  it("should fetch latest DB contract state without rate limiting error ", async () => {
    try {
      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        sequencerUrl: "https://gw.warp.cc/",
        apiKey: "793d13df-2183-46a9",
      })
      await db.init()
      console.log(db)
      console.log("waiting to fetch docs from db collection.....")
      const txGetDocs = await db.get(COLLECTION_NAME, DOC_ID_TEST)
      console.log("txGetDocs", txGetDocs)
      expect(txGetDocs.address).to.eql(DOC_ID_TEST)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
