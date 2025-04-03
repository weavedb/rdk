import yargs from "yargs"
import setup from "./setup.js"
const {
  tdb = "tDB",
  db = "db",
  wallet = "owner",
  staking = "stake",
  network = "mainnet",
} = yargs(process.argv.slice(2)).argv

const main = async () => {
  const { ao, src } = await setup({ wallet, network })
  const p = ao.p(tdb)
  console.log(
    await p.msg("Transfer", {
      Recipient: staking,
      Quantity: "1000000000000000",
      "X-DB": db,
    }),
  )
  console.log("depositted!")
}
main()
