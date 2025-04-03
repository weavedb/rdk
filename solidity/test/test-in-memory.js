const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { toIndex, path } = require("zkjson")
const { resolve } = require("path")
const { expect } = require("chai")
const { wait, Test } = require("../../node/node-server/test/lib/utils")
const { readFileSync } = require("fs")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { ok, fail, Src } = require("../../node/node-server/test/lib/helpers.js")
const { AO, ArMem, acc, modules } = require("wao/test")
const EthCrypto = require("eth-crypto")

const getModule = async () =>
  readFileSync(resolve(__dirname, "../../node/node-server/contract.js"))

async function deploy() {
  const signer = await ethers.getSigners()
  const committer2 = EthCrypto.createIdentity()
  const committer = new ethers.Wallet(committer2.privateKey) //await ethers.getSigners()
  const tx = await signer[0].sendTransaction({
    to: committer2.address,
    value: ethers.utils.parseEther("1"),
  })
  console.log(tx)
  const VerifierRU = await ethers.getContractFactory("Groth16VerifierRU")
  const verifierRU = await VerifierRU.deploy()
  const VerifierDB = await ethers.getContractFactory("Groth16VerifierDB")
  const verifierDB = await VerifierDB.deploy()

  const MyRU = await ethers.getContractFactory("SimpleOPRU")
  const myru = await MyRU.deploy(
    verifierRU.address,
    verifierDB.address,
    committer.address,
  )
  const MyMRU = await ethers.getContractFactory("MultiOPRU")
  const mymru = await MyMRU.deploy(
    verifierRU.address,
    verifierDB.address,
    committer.address,
  )
  return { mymru, myru, committer, committer2 }
}
const winston = "000000000000"
const gewi = "000000000000000000"
const w = n => Number(n).toString() + winston
const g = n => Number(n).toString() + gewi

describe("WeaveDB AO with zkJSON", function () {
  this.timeout(0)
  let myru,
    committer,
    committer2,
    ru,
    mymru,
    admin,
    network,
    bundler,
    test,
    base,
    arweave,
    opt,
    ao2,
    mem,
    ar,
    src,
    validator_1,
    validator_2,
    _db,
    token,
    admin_contract,
    node,
    _eth,
    eth,
    _stake,
    stake,
    addr,
    jwk

  before(async () => {
    const dep = await loadFixture(deploy)
    myru = dep.myru
    mymru = dep.mymru
    committer = dep.committer
    committer2 = dep.committer2

    ao2 = await new AO().init(acc[0].jwk)
    mem = ao2.mem
    ar = ao2.ar
    src = new Src({
      ar,
      dir: resolve(__dirname, "../../lua/contracts"),
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
    validator_1 = await ao2.ar.gen()
    validator_2 = await ao2.ar.gen()
    const opt = {
      validators: [validator_1.jwk, validator_2.jwk],
      ao: true,
      secure: false,
      staking: _stake,
      admin_contract,
      bundler: ao2.ar.jwk,
      committers: [committer2],
      aos: { mem, module: mem.modules.aos2_0_1 },
      zk_contract: mymru.address,
      evm_network: "sepolia",
    }
    test = new Test(opt)
    ;({ network, arweave, bundler, admin, base } = await test.start())
    console.log(admin)
    ;({ addr, jwk } = await ar.gen())
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
    //await wait(3000)
    expect((await node.d("Balances"))[addr]).to.eql("200" + winston)
    expect(await node.d("Info", "Name")).to.eql("Testnet WDB")
  })
  after(async () => await test.stop())

  beforeEach(async () => {})
  it.only("should verify rollup transactions", async function () {
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
    })
    //await wait(2000)
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
      },
      { ar2: jwk },
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)

    //await wait(2000)
    await token.m("Transfer", {
      Recipient: _stake,
      Quantity: w(1000),
      "X-DB": contractTxId,
    })
    await token.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: w(100),
        "X-Duration": 300000,
        "X-Action": "Set-Reward",
      },
      { check: /transferred/ },
    )
    await eth.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: g(1),
        "X-DB": contractTxId,
      },
      { check: /transferred/, jwk: validator_1.jwk },
    )
    await eth.m(
      "Transfer",
      {
        Recipient: _stake,
        Quantity: g(1),
        "X-DB": contractTxId,
      },
      { check: /transferred/, jwk: validator_2.jwk },
    )

    await db.admin(
      {
        op: "add_validator",
        pid: contractTxId,
      },
      { ar2: validator_1.jwk },
    )
    await db.admin(
      {
        op: "add_validator",
        pid: contractTxId,
      },
      { ar2: validator_2.jwk },
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
    await wait(7000)
    const wdb = ao2.p(contractTxId)
    expect(
      await wdb.d("Get", { Query: JSON.stringify(["ppl", "Bob"]) }),
    ).to.eql(Bob)

    const Alice = { name: "Alice" }
    const tx3 = await db2.set(Alice, "ppl", "Alice", {
      privateKey: admin.privateKey,
    })
    expect(tx3.success).to.eql(true)
    expect(await db2.get("ppl", "Alice")).to.eql(Alice)
    await wait(7000)
    expect(
      await wdb.d("Get", { Query: JSON.stringify(["ppl", "Alice"]) }),
    ).to.eql(Alice)

    // check zkp

    await db.admin(
      {
        op: "add_committer",
        pid: contractTxId,
      },
      { privateKey: committer2.privateKey },
    )

    await wait(10000)
    const { col_id, zkp } = await db.node({
      op: "zkp",
      key: "testdb",
      collection: "ppl",
      doc: "Bob",
      path: "name",
    })
    console.log(zkp[21])
    // query from Solidity
    expect(
      await mymru.qString(
        contractTxId,
        [col_id, toIndex("Bob"), ...path("name")],
        zkp,
      ),
    ).to.eql("Bob")
    return
  })
})
