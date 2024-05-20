const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { toIndex, path } = require("zkjson")
const { resolve } = require("path")
const { expect } = require("chai")
const { wait, Test } = require("../../node/node-server/test/lib/utils")
const { CWAO } = require("cwao")
const { readFileSync } = require("fs")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")

const getModule = async () =>
  readFileSync(resolve(__dirname, "../../node/node-server/contract.js"))

async function deploy() {
  const [committer] = await ethers.getSigners()
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
  return { myru, committer }
}

describe("WeaveDB AO with zkJSON", function () {
  let myru, committer, db, ru
  let admin, network, bundler, test, base, arweave
  this.timeout(0)

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({
      secure: false,
      sequencerUrl: "https://gw.warp.cc/",
      apiKey: "xyz",
      ao: true,
    })
    ;({ network, arweave, bundler, admin, base } = await test.start())
    await wait(3000)
  })

  after(async () => {
    await test.stop()
    // some processes linger, so force exit for now
    process.exit()
  })

  beforeEach(async () => {
    const dep = await loadFixture(deploy)
    myru = dep.myru
    committer = dep.committer
  })

  it("should verify rollup transactions", async function () {
    const cwao = new CWAO({ wallet: bundler, ...base })
    const sch = await arweave.wallets.jwkToAddress(bundler)
    expect(await cwao.mu.get()).to.eql("ao messenger unit")
    expect((await cwao.cu.get()).address).to.eql(sch)
    expect((await cwao.su.get()).Address).to.eql(sch)
    expect((await cwao.su.timestamp()).block_height).to.eql(0)
    const _binary = await getModule()
    const mod_id = await cwao.deploy(_binary)
    await cwao.setSU({ url: base.su })

    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
    })
    await wait(2000)
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [] })

    // add a DB to node
    const tx = await db.admin(
      {
        op: "add_db",
        key: "testdb",
        db: {
          app: "http://localhost:3000",
          name: "Jots",
          rollup: true,
          owner: admin.address,
        },
      },
      { privateKey: admin.privateKey },
    )
    expect(tx.success).to.eql(true)

    // deploy L1 AO contract (via node)
    const { contractTxId, srcTxId } = await db.admin(
      {
        op: "deploy_contract",
        key: "testdb",
        type: "ao",
        module: mod_id,
        scheduler: sch,
      },
      { privateKey: admin.privateKey },
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
    await wait(2000)

    // update the DB (via node)
    const db2 = new DB({
      rpc: "localhost:9090",
      contractTxId,
    })
    const Bob = { name: "Bob", age: 10 }
    const tx2 = await db2.set(Bob, "ppl", "Bob", {
      privateKey: admin.privateKey,
    })
    expect(tx2.success).to.eql(true)
    expect(await db2.get("ppl", "Bob")).to.eql(Bob)

    // check rollup
    await wait(5000)
    expect(
      await cwao.query({
        process: contractTxId,
        action: "get",
        input: { function: "get", query: ["ppl", "Bob"] },
      }),
    ).to.eql(Bob)

    // get zk merkle tree hash
    const { hash, height } = await cwao.cu.hash(contractTxId)
    await myru.commit(hash)

    // get zkJSON proof
    const { zkp, col_id, doc } = await cwao.cu.zkjson(
      contractTxId,
      "ppl",
      "Bob",
      "name",
    )

    // query from Solidity
    expect(
      await myru.qString([col_id, toIndex(doc), ...path("name")], zkp),
    ).to.eql("Bob")
  })
})
