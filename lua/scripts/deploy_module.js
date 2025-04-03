import yargs from "yargs"
import setup from "./setup.js"
import { Src } from "wao/test"
import { wait } from "wao/utils"
const { wallet = "owner", network = "localhost" } = yargs(
  process.argv.slice(2),
).argv

import { createDataItemSigner, spawn } from "@permaweb/aoconnect"

const main = async () => {
  const { ao } = await setup({ wallet, network })
  await ao.ar.mint(ao.ar.addr, "10")
  const src = new Src({ ar: ao.ar })
  await wait(100)
  const wasm_aos2 = await src.upload("aos2_0_1", "wasm")
  const { id: module_aos2 } = await ao.postModule({
    data: await ao.ar.data(wasm_aos2),
  })
  const { scheduler } = await ao.postScheduler({
    url: "http://localhost:4000",
    overwrite: true,
  })
  console.log(`AUTHORITY=${ao.authority}`)
  console.log(`MODULE=${module_aos2}`)
  console.log(`SCHEDULER=${scheduler}`)
}
main()
