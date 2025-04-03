import yargs from "yargs"
import setup from "./setup.js"
const {
  wallet = "owner",
  network = "localhost",
  amount = "100000000",
  duration = 1000 * 60 * 60 * 24 * 365,
} = yargs(process.argv.slice(2)).argv

const main = async () => {
  const { ao, src, staking, tdb } = await setup({ wallet, network })
  const db = ao.p(tdb)
  const { mid } = await db.msg(
    "Transfer",
    {
      Recipient: staking,
      Quantity: amount + "000000000000",
      "X-Duration": duration,
      "X-Action": "Set-Reward",
    },
    { check: /transferred/ },
  )
  console.log("reward set! " + mid)
}
main()
