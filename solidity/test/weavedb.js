const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { toIndex, path } = require("zkjson")
const { resolve } = require("path")
const { expect } = require("chai")
const { wait, Test } = require("../../node/node-server/test/lib/utils")
const { CWAO } = require("cwao")
const { readFileSync } = require("fs")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { AO } = require("aonote")
const {
  setup,
  ok,
  fail,
} = require("../../node/node-server/test/lib/helpers.js")

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
  const MyMRU = await ethers.getContractFactory("MultiOPRU")
  const mymru = await MyMRU.deploy(
    verifierRU.address,
    verifierDB.address,
    committer.address,
  )
  return { mymru, myru, committer }
}

describe("WeaveDB AO with zkJSON", function () {
  let myru, committer, ru, mymru
  let admin, network, bundler, test, base, arweave, opt
  this.timeout(0)

  before(async () => {
    ;({ opt } = await setup({}))
    // testing in insecure mode, never do that in production
    test = new Test({
      aos: opt.ao,
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
    mymru = dep.mymru
    committer = dep.committer
  })
  it("should verify rollup transactions", async function () {
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
        module: opt.ao.module,
        scheduler: opt.ao.scheduler,
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
    const Bob = { name: "Bob" }
    const tx2 = await db2.set(Bob, "ppl", "Bob", {
      privateKey: admin.privateKey,
    })
    expect(tx2.success).to.eql(true)
    expect(await db2.get("ppl", "Bob")).to.eql(Bob)

    // check rollup
    await wait(5000)
    const ao = new AO(opt.ao)
    const b = JSON.parse(
      (
        await ao.dry({
          pid: contractTxId,
          act: "Get",
          tags: { Query: JSON.stringify(["ppl", "Bob"]) },
          get: { name: "Result", json: true },
        })
      ).out,
    )
    expect(b).to.eql(Bob)

    // check zkp
    let hash = null
    try {
      hash = (await db.node({ op: "hash", key: "testdb" })).hash
    } catch (e) {
      console.log(e)
    }
    const { col_id, zkp } = await db.node({
      op: "zkp",
      key: "testdb",
      collection: "ppl",
      doc: "Bob",
      path: "name",
    })
    expect(hash).to.eql(zkp[21])

    await myru.commitRoot(hash)

    // query from Solidity
    expect(
      await myru.qString([col_id, toIndex("Bob"), ...path("name")], zkp),
    ).to.eql("Bob")

    return
  })
  it.only("should verify multi rollup transactions", async function () {
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
    })
    await wait(2000)
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [] })

    for (const i of [1, 2, 3]) {
      // add a DB to node
      const key = "testdb-" + i
      const doc = "Bob-" + i
      const tx = await db.admin(
        {
          op: "add_db",
          key,
          db: {
            app: "http://localhost:3000",
            name: "WDB-" + i,
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
          key,
          type: "ao",
          module: opt.ao.module,
          scheduler: opt.ao.scheduler,
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
      const Bob = { name: doc }
      const tx2 = await db2.set(Bob, "ppl", doc, {
        privateKey: admin.privateKey,
      })
      expect(tx2.success).to.eql(true)
      expect(await db2.get("ppl", doc)).to.eql(Bob)

      // check rollup
      await wait(5000)
      const ao = new AO(opt.ao)
      const b = JSON.parse(
        (
          await ao.dry({
            pid: contractTxId,
            act: "Get",
            tags: { Query: JSON.stringify(["ppl", doc]) },
            get: { name: "Result", json: true },
          })
        ).out,
      )
      expect(b).to.eql(Bob)

      // check zkp
      let hash = null
      try {
        hash = (await db.node({ op: "hash", key })).hash
      } catch (e) {
        console.log(e)
      }
      const { col_id, zkp } = await db.node({
        op: "zkp",
        key,
        collection: "ppl",
        doc,
        path: "name",
      })
      expect(hash).to.eql(zkp[21])

      await mymru.commitRoot(contractTxId, hash)

      // query from Solidity
      expect(
        await mymru.qString(
          contractTxId,
          [col_id, toIndex(doc), ...path("name")],
          zkp,
        ),
      ).to.eql(doc)
    }
    return
  })
})
