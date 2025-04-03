import assert from "assert"
import { describe, it } from "node:test"
import DB from "../src/index.js"
import { AO, acc } from "wao/test"
import { resolve } from "path"

import wasm from "../src/wasm.js"
import client from "../src/client.js"

describe("test", () => {
  it("should test", async () => {
    const db = await new DB({
      reset: true,
      cache: resolve(import.meta.dirname, ".cache"),
    }).init()
    await db.add({ name: "Bob" }, "ppl")
    const { id } = await db.set({ name: "Alice" }, "ppl", "Alice")
    await db.update({ age: 3 }, "ppl", id)
    console.log(await db.get("ppl"))
  })
})
