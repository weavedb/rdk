const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")
const { readFileSync } = require("fs")
const { resolve } = require("path")
const { Src, setup, ok, fail } = require("./lib/helpers.js")

const getModule = async () => readFileSync(resolve(__dirname, "../contract.js"))
const winston = "000000000000"
const gewi = "000000000000000000"
const w = n => Number(n).toString() + winston
const g = n => Number(n).toString() + gewi

describe("WeaveDB on AO", function () {
  this.timeout(0)
  let admin,
    network,
    bundler,
    test,
    base,
    arweave,
    opt,
    ao2,
    node,
    token,
    ar,
    src,
    admin_contract,
    _stake,
    stake,
    eth,
    _eth,
    _db

  before(async () => {
    ;({ ar, ao2, opt } = await setup({}))
    src = new Src({
      ar,
      dir: resolve(__dirname, "../../../lua/contracts"),
    })
    ;({ pid: _db, p: token } = await ao2.deploy({
      src_data: await src.data("tDB"),
    }))
    ;({ pid: admin_contract, p: node } = await ao2.deploy({
      fills: { PARENT: _db, SOURCE: _db },
      src_data: await src.data("weavedb_node"),
    }))
    ;({ pid: _eth, p: eth } = await ao2.deploy({
      src_data: await src.data("taoETH"),
    }))
    ;({ pid: _stake, p: stake } = ok(
      await ao2.deploy({
        src_data: src.data("staking"),
        fills: { DB: _db, TOKEN: _eth },
      }),
    ))
    test = new Test({
      ao: true,
      secure: false,
      staking: _stake,
      admin_contract,
      bundler: ar.jwk,
      aos: opt.ao2,
    })
    ;({ network, arweave, bundler, admin, base } = await test.start())
    await wait(3000)
  })

  after(async () => await test.stop())

  it("should deploy weavedb on AO", async () => {
    const { addr, jwk } = await ar.gen()
    const validator_1 = await ar.gen()
    const validator_2 = await ar.gen()

    await token.m("Mint", { Quantity: w(10000) })
    await eth.m("Mint", { Quantity: g(10000) })
    await eth.m("Transfer", { Recipient: validator_1.addr, Quantity: g(10) })
    await eth.m("Transfer", { Recipient: validator_2.addr, Quantity: g(10) })
    await eth.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: g(1),
        "X-Action": "Add-Node",
        "X-URL": "https://test.wdb.ae",
      },
      { check: /transferred/ },
    )
    await token.m("Transfer", { Recipient: addr, Quantity: w(1000) })
    expect((await token.d("Balances"))[addr]).to.eql("1000" + winston)
    await token.m(
      "Transfer",
      { Recipient: admin_contract, Quantity: w(200) },
      { jwk },
    )
    await wait(3000)
    expect((await node.d("Balances"))[addr]).to.eql("200" + winston)
    expect(await node.d("Info", "Name")).to.eql("Testnet WDB")
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
    })
    await wait(2000)
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [], bundler: ao2.ar.addr })
    // add a DB to node
    const tx = await db.admin(
      {
        op: "add_db",
        key: "testdb",
        db: { rollup: true, owner: addr },
      },
      { ar2: jwk },
    )
    expect(tx.success).to.eql(true)

    // deploy L1 AO contract (via node)
    const { contractTxId, srcTxId } = await db.admin(
      {
        op: "deploy_contract",
        key: "testdb",
        type: "ao",
        module: opt.modules.aos2,
        scheduler: opt.ao2.scheduler,
      },
      { ar2: jwk },
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
    await token.m("Transfer", {
      Recipient: _stake,
      Quantity: w(1000),
      "X-DB": contractTxId,
    })
    await wait(5000)
    expect((await node.d("Balances"))[addr]).to.eql("100" + winston)
    await token.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: 100,
        "X-Duration": 300000,
        "X-Action": "Set-Reward",
      },
      { check: /transferred/ },
    )
    await eth.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: 1,
        "X-DB": contractTxId,
      },
      { check: /transferred/, jwk: validator_1.jwk },
    )
    await eth.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: 1,
        "X-DB": contractTxId,
      },
      { check: /transferred/, jwk: validator_2.jwk },
    )

    // update the DB (via node)
    const db2 = new DB({ rpc: "localhost:9090", contractTxId })
    const Bob = { name: "Bob" }
    const tx2 = await db2.set(Bob, "ppl", "Bob", {
      privateKey: admin.privateKey,
    })
    expect(tx2.success).to.eql(true)
    expect(await db2.get("ppl", "Bob")).to.eql(Bob)

    // check rollup
    await wait(15000)

    const wdb = ao2.p(contractTxId)
    const block = await wdb.d("Get-Next-Block")
    let mid = null
    for (const k in block.candidates) {
      mid = k
      break
    }
    // validate
    await stake.m(
      "Validate",
      { DB: contractTxId, Block: 1, ["TxID"]: mid },
      { check: "validated!", jwk: validator_1.jwk },
    )

    await stake.m(
      "Validate",
      { DB: contractTxId, Block: 1, ["TxID"]: mid },
      { check: "finalized!", jwk: validator_2.jwk },
    )
    await wait(3000)
    expect(
      await wdb.d("Get", { Query: JSON.stringify(["ppl", "Bob"]) }),
    ).to.eql(Bob)

    // check zkp
    let hash = null
    let zkp = null
    try {
      hash = (await db.node({ op: "hash", key: "testdb" })).hash
    } catch (e) {
      console.log(e)
    }
    try {
      zkp = (
        await db.node({
          op: "zkp",
          key: "testdb",
          collection: "ppl",
          doc: "Bob",
          path: "name",
        })
      ).zkp
    } catch (e) {
      console.log(e)
    }
    expect(hash).to.eql(zkp[21])
  })
})
