import yargs from "yargs"
import { concat } from "ramda"
import setup from "./setup.js"
import { Src } from "wao/test"
import { wait, srcs } from "wao/utils"
import { dirname, resolve } from "path"
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs"
import { fileURLToPath } from "node:url"
const __dirname = dirname(fileURLToPath(import.meta.url))

const {
  owner = "owner",
  bundler = "bundler",
  validator1 = "validator1",
  validator2 = "validator2",
  delegator = "delegator",
  committer = "committer",
  db = "db",
  network = "localhost",
  admin = "admin",
} = yargs(process.argv.slice(2)).argv
const w = n => Number(n).toString() + "000000000000"
const g = n => Number(n).toString() + "000000000000000000"
const zkjson = "0x2F79B95E165011b1A02803B5B7A7a18A4978a3b9"
let wallets = {
  owner,
  bundler,
  validator1,
  validator2,
  db,
  delegator,
  committer,
  admin,
}
for (let k in wallets) {
  wallets[k] = JSON.parse(
    readFileSync(resolve(__dirname, ".wallets", `${k}.json`), "utf8"),
  )
}
import { createDataItemSigner, spawn } from "@permaweb/aoconnect"
let env = []
const deploy_token = async ({ ao, src, token }) => {
  const { err, pid, p } = await ao.deploy({ src_data: src.data(token) })
  if (err) {
    console.log(err)
    process.exit()
  }
  const { err: err2 } = await p.msg("Mint", {
    Quantity: token === "tDB" ? w(1000000000) : g(1000000),
  })
  if (err2) {
    console.log(err2)
    process.exit()
  }
  console.log(`${token === "tDB" ? "TDB" : "ETH"}=${pid}`)
  return pid
}

const deploy_staking = async ({ ao, src, tdb, eth }) => {
  const { err, pid, p } = await ao.deploy({
    src_data: src.data("staking"),
    fills: { DB: tdb, TOKEN: eth },
  })
  if (err) {
    console.log(err)
    process.exit()
  }
  env.push(`STAKING=${pid}`)
  console.log(`STAKING=${pid}`)
  return pid
}

const deploy_node = async ({ ao, src, tdb }) => {
  const { err, pid, p } = await ao.deploy({
    src_data: src.data("weavedb_node"),
    fills: { PARENT: tdb, SOURCE: tdb },
    jwk: wallets.bundler,
  })
  if (err) {
    console.log(err)
    process.exit()
  }
  env.push(`NODE=${pid}`)
  console.log(`NODE=${pid}`)
  return pid
}

const set_reward = async ({
  ao,
  tdb,
  staking,
  amount = 100000000,
  duration = 1000 * 60 * 60 * 24 * 365,
}) => {
  const db = ao.p(tdb)
  const { mid } = await db.msg(
    "Transfer",
    {
      Recipient: staking,
      Quantity: w(amount),
      "X-Duration": duration,
      "X-Action": "Set-Reward",
    },
    { check: /transferred/ },
  )
  console.log("reward set! " + mid)
}

const main = async () => {
  const { ao, src, alchemy } = await setup({ wallet: owner, network })
  env.push(`ALCHEMY=${alchemy}`)
  let authority, module_aos2, scheduler
  if (network === "mainnet") {
    ;({ scheduler, module_aos2, authority } = srcs)
  } else {
    await ao.ar.mint(ao.ar.addr, "10")
    const src2 = new Src({ ar: ao.ar })
    await wait(100)
    const wasm_aos2 = await src2.upload("aos2_0_1", "wasm")
    ;({ id: module_aos2 } = await ao.postModule({
      data: await ao.ar.data(wasm_aos2),
    }))
    ;({ scheduler } = await ao.postScheduler({
      url: "http://localhost:4003",
      overwrite: true,
    }))
    authority = ao.authority
  }
  env.push(`AUTHORITY=${authority}`)
  console.log(`AUTHORITY=${authority}`)
  env.push(`MODULE=${module_aos2}`)
  console.log(`MODULE=${module_aos2}`)
  env.push(`SCHEDULER=${scheduler}`)
  console.log(`SCHEDULER=${scheduler}`)
  const { ao: ao2 } = await setup({
    wallet: owner,
    network,
    module: module_aos2,
    scheduler,
    authority,
  })
  const tdb = await deploy_token({ ao: ao2, src, token: "tDB" })
  const eth = await deploy_token({ ao: ao2, src, token: "taoETH" })
  const staking = await deploy_staking({ ao: ao2, src, tdb, eth })
  const node = await deploy_node({ ao: ao2, src, tdb })

  env.push(`TDB=${tdb}`)
  env.push(`ETH=${eth}`)
  writeFileSync(resolve(import.meta.dirname, "../.env"), env.join("\n"))
  writeFileSync(
    resolve(import.meta.dirname, `../.env.${network}`),
    env.join("\n"),
  )

  console.log()

  await set_reward({ ao, tdb, staking })

  let pubs = []
  try {
    pubs = readFileSync(
      resolve(import.meta.dirname, `../../demo/.env.${network}.local`),
      "utf8",
    ).split("\n")
  } catch (e) {
    const mainnet = [
      `NEXT_PUBLIC_CONTRACT="${zkjson}"`,
      `NEXT_PUBLIC_SCAN="https://scan.weavedb.dev"`,
      `NEXT_PUBLIC_NODE="ao-test"`,
      `NEXT_PUBLIC_RPC="https://test.wdb.ae"`,
      `NEXT_PUBLIC_RPC_NODE="test.wdb.ae:443"`,
    ]
    const testnet = [
      `NEXT_PUBLIC_CONTRACT="${zkjson}"`,
      `NEXT_PUBLIC_SCAN="https://scan.weavedb.dev"`,
      `NEXT_PUBLIC_NODE="localhost"`,
      `NEXT_PUBLIC_RPC="http://localhost:8080"`,
      `NEXT_PUBLIC_RPC_NODE="localhost:8080"`,
    ]

    pubs = concat(network === "localhost" ? testnet : mainnet, [
      `NEXT_PUBLIC_TDB=${tdb}`,
      `NEXT_PUBLIC_ETH=${eth}`,
      `NEXT_PUBLIC_ADMIN_CONTRACT=${node}`,
      `NEXT_PUBLIC_STAKING=${staking}`,
    ])
  }

  let i = 0
  for (let v of pubs) {
    let sp = v.split("=")
    if (sp[0] === "NEXT_PUBLIC_TDB") pubs[i] = `NEXT_PUBLIC_TDB=${tdb}`
    if (sp[0] === "NEXT_PUBLIC_ETH") pubs[i] = `NEXT_PUBLIC_ETH=${eth}`
    if (sp[0] === "NEXT_PUBLIC_ADMIN_CONTRACT")
      pubs[i] = `NEXT_PUBLIC_ADMIN_CONTRACT=${node}`
    if (sp[0] === "NEXT_PUBLIC_STAKING")
      pubs[i] = `NEXT_PUBLIC_STAKING=${staking}`
    i++
  }
  writeFileSync(
    resolve(import.meta.dirname, "../../demo/.env.local"),
    pubs.join("\n"),
  )
  writeFileSync(
    resolve(import.meta.dirname, `../../demo/.env.${network}.local`),
    pubs.join("\n"),
  )
  const config_dir = resolve(
    import.meta.dirname,
    "../../node/node-server/.configs/",
  )
  if (!existsSync(config_dir)) mkdirSync(config_dir)
  const config_json = resolve(config_dir, `${network}.json`)
  let config = {}
  try {
    config = JSON.parse(readFileSync(config_json, "utf8"))
  } catch (e) {}
  config.admin ??= wallets.admin.privateKey
  config.admin_contract = node
  config.staking = staking
  config.zk_contract ??= zkjson
  config.evm_network ??= "sepolia"
  config.alchemy_key ??= alchemy
  config.aos ??= {}
  config.aos.module = module_aos2
  config.aos.scheduler = scheduler
  config.bundler ??= wallets.bundler
  config.validators ??= [wallets.validator1, wallets.validator2]
  config.committers ??= [wallets.committer]

  if (network === "localhost") {
    config.aos.ar = { port: 4000 }
    config.aos.aoconnect = {
      MU_URL: "http://localhost:4002",
      CU_URL: "http://localhost:4004",
      GATEWAY_URL: "http://localhost:4000",
    }
  } else {
    config.aos.ar = {}
    delete config.aos.aoconnect
  }
  const config_path = resolve(
    import.meta.dirname,
    "../../node/node-server/weavedb.config.js",
  )

  writeFileSync(
    config_path,
    `module.exports = ${JSON.stringify(config, null, 2)}`,
  )
  writeFileSync(config_json, JSON.stringify(config, null, 2))

  const p = ao.p(tdb)
  const p2 = ao.p(eth)
  const db_addr = await ao.ar.toAddr(wallets.db)
  const bundler_addr = await ao.ar.toAddr(wallets.bundler)
  const validator1_addr = await ao.ar.toAddr(wallets.validator1)
  const validator2_addr = await ao.ar.toAddr(wallets.validator2)
  const delegator_addr = await ao.ar.toAddr(wallets.delegator)

  await p.m("Transfer", { Quantity: w(10000), Recipient: db_addr })
  console.log(`Transferred 10000 tDB to ${db_addr}`)
  await p2.m("Transfer", { Quantity: g(10), Recipient: bundler_addr })
  console.log(`Transferred 10 taoETH to ${bundler_addr}`)
  await p2.m("Transfer", { Quantity: g(10), Recipient: validator1_addr })
  console.log(`Transferred 10 taoETH to ${validator1_addr}`)
  await p2.m("Transfer", { Quantity: g(10), Recipient: validator2_addr })
  console.log(`Transferred 10 taoETH to ${validator2_addr}`)
  await p2.m("Transfer", { Quantity: g(10), Recipient: delegator_addr })
  console.log(`Transferred 10 taoETH to ${delegator_addr}`)
  const p_eth = ao.p(eth)

  const url =
    network === "localhost"
      ? "http://localhost:8080"
      : "https://test.wdb.ae:443"
  await p_eth.m(
    "Transfer",
    {
      Recipient: staking,
      Quantity: g(1),
      "X-Action": "Add-Node",
      "X-URL": url,
    },
    { jwk: wallets.bundler, check: /transferred/ },
  )
  console.log(`Node added: ${url}`)
}

main()
