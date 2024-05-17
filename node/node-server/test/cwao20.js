const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")
const { CWAO } = require("cwao")
const { readFileSync } = require("fs")
const { resolve } = require("path")

const getModule = async () => readFileSync(resolve(__dirname, "../contract.js"))
const getModuleCWAO20 = async () =>
  readFileSync(resolve(__dirname, "./cwao20.wasm"))

describe("WeaveDB on AO", function () {
  this.timeout(0)
  let admin, network, bundler, test, base, arweave, base_cw, bundler2

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({
      secure: false,
      sequencerUrl: "https://gw.warp.cc/",
      apiKey: "xyz",
      ao: true,
      cosmwasm: true,
    })
    ;({ network, arweave, bundler, bundler2, admin, base, base_cw } =
      await test.start())
    await wait(3000)
  })

  after(async () => {
    await test.stop()
    // some processes linger, so force exit for now
    process.exit()
  })

  it("should start server", async () => {
    const wdb = new CWAO({ wallet: bundler, ...base })
    const sch = await arweave.wallets.jwkToAddress(bundler)
    expect(await wdb.mu.get()).to.eql("ao messenger unit")
    expect((await wdb.cu.get()).address).to.eql(sch)
    expect((await wdb.su.get()).Address).to.eql(sch)
    expect((await wdb.su.timestamp()).block_height).to.eql(0)
    const _binary = await getModule()
    const mod_id = await wdb.deploy(_binary)
    await wdb.setSU({ url: base.su })

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
      await wdb.query({
        process: contractTxId,
        action: "get",
        input: { function: "get", query: ["ppl", "Bob"] },
      }),
    ).to.eql(Bob)

    // deploy cwao20

    const _binary2 = await getModuleCWAO20()
    const token = new CWAO({ wallet: bundler2, ...base_cw })
    const sch2 = await arweave.wallets.jwkToAddress(bundler2)
    const wallet2 = await token.arweave.wallets.generate()
    const addr2 = await token.arweave.wallets.jwkToAddress(wallet2)
    const mod_id2 = await token.deploy(_binary2)
    await token.setSU({ url: base_cw.su })

    const pr = await token.instantiate({
      module: mod_id2,
      scheduler: sch2,
      custom: [
        { name: "Name", value: "WeaveDB" },
        { name: "Ticker", value: "WDB" },
        { name: "Logo", value: "https://example.com/wdb.png" },
        { name: "Denomination", value: "6" },
      ],
    })

    await token.execute({
      process: pr.id,
      action: "Mint",
      custom: [{ name: "Quantity", value: "100" }],
    })

    expect(
      await token.query({ process: pr.id, action: "Info", input: {} }),
    ).to.eql({ Name: "WeaveDB", Ticker: "WDB", Denomination: "6" })

    await token.execute({
      process: pr.id,
      action: "Transfer",
      custom: [
        { name: "Quantity", value: "30" },
        { name: "Recipient", value: contractTxId },
      ],
    })

    expect(
      await token.query({
        process: pr.id,
        action: "Balance",
        input: { Target: contractTxId },
      }),
    ).to.eql({ Balance: "30", Ticker: "WDB" })
  })
})
