const express = require("express")
let count = 0
let data = {}
let mid = 0

const CU = async port => {
  const app = express()
  app.get("/spawn", (req, res) => {
    res.json({ pid: `tx-${++count}` })
  })
  app.get("/msg", (req, res) => {
    if (req.query.act === "Rollup") {
      const diffs = JSON.parse(req.query.input)
      for (const v of diffs) {
        data[v.collection] ??= {}
        data[v.collection][v.doc] = v.data
      }
      res.json({ mid: `msg-${++mid}` })
    } else {
      const { query } = JSON.parse(req.query.input).Input
      res.json({ mid: `msg-${++mid}`, out: data[query[0]][query[1]] })
    }
  })
  app.listen(port, () => console.log(`AO on port ${port}`))
}

class AO {
  constructor() {}
  async init() {
    return this
  }
  async deploy() {
    return await fetch("http://localhost:4001/spawn").then(v => v.json())
  }
  async msg({ pid, tags, act }) {
    return await fetch(
      `http://localhost:4001/msg?input=${JSON.stringify(tags)}&act=${act}`,
    ).then(v => v.json())
  }
}

module.exports = { AO, CU }
