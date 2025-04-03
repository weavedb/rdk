import { AR, AO } from "aonote"
import yargs from "yargs"
import { dirname, resolve } from "path"
import { readFileSync } from "fs"
import { fileURLToPath } from "node:url"
const __dirname = dirname(fileURLToPath(import.meta.url))
const wait = ms => new Promise(res => setTimeout(() => res(), ms))
const {
  token,
  to,
  wallet = "bundler",
  network = "mainnet",
  quantity = "100000000",
  decimal = 12,
} = yargs(process.argv.slice(2)).argv

const main = async () => {
  const jwk = JSON.parse(
    readFileSync(resolve(__dirname, ".wallets", `${wallet}.json`), "utf8"),
  )
  const opt = network === "localhost" ? { port: 4000 } : {}
  const ar = await new AR(opt).init(jwk)
  let opt2 = { ar }
  if (network === "localhost") {
    opt2 = {
      ar,
      module: "YTNXvQu2x21DD6Pm8zicVBghB-BlnM5VRrVRyfhBPP8",
      scheduler: "-_vZZQMEnvJmiIIfHfp_KuuV6ud2b9VSThfTmYytYQ8",
      aoconnect: {
        MU_URL: "http://localhost:4002",
        CU_URL: "http://localhost:4004",
        GATEWAY_URL: "http://localhost:4000",
      },
    }
  }
  let zero = ""
  for (let i = 0; i < decimal; i++) {
    zero += "0"
  }
  const ao = new AO(opt2)
  const res = await ao.msg({
    pid: token,
    act: "Transfer",
    tags: { Recipient: to, Quantity: `${quantity}${zero}` },
  })
  console.log(res)
  console.log(
    (
      await ao.dry({
        pid: token,
        act: "Balances",
        get: { data: true, json: true },
      })
    ).out,
  )
}
main()
