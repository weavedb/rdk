import yargs from "yargs"
import setup from "./setup.js"
const {
  token = "tDB",
  wallet = "owner",
  network = "localhost",
} = yargs(process.argv.slice(2)).argv
import { createDataItemSigner, spawn } from "@permaweb/aoconnect"
const main = async () => {
  const { ao, src } = await setup({ wallet, network })
  const { err, pid, p } = await ao.deploy({ src_data: src.data(token) })
  if (err) return console.log(err)
  const { err: err2 } = await p.msg("Mint", {
    Quantity:
      token === "tDB"
        ? "1000000000" + "000000000000"
        : "1000000" + "000000000000000000",
  })
  if (err2) return console.log(err2)
  console.log(`${token === "tDB" ? "TDB" : "ETH"}=${pid}`)
}
main()
