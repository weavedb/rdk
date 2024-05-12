const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")
const { CWAO } = require("cwao")
const { readFileSync } = require("fs")
const { resolve } = require("path")

const getModule = async () => readFileSync(resolve(__dirname, "../contract.js"))

describe("WeaveDB on AO", function () {
  this.timeout(0)
  let admin, network, bundler, test, base, arweave

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

  it("should start server", async () => {
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
    const Bob = { name: "Bob" }
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
  })
})
