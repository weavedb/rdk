import wasm from "./wasm.js"
import client from "./client.js"
import AoLoader from "@permaweb/ao-loader"
import { AO, acc } from "wao/test"
import { writeFile, readFileSync } from "fs"

export default class DB {
  constructor({ cache, reset = false } = {}) {
    this.height = 0
    this.memory = null
    this.cache = cache
    this.reset = reset
  }
  async save() {
    clearTimeout(this.to)
    this.to = setTimeout(() => {
      const memory = this.ao.mem.env[this.pid].memory
      if (this.cache) writeFile(this.cache, memory, () => {})
    }, 100)
  }
  async init() {
    const memory = this.cache && !this.reset ? readFileSync(this.cache) : null
    const _wasm = Buffer.from(wasm, "base64")
    const _client = Buffer.from(client, "base64").toString()
    this.ao = await new AO().init(acc[0])
    const { id: module } = await this.ao.postModule({ data: _wasm })
    if (memory) {
      const { p, pid } = await this.ao.spwn({ module, memory })
      this.pid = pid
      this.p = p
    } else {
      const { p, pid } = await this.ao.deploy({ module, src_data: _client })
      this.pid = pid
      this.p = p
    }
    return this
  }
  async add(...query) {
    const res = await this.p.m("Add", { Query: JSON.stringify(query) })
    this.save()
    return res
  }
  async set(...query) {
    const res = await this.p.m("Set", { Query: JSON.stringify(query) })
    this.save()
    return res
  }
  async update(...query) {
    const res = await this.p.m("Update", { Query: JSON.stringify(query) })
    this.save()
    return res
  }
  async upsert(...query) {
    const res = await this.p.m("Upsert", { Query: JSON.stringify(query) })
    this.save()
    return res
  }
  async delete(...query) {
    const res = await this.p.m("Delete", { Query: JSON.stringify(query) })
    this.save()
    return res
  }
  async get(...query) {
    return await this.p.d("Get", { Query: JSON.stringify(query) })
  }
  async cget(...query) {
    return await this.p.d("Cget", { Query: JSON.stringify(query) })
  }
}
