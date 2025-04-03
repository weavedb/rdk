import yargs from "yargs"
import setup from "./setup.js"
import { reverse } from "ramda"
import { tags } from "aonote/test/utils.js"
const {
  db = "db",
  wallet = "validator1",
  wallet2 = "validator2",
  staking = "stake",
  network = "mainnet",
} = yargs(process.argv.slice(2)).argv

let block = 0
const main = async () => {
  const { ao, src } = await setup({ wallet, network })
  const { ao: ao2 } = await setup({ wallet: wallet2, network })
  const p1 = ao.p(staking)
  const p2 = ao.p(staking)
  const txs = await ao.ar.txs(staking)
  for (let v of reverse(txs)) {
    for (let v2 of v.tags) {
      if (v2.value === "Rollup" && v2.value === db) {
      }
    }
  }

  for (let v of (await ao.results({ process: db })).edges) {
    for (let v2 of v.node.Messages) {
      let _tags = tags(v2.Tags)
      if (_tags.Action === "Rollup") {
        if (_tags.Block * 1 == block + 1) {
          console.log(_tags.Block)
          try {
            await p1.m(
              "Validate",
              { DB: db, Block: _tags.Block, ["TxID"]: _tags.TxID },
              { check: "validated!", jwk: ao.ar.jwk },
            )
            console.log("success?")
          } catch (e) {
            console.log("error1")
            console.log(e)
          }
          try {
            await p2.m(
              "Validate",
              { DB: db, Block: _tags.Block, ["TxID"]: _tags.TxID },
              { check: "finalized!", jwk: ao2.ar.jwk },
            )
            console.log("finalized!")
          } catch (e) {
            console.log(e)
            console.log("error2")
          }
          block += 1
        }
      }
    }
  }
  return
  const p = ao.p(staking)
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
