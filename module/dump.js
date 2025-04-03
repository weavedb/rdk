import { resolve } from "path"
import { writeFileSync, readFileSync } from "fs"
const wasm = resolve(import.meta.dirname, "lua/process.wasm")
const client = resolve(import.meta.dirname, "lua/client.lua")
const data = readFileSync(wasm)
const data_c = readFileSync(client)
const wasmjs = resolve(import.meta.dirname, "sdk/src/wasm.js")
const clientjs = resolve(import.meta.dirname, "sdk/src/client.js")
const exp = `export default "${data.toString("base64")}"`
const exp_c = `export default "${data_c.toString("base64")}"`
writeFileSync(wasmjs, exp)
writeFileSync(clientjs, exp_c)
