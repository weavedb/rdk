const { connect } = require("@permaweb/ao-scheduler-utils")
const { DB: ZKDB } = require("zkjson")
const fs = require("fs")
const { Connected } = require("./connection")
const { cpSync, rmSync } = require("fs")
const {
  uniq,
  concat,
  equals,
  o,
  sortBy,
  mergeLeft,
  prop,
  last,
  keys,
  isNil,
  is,
  pluck,
  map,
  includes,
  path: _path,
  flatten,
} = require("ramda")
const DB = require("weavedb-offchain")
const { open } = require("lmdb")
const path = require("path")
const EthCrypto = require("eth-crypto")

let arweave = require("arweave")
let AO = null
class Validator {
  constructor({ pid, addr, staking, jwk, aos }) {
    this.pid = pid
    this.addr = addr
    this.jwk = jwk
    this.aos = aos
    this.staking = staking
    if (aos?.mem) {
      const { AO: TAO } = require("wao/test")
      AO = TAO
    } else {
      const { AO: MAO } = require("wao")
      AO = MAO
    }

    this.start()
  }
  async validate() {
    let ao = new AO(this.aos)
    let p = ao.p(this.staking)
    try {
      const db = await p.d("Get-DB", { DB: this.pid })
      if (!db) return
      const block = db.blocks[db.height + 1]
      if (block && !block.finalized && !block.validators?.[this.addr]) {
        console.log("validating...:", db.height + 1)
        await p.m(
          "Validate",
          { DB: this.pid, Block: db.height + 1, ["TxID"]: block.txid },
          { check: "validated!", jwk: this.jwk },
        )
      }
    } catch (e) {
      console.log("fetch failed...")
    }
  }
  async start() {
    setInterval(() => this.validate(), 10000)
  }
}
class VNode {
  constructor() {
    this.validator = null
    this.funcs = {
      _: ({ op, id, send }) => send({ op, id }),
      new: ({ op, id, msg, send }) => {
        this.validator = new Validator(msg.params)
      },
    }
  }
}

const vnode = new VNode()

new Connected({ parent: process, funcs: vnode.funcs })

module.exports = VNode
