const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { Wallet } = require("ethers")
const EthCrypto = require("eth-crypto")
const { toIndex, path } = require("zkjson")
const { resolve } = require("path")
const { expect } = require("chai")
const { wait, Test } = require("../../node/node-server/test/lib/utils")
const { CWAO } = require("cwao")
const { readFileSync } = require("fs")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")

const getModuleCWAO20 = async () =>
  readFileSync(resolve(__dirname, "../../node/node-server/test/cwao20.wasm"))
const getModule = async () =>
  readFileSync(resolve(__dirname, "../../node/node-server/contract.js"))
const ath = wallet => ({ privateKey: wallet.privateKey })

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
  let admin, network, bundler, test, base, arweave, admin_l1, base_cw, bundler2
  this.timeout(0)

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({
      secure: false,
      sequencerUrl: "https://gw.warp.cc/",
      apiKey: "xyz",
      ao: true,
      cosmwasm: true,
    })
    ;({ network, arweave, bundler, bundler2, admin, base, admin_l1, base_cw } =
      await test.start())
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
          owner: [admin.address.toLowerCase(), admin_l1.address.toLowerCase()],
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
    await wait(5000)
    expect(
      await token.query({
        process: pr.id,
        action: "Balance",
        input: { Target: contractTxId },
      }),
    ).to.eql({ Balance: "30", Ticker: "WDB" })
    const tokens = await wdb.query({
      process: contractTxId,
      action: "getTokens",
      input: { function: "getTokens", query: {} },
    })
    expect(tokens.tokens.available).to.eql({ [pr.id]: "30" })

    // lock token to L2

    const cu = EthCrypto.createIdentity()
    const cu2 = EthCrypto.createIdentity()
    const cu3 = EthCrypto.createIdentity()

    const jobID = "tokens"
    const job = {
      relayers: [cu.address],
      signers: [cu2.address, cu3.address],
      multisig: 100,
      multisig_type: "percent",
      schema: {
        type: "object",
        required: ["tokens", "height", "last_token_lock_date"],
        properties: {
          tokens: { type: "object" },
          height: { type: "number" },
          last_token_lock_date: { type: "number" },
        },
      },
    }
    await db2.addRelayerJob("tokens", job, {
      privateKey: admin.privateKey,
    })
    expect(await db2.getRelayerJob("tokens")).to.eql(job)
    const signed = await db2.sign("lockTokens", { jobID, ...ath(admin) })
    const extra = {
      tokens: tokens.tokens.available,
      height: tokens.rollup.height,
      last_token_lock_date: tokens.last_token_lock_date,
    }
    const cuw2 = new Wallet(cu2.privateKey)
    const cuw3 = new Wallet(cu3.privateKey)
    const multisig_data = { extra, jobID, params: signed }
    const sig2 = await cuw2.signMessage(JSON.stringify(multisig_data))
    const sig3 = await cuw3.signMessage(JSON.stringify(multisig_data))
    await db2.relay("tokens", signed, extra, {
      ...ath(cu),
      multisigs: [sig2, sig3],
    })
    expect((await db2.getTokens()).tokens.available_l2).to.eql({
      [pr.id]: "30",
    })

    const rules = [
      ["set:mint", [["allow()", true]]],
      ["update:withdraw", [["allow()", true]]],
    ]
    const auth = ath(admin)
    await db2.setRules(rules, "ppl", auth)
    const trigger_mint = {
      key: "mint",
      on: "create",
      version: 2,
      func: [
        [
          "mint()",
          [
            {
              token: pr.id,
              amount: 10,
              to: { var: "data.setter" },
            },
          ],
        ],
        [
          "transfer()",
          [
            {
              token: pr.id,
              amount: 5,
              from: { var: "data.setter" },
              to: cu3.address.toLowerCase(),
            },
          ],
        ],
      ],
    }
    await db2.addTrigger(trigger_mint, "ppl", auth)
    const trigger_withdraw = {
      key: "withdraw",
      on: "update",
      version: 2,
      func: [
        [
          "withdraw()",
          [
            {
              token: pr.id,
              amount: 5,
              from: { var: "data.setter" },
            },
          ],
        ],
      ],
    }
    await db2.addTrigger(trigger_withdraw, "ppl", auth)
    await db2.query("set:mint", { name: "Bob" }, "ppl", "Bob", ath(cu2))
    expect((await db2.getTokens()).tokens.allocated[pr.id]).to.eql("10")

    await db2.query("update:withdraw", { age: 21 }, "ppl", "Bob", ath(cu3))
    expect(
      (
        await db2.get("__tokens__", [
          "key",
          "==",
          `${pr.id}:${cu2.address.toLowerCase()}`,
        ])
      )[0].withdraw,
    ).to.eql(5)
    await db2.withdrawToken({ token: pr.id, to: sch }, ath(cu2))
    expect((await db2.getTokens()).tokens.allocated[pr.id]).to.eql("5")
    await wait(5000)
    expect(
      await token.query({
        process: pr.id,
        action: "Balance",
        input: { Target: sch },
      }),
    ).to.eql({ Balance: "5", Ticker: "WDB" })

    try {
      await wait(5000)
      const tk = (await db2.cget("__tokens__", ["amount", "desc"]))[0]
      // get zk merkle tree hash
      const { hash, height } = await wdb.cu.hash(contractTxId)
      await myru.commit(hash)

      // get zkJSON proof
      const { zkp, col_id, doc } = await wdb.cu.zkjson(
        contractTxId,
        "__tokens__",
        tk.id,
        "amount",
      )
      // query from Solidity
      expect(
        (
          await myru.qInt([1, toIndex(tk.id), ...path("amount")], zkp)
        ).toNumber(),
      ).to.eql(tk.data.amount)
    } catch (e) {
      console.log(e)
    }
  })
})
