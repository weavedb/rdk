import { AR, AO } from "wao"
import { wait } from "wao/utils"
import { Src } from "wao/test"
import { dirname, resolve } from "path"
import yargs from "yargs"
import networks from "./network.js"
const { network = "localhost" } = yargs(process.argv.slice(2)).argv
import dotenv from "dotenv"
dotenv.config(`.env.${network}`)
import { readFileSync } from "fs"
import { fileURLToPath } from "node:url"
const __dirname = dirname(fileURLToPath(import.meta.url))
export default async ({ authority, wallet, network, module, scheduler }) => {
  let opt = {
    ...networks[network],
    module: module ?? process.env.MODULE,
    scheduler: scheduler ?? process.env.SCHEDULER,
    authority: authority ?? process.env.AUTHORITY,
  }
  const jwk = JSON.parse(
    readFileSync(resolve(__dirname, ".wallets", `${wallet}.json`), "utf8"),
  )
  const ao = await new AO(opt).init(jwk)
  const src = new Src({
    ar: ao.ar,
    dir: resolve(__dirname, "../../lua/contracts"),
  })
  const tdb = process.env.TDB
  const eth = process.env.ETH
  const staking = process.env.STAKING
  const node = process.env.NODE
  const alchemy = process.env.ALCHEMY
  return {
    jwk,
    ao,
    src,
    authority: opt.authority,
    tdb,
    eth,
    staking,
    node,
    alchemy,
  }
}
