import { Src, setup, ok, fail } from "aonote/test/helpers.js"
import { expect } from "chai"
import { AO } from "wao/test"
import { readFileSync } from "fs"
import { resolve } from "path"
import forge from "node-forge"
import { _parser, qs3, qs1, qs2 } from "./parser.js"
import { reverse, map, isNil } from "ramda"
const bob = { name: "Bob", age: 5, favs: ["apple", "orange"] }
const alice = { name: "Alice", age: 10, favs: ["apple", "grape"] }
const mike = { name: "Mike", age: 15, favs: ["lemon", "peach"] }
const beth = { name: "Beth", age: 20, favs: ["grape", "peach"] }
const jeff = { name: "Jeff", age: 25, favs: ["apple", "peach"] }
const david = { name: "David", age: 25, favs: ["lemon"] }
const ppl = [bob, alice, mike, beth, jeff, david, beth, jeff, david, bob]
const ppl2 = [bob, alice, mike, beth]

const rmNull = obj => {
  for (let k in obj) {
    if (obj[k] === null) delete obj[k]
  }
  return obj
}

const wait = ms => new Promise(res => setTimeout(() => res(), ms))
const winston = "000000000000"
const gewi = "000000000000000000"
const w = n => Number(n).toString() + winston
const g = n => Number(n).toString() + gewi

async function deriveEntropyForRSA(prfKey) {
  const hkdfKeyMaterial = await crypto.subtle.importKey(
    "raw",
    prfKey,
    "HKDF",
    false,
    ["deriveBits"],
  )

  const derivedEntropy = await crypto.subtle.deriveBits(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(32),
      info: new Uint8Array(0),
    },
    hkdfKeyMaterial,
    4096,
  )
  return new Uint8Array(derivedEntropy)
}

function to64(x) {
  let modulus = Buffer.from(x.toByteArray())
  if (modulus[0] === 0) modulus = modulus.slice(1)
  return modulus
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

describe("WeaveDB", function () {
  this.timeout(0)
  let ao, ao2, opt, profile, ar, thumbnail, banner, src, data, jwk

  before(async () => {
    //;({ thumbnail, banner, opt, ao, ao2, ar, profile } = await setup({}))
    ao2 = new AO()
    await ao2.ar.gen()
    ar = ao2.ar
    src = new Src({ ar, dir: resolve(import.meta.dirname, "../contracts") })
  })

  it.skip("should generate valid arweave keys with node-forge", async () => {
    const key = new Uint8Array([])
    const entropy = await deriveEntropyForRSA(key)
    const rng = forge.random.createInstance()
    rng.seedFileSync = () => entropy.toString("hex")
    const rsaKeyPair = forge.pki.rsa.generateKeyPair({
      bits: 4096,
      e: 0x10001,
      prng: rng,
    })
    const { publicKey, privateKey } = rsaKeyPair
    const { n } = publicKey
    const { d, p, q, dP, dQ, qInv } = privateKey
    const jwk = {
      kty: "RSA",
      e: "AQAB",
      n: to64(n),
      d: to64(d),
      p: to64(p),
      q: to64(q),
      dp: to64(dP),
      dq: to64(dQ),
      qi: to64(qInv),
    }
    const ao = await new AO().init(jwk)
    const data = readFileSync(
      resolve(import.meta.dirname, "../contracts/weavedb.lua"),
      "utf8",
    )
    const { err, pid } = await ao.spwn({})
    await ao.wait({ pid })
    ok(await ao.load({ pid, data, fills: { BUNDLER: ao.ar.addr } }))
  })

  it.only("should deploy weavedb process", async () => {
    const { pid: _stake, p: stake } = await ao2.deploy({
      src_data: src.data("staking_mock"),
    })
    const { pid: _db, p: db } = await ao2.deploy({
      src_data: src.data("weavedb"),
      fills: { BUNDLER: ar.addr, STAKING: _stake },
    })

    const { mid: mid1 } = await db.msg("Rollup", {
      data: {
        block_height: 1,
        txs: ppl2,
        diffs: map(v => ({
          collection: "ppl",
          doc: v.name,
          op: "set",
          data: v,
        }))(ppl2),
      },
      check: "committed!",
    })
    const { mid: mid2 } = await db.msg("Rollup", {
      data: {
        block_height: 2,
        txs: ppl2,
        diffs: map(v => ({
          collection: "ppl",
          doc: v.name,
          op: "delete",
          data: null,
        }))(ppl2),
      },
      check: "committed!",
    })
    const { mid: mid3 } = await db.msg("Rollup", {
      data: {
        block_height: 3,
        txs: ppl2,
        diffs: map(v => ({
          collection: "ppl",
          doc: v.name,
          op: "update",
          data: v,
        }))(ppl2),
      },
      check: "committed!",
    })
    const get = async (...q) => await db.d("Get", { Query: JSON.stringify(q) })

    const q2 = async (...q) => await db.d("Parse", { Query: JSON.stringify(q) })

    const cget = async (...q) =>
      await db.d("Cget", { Query: JSON.stringify(q) })
    await stake.m(
      "Finalize",
      { to: _db, height: 1, txid: mid1 },
      { check: "finalized!" },
    )

    await stake.m(
      "Finalize",
      { to: _db, height: 2, txid: mid2 },
      { check: "finalized!" },
    )
    await stake.m(
      "Finalize",
      { to: _db, height: 3, txid: mid3 },
      { check: "finalized!" },
    )

    //await wait(3000)

    const res0 = await cget("ppl", "Mike") // use this to skip
    const resx = await get("ppl", ["age", "desc"], ["endBefore", res0])
    expect(resx).to.eql([beth])
    const res = await get("ppl", "Bob")

    expect(res).to.eql(bob)

    expect(await get("ppl")).to.eql([alice, beth, bob, mike])
    expect(await get("ppl", ["age", "desc"])).to.eql([beth, mike, alice, bob])
    expect(await get("ppl", ["age"], 2)).to.eql([bob, alice])
    expect(await get("ppl", ["age", "==", 10], 2)).to.eql([alice])
    expect(
      await get("ppl", ["age", "desc"], ["age", "in", [10, 20]], 2),
    ).to.eql([beth, alice])

    expect(
      await get("ppl", ["age", "desc"], ["age", "not-in", [10, 20]], 2),
    ).to.eql([mike, bob])

    expect(await get("ppl", ["age", "desc"], ["age", "!=", 10])).to.eql([
      beth,
      mike,
      bob,
    ])

    expect(await get("ppl", ["favs", "array-contains", "apple"])).to.eql([
      alice,
      bob,
    ])

    expect(
      await get(
        "ppl",
        ["age", "desc"],
        ["favs", "array-contains-any", ["grape", "apple"]],
      ),
    ).to.eql([beth, alice, bob])

    // test parser
    let i = 0
    for (let v of qs3) {
      const lua = await q2(...v)
      const js = rmNull(_parser(v))
      expect(lua).to.eql(js)
      i++
    }
    /*
    const data2 = readFileSync(
      resolve(import.meta.dirname, "../contracts/app.lua"),
      "utf8",
    )
    const { pid: pid2 } = ok(await ao.spwn({ module: opt.modules.aos2 }))
    ok(await ao.wait({ pid: pid2 }))
    ok(
      await ao.load({
        pid: pid2,
        data: data2,
        fills: { BUNDLER: ar.addr },
      }),
    )
    const { res: res2, out } = await ao.msg({
      pid: pid2,
      act: "Fetch",
      tags: { DB: pid },
      get: true,
    })
    console.log(out)
    */
  })

  it("should test simple staking mechanism", async () => {
    const { p } = ok(await ao2.deploy({ src_data: src.data("staking2") }))
    await p.m("setup", { ts: 1, pool: 60, dur: 5 })
    await p.m("stake", { ts: 1, addr: "a", deposit: 2 })
    await p.m("stake", { ts: 2, addr: "b", deposit: 1 })
    await p.m("stake", { ts: 3, addr: "c", deposit: 3 })
    await p.m("unstake", { ts: 4, addr: "a", deposit: 1 })
    await p.m("unstake", { ts: 4, addr: "b", deposit: 1 })
    await p.m("stake", { ts: 5, addr: "c", deposit: 2 })
    expect((await p.d("get", { ts: 7, addr: "a" })).amount).to.eql("29")
    expect((await p.d("get", { ts: 7, addr: "b" })).amount).to.eql("6")
    expect((await p.d("get", { ts: 7, addr: "c" })).amount).to.eql("25")
    return
  })

  it("should deploy staking contract", async () => {
    const infra = await ar.gen()
    const validator_1 = await ar.gen()
    const validator_2 = await ar.gen()
    const delegator_1 = await ar.gen()
    const delegator_2 = await ar.gen()
    const { pid: _db, p: db } = ok(
      await ao2.deploy({ src_data: src.data("tDB") }),
    )
    expect(await db.d("Info", "Name")).to.eql("Testnet DB")
    const { pid: _eth, p: eth } = ok(
      await ao2.deploy({ src_data: src.data("taoETH") }),
    )
    expect(await eth.d("Info", "Name")).to.eql("Testnet aoETH")

    const { pid: _stake, p: stake } = ok(
      await ao2.deploy({
        src_data: src.data("staking"),
        fills: { DB: _db, TOKEN: _eth },
      }),
    )
    const { pid: _wdb, p: wdb } = ok(
      await ao2.deploy({
        src_data: src.data("weavedb"),
        fills: { BUNDLER: infra.addr, STAKING: _stake },
      }),
    )
    const bal = async (p, qty, tar) => {
      tar ??= ar.addr
      expect((await p.d("Balances"))[tar]).to.eql(Number(qty).toString())
    }
    const getNodes = async () => await stake.d("Get-Nodes")
    const getDB = async () => await stake.d("Get-DB", { DB: _wdb })

    const stakeBal = async (qty, tar) => {
      tar ??= ar.addr
      const out = await getDB()
      expect(out.stakes[tar]).to.eql(Number(qty).toString())
    }

    const mint = async (p, qty, exp, jwk) => {
      await p.m("Mint", { Quantity: qty }, { check: /minted/, jwk })
      if (!isNil(exp)) await bal(p, exp, jwk ? await ar.toAddr(jwk) : null)
    }

    const transfer = async (p, qty, exp, to = _stake, jwk) => {
      await p.m(
        "Transfer",
        {
          Recipient: to,
          Quantity: qty,
          "X-DB": _wdb,
        },
        { check: /transferred/, jwk },
      )
      if (!isNil(exp)) await bal(p, exp, jwk ? await ar.toAddr(jwk) : null)
    }
    const delegate = async (who, qty, exp, to = _stake, jwk) => {
      await eth.m(
        "Transfer",
        {
          Recipient: to,
          Quantity: qty,
          "X-DB": _wdb,
          "X-Action": "Delegate",
          "X-Delegate-To": who,
        },
        { check: /transferred/, jwk },
      )
      if (!isNil(exp)) await bal(eth, exp, jwk ? await ar.toAddr(jwk) : null)
    }
    const setReward = async (qty, exp, jwk) => {
      await db.m(
        "Transfer",
        {
          Recipient: _stake,
          Quantity: qty,
          "X-Duration": 300000,
          "X-Action": "Set-Reward",
        },
        { check: /transferred/, jwk },
      )
      if (!isNil(exp)) await bal(db, exp, jwk ? await ar.toAddr(jwk) : null)
    }
    const send = async (p, qty, exp, to = _stake, jwk) => {
      await p.m(
        "Transfer",
        { Recipient: to, Quantity: qty },
        { check: /transferred/, jwk },
      )
      if (!isNil(exp)) await bal(p, exp, jwk ? await ar.toAddr(jwk) : null)
    }

    const withdraw = async (qty, exp, exp_stake, jwk) => {
      await stake.m(
        "Withdraw",
        { Quantity: qty, DB: _wdb },
        { check: /withdrew/, jwk },
      )
      if (!isNil(exp)) await bal(eth, exp, jwk ? await ar.toAddr(jwk) : null)
      if (!isNil(exp_stake)) {
        await stakeBal(exp_stake, jwk ? await ar.toAddr(jwk) : null)
      }
    }

    const withdrawDB = async (exp, jwk) => {
      await stake.m("Withdraw-DB", null, { check: /withdrew/, jwk })
      if (!isNil(exp)) await bal(db, exp, jwk ? await ar.toAddr(jwk) : null)
    }

    const info = async () => {
      return await stake.d("Info", null, {
        get: [
          "MinETH",
          "NodeCount",
          "TotalStake",
          "TotalDeposit",
          "TotalReward",
        ],
      })
    }

    const addNode = async () => {
      await eth.m(
        "Transfer",
        {
          Recipient: _stake,
          Quantity: g(1),
          "X-Action": "Add-Node",
          "X-URL": "https://test.wdb.ae",
        },
        { jwk: infra.jwk, check: /transferred/ },
      )
    }

    const addDB = async () => {
      await stake.m(
        "Add-DB",
        {
          Node: 1,
          Allocations: {
            infra: "40",
            protocol: "10",
            validators: "40",
            [delegator_2.addr]: "10",
          },
          Price: w(1),
          DB: _wdb,
          Validators: 2,
          "Min-Stake": 1,
        },
        { jwk: infra.jwk, check: "db added!" },
      )
    }
    await mint(db, w(20000), w(20000))
    await setReward(w(10000), w(10000))
    await mint(eth, g(100), g(100))
    await send(eth, g(10), g(90), infra.addr)
    await send(eth, g(10), g(80), validator_1.addr)
    await send(eth, g(10), g(70), validator_2.addr)
    await send(eth, g(10), g(60), delegator_1.addr)
    await send(eth, g(10), g(50), delegator_2.addr)
    await addNode()
    await addDB()
    await transfer(eth, g(1), g(9), _stake, validator_1.jwk)
    await transfer(eth, g(3), g(7), _stake, validator_2.jwk)
    await transfer(db, w(100), w(9900))
    await withdraw(g(2), g(9), g(1), validator_2.jwk)
    await delegate(validator_1.addr, g(1), g(9), _stake, delegator_1.jwk)
    const { mid, out } = await wdb.msg("Rollup", {
      jwk: infra.jwk,
      data: {
        hash: "abc",
        block_height: 1,
        zkdb: "def",
        txs: ppl,
        diffs: map(v => ({
          collection: "ppl",
          doc: v.name,
          op: "set",
          data: v,
        }))(ppl),
      },
      check: "committed!",
      get: false,
    })

    await stake.m(
      "Validate",
      { DB: _wdb, Block: 1, ["TxID"]: mid },
      { check: "validated!", jwk: validator_1.jwk },
    )

    await stake.m(
      "Validate",
      { DB: _wdb, Block: 1, ["TxID"]: mid },
      { check: "finalized!", jwk: validator_2.jwk },
    )
    await withdrawDB(null, infra.jwk)
    await withdrawDB(null, validator_1.jwk)
    await stake.m(
      "Withdraw",
      { DB: _wdb, "Delegate-To": validator_1.addr, Quantity: g(1) },
      { jwk: delegator_1.jwk },
    )
    //await wait(2000)
    expect(await eth.d("Balance", { Recipient: delegator_1.addr })).to.eql(
      g(10) * 1,
    )
  })

  it("should deploy tDB token and subledgers", async () => {
    const { pid, p: tdb } = await ao2.deploy({ src_data: src.data("tDB") })
    expect(await tdb.d("Info", "Name")).to.eql("Testnet DB")
    await tdb.m("Mint", { Quantity: "100" })
    expect((await tdb.d("Balances"))[ar.addr]).to.eql("100")
    const { pid: pid2, p: node } = await ao2.deploy({
      src_data: src.data("weavedb_node"),
      fills: { PARENT: pid, SOURCE: pid },
    })
    await tdb.m("Transfer", { Recipient: pid2, Quantity: "10" })
    //await wait(3000)
    await node.m("Transfer", {
      Sender: ar.addr,
      Recipient: pid2,
      Quantity: "5",
    })
    await node.m("Withdraw", { Quantity: "3" })
    //await wait(3000)
    expect((await node.d("Balances"))[ar.addr]).to.eql("2")
    expect((await tdb.d("Balances"))[ar.addr]).to.eql("93")
  })
})
