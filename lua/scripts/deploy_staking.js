import yargs from "yargs"
import setup from "./setup.js"
const { wallet = "owner", network = "localhost" } = yargs(
  process.argv.slice(2),
).argv

const main = async () => {
  const { ao, src, tdb, eth } = await setup({ wallet, network })
  const { err, pid, p } = await ao.deploy({
    src_data: src.data("staking"),
    fills: { DB: tdb, TOKEN: eth },
  })
  if (err) return console.log(err)
  console.log(`STAKING=${pid}`)
}
main()
