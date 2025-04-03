import assert from "assert"
import { describe, it } from "node:test"
import { AO, Src, acc } from "wao/test"
import { resolve } from "path"

describe("WeaveDB", function () {
  it("should handle", async () => {
    const ao = await new AO().init(acc[0])
    const src = new Src({ dir: resolve(import.meta.dirname, "../lua") })
    const client = src.data("client")
    const { id: module } = await ao.postModule({
      data: src.data("process", "wasm"),
    })
    const { p, pid } = await ao.deploy({ module, src_data: client })
    assert.deepEqual(await p.d("Get", { Query: JSON.stringify(["ppl"]) }), [])
    const { id } = await p.m("Set", {
      Query: JSON.stringify([{ name: "Bob" }, "ppl", "bob"]),
    })
    const { id: id2 } = await p.m("Add", {
      Query: JSON.stringify([{ name: "Alice" }, "ppl"]),
    })

    const { id: id3 } = await p.m("Upsert", {
      Query: JSON.stringify([{ name: "Beth" }, "ppl", "beth"]),
    })
    const { id: id4 } = await p.m("Update", {
      Query: JSON.stringify([{ age: 4 }, "ppl", id3]),
    })
    const { id: id5 } = await p.m("Delete", {
      Query: JSON.stringify(["ppl", id]),
    })

    assert.deepEqual(await p.d("Cget", { Query: JSON.stringify(["ppl"]) }), [
      { __cursor__: true, id: "1", data: { name: "Alice" } },
      { __cursor__: true, id: "beth", data: { name: "Beth", age: 4 } },
    ])
  })
})
