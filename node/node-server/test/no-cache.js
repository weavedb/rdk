const { expect } = require("chai")
const SDK = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")
const dbOwnerAuth = require("./../.wallets/account1.json")

describe("rollup node", function () {
  this.timeout(0)

  const CONTRACT_TX_ID = "sGtGKS0R3lAN1AoMuRLpXRPaLMlLg1PL2Qf5DxORvYM"
  const COLLECTION_NAME = "people"

  before(async () => {})

  after(async () => {
    process.exit()
  })

  it("should create new document and evaluate previous transaction with nocache set to true", async () => {
    try {
      const _userAuth = EthCrypto.createIdentity()
      const _userAddress = _userAuth.address.toLowerCase()
      const _JSON_DATA = { name: "Bob", address: _userAddress }
      const _DOC_ID = _userAddress

      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        nocache: true,
      })
      await db.init()

      // const rules = {
      //   "allow write": true,
      // }
      // const txSetRules = await db.setRules(rules, COLLECTION_NAME, dbOwnerAuth)
      // console.log(`txSetRules.success: ${txSetRules.success}`)

      console.log("_JSON_DATA", _JSON_DATA)
      const txUpsert = await db.upsert(
        _JSON_DATA,
        COLLECTION_NAME,
        _DOC_ID,
        _userAuth
      )
      console.log(`txUpsert.success: ${txUpsert.success}`)

      const txGetDoc = await db.get(COLLECTION_NAME, _DOC_ID)
      console.log("txGetDoc", txGetDoc)
      expect(txGetDoc).to.eql(_JSON_DATA)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })

  const userAuth = EthCrypto.createIdentity()
  const userAddress = userAuth.address.toLowerCase()
  const JSON_DATA = { name: "Bob", address: userAddress }
  const DOC_ID = userAddress
  it("should create new document with nocache set to false", async () => {
    try {
      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        nocache: false,
      })
      await db.init()

      // const rules = {
      //   "allow write": true,
      // }
      // const txSetRules = await db.setRules(rules, COLLECTION_NAME, dbOwnerAuth)
      // console.log(`txSetRules.success: ${txSetRules.success}`)

      console.log("JSON_DATA", JSON_DATA)
      const txUpsert = await db.upsert(
        JSON_DATA,
        COLLECTION_NAME,
        DOC_ID,
        userAuth
      )
      console.log(`txUpsert.success: ${txUpsert.success}`)
      //   const txResult = await txUpsert.getResult()
      //   console.log("txResult",txResult)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })

  it("should evaluate previous transaction with nocache set to false", async () => {
    try {
      const db = new SDK({
        contractTxId: CONTRACT_TX_ID,
        nocache: false,
      })
      await db.init()

      const txGetDoc = await db.get(COLLECTION_NAME, DOC_ID)
      console.log("txGetDoc", txGetDoc)
      expect(txGetDoc).to.eql(JSON_DATA)
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
