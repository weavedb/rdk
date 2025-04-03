import yargs from "yargs"
import setup from "./setup.js"
const { wallet = "bundler", network = "localhost" } = yargs(
  process.argv.slice(2),
).argv

const main = async () => {
  const { tdb, ao, src } = await setup({ wallet, network })
  const { err, pid, p } = await ao.deploy({
    src_data: src.data("weavedb_node"),
    fills: { PARENT: tdb, SOURCE: tdb },
  })
  if (err) return console.log(err)
  console.log(`NODE=${pid}`)
}
main()
