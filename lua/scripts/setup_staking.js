import yargs from "yargs"
import setup from "./setup.js"
import { Src } from "wao/test"
import { wait } from "wao/utils"
import { dirname, resolve } from "path"
import { writeFileSync, readFileSync } from "fs"
import { fileURLToPath } from "node:url"
import config from "../../node/node-server/weavedb.config.js"
const __dirname = dirname(fileURLToPath(import.meta.url))
import DB from "weavedb-node-client"

const {
  owner = "owner",
  bundler = "bundler",
  validator1 = "validator1",
  validator2 = "validator2",
  delegator = "delegator",
  committer = "committer",
  db = "db",
  network = "localhost",
  dbname = "demo",
} = yargs(process.argv.slice(2)).argv
const w = n => Number(n).toString() + "000000000000"
const g = n => Number(n).toString() + "000000000000000000"

let wallets = { owner, bundler, validator1, validator2, db, delegator }
for (let k in wallets) {
  wallets[k] = JSON.parse(
    readFileSync(resolve(__dirname, ".wallets", `${k}.json`), "utf8"),
  )
}
wallets.committer = JSON.parse(
  readFileSync(resolve(__dirname, ".wallets", `${committer}.json`), "utf8"),
)
import { createDataItemSigner, spawn } from "@permaweb/aoconnect"

const main = async () => {
  const { tdb, eth, staking, node, ao, src } = await setup({
    wallet: owner,
    network,
  })

  await wait(1000)
  const token = ao.p(tdb)
  const aoeth = ao.p(eth)
  const st = ao.p(staking)
  const nd = ao.p(node)
  await token.m(
    "Transfer",
    { Recipient: node, Quantity: w(100) },
    { jwk: wallets.db },
  )

  console.log("deposit 100 tDB to the node!")
  await wait(5000)
  const db = new DB({
    rpc: network === "localhost" ? "localhost:8080" : "test.wdb.ae:443",
    contractTxId: dbname,
  })
  console.log(staking, await st.d("Balances"))
  console.log(node, await nd.d("Balances"))
  console.log(tdb, await token.d("Balances"))

  const tx = await db.admin(
    {
      op: "add_db",
      key: dbname,
      db: { rollup: true, owner: await ao.ar.toAddr(wallets.db) },
    },
    { ar2: wallets.db },
  )
  if (!tx.success) return console.log("error")

  console.log("db added!")
  const { contractTxId, srcTxId } = await db.admin(
    {
      op: "deploy_contract",
      key: dbname,
      type: "ao",
    },
    { ar2: wallets.db },
  )
  console.log("deployed:", contractTxId)
  await wait(5000)
  await token.m(
    "Transfer",
    {
      Recipient: staking,
      Quantity: w(1000),
      "X-DB": contractTxId,
    },
    { jwk: wallets.db },
  )
  console.log(`Deposit 1000 tDB token to:`, contractTxId)

  await aoeth.m(
    "Transfer",
    {
      Recipient: staking,
      Quantity: g(1),
      "X-DB": contractTxId,
    },
    { check: /transferred/, jwk: wallets.validator1 },
  )

  console.log(`Stake 1 taoETH as a validator1`)

  await aoeth.m(
    "Transfer",
    {
      Recipient: staking,
      Quantity: g(1),
      "X-DB": contractTxId,
    },
    { check: /transferred/, jwk: wallets.validator2 },
  )

  console.log(`Stake 1 taoETH as a validator2`)
  const db2 = new DB({
    rpc: network === "localhost" ? "localhost:8080" : "test.wdb.ae:443",
    contractTxId,
  })
  await db2.admin(
    {
      op: "add_validator",
      pid: contractTxId,
    },
    { ar2: wallets.validator1 },
  )
  console.log(`validator1 added!`)
  await db2.admin(
    {
      op: "add_validator",
      pid: contractTxId,
    },
    { ar2: wallets.validator2 },
  )
  console.log(`validator2 added!`)
  await db2.admin(
    {
      op: "add_committer",
      pid: contractTxId,
    },
    { privateKey: wallets.committer.privateKey },
  )
  console.log(`zk-committer added!`)
  const validator1_addr = await ao.ar.toAddr(wallets.validator1)
  await aoeth.m(
    "Transfer",
    {
      Recipient: staking,
      Quantity: g(1),
      "X-Action": "Delegate",
      "X-DB": contractTxId,
      "X-Delegate-To": validator1_addr,
    },
    { check: /transferred/, jwk: wallets.delegator },
  )
  console.log(`Delegated 1 taoETH to: ${validator1_addr}`)
}
main()
