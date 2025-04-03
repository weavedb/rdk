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
const {
  provider: _provider,
  Wallet,
  getDefaultProvider,
  Contract,
  JsonRpcProvider,
} = require("ethers")
const { tags } = require("wao/utils")
let arweave = require("arweave")
let AO = null
const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_verifierRU",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifierDB",
        type: "address",
      },
      {
        internalType: "address",
        name: "_committer",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "commit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_root",
        type: "uint256",
      },
    ],
    name: "commitRoot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "committer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qBool",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "cond",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qCond",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "path2",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qCustom",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qFloat",
    outputs: [
      {
        internalType: "uint256[3]",
        name: "",
        type: "uint256[3]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qInt",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qNull",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qRaw",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "roots",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifierDB",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifierRU",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

class Committer {
  constructor({
    pid,
    committer,
    contract,
    staking,
    aos,
    alchemy_key,
    evm_network,
  }) {
    this.alchemy_key = alchemy_key
    this.evm_network = evm_network
    this.pid = pid
    this.committer = committer
    this.aos = aos
    this.staking = staking
    this.contract = contract
    this.hash = null
    this.committing = false
    if (aos?.mem) {
      const { AO: TAO } = require("wao/test")
      AO = TAO
    } else {
      const { AO: MAO } = require("wao")
      AO = MAO
    }

    this.start()
  }
  async commit() {
    let ao = new AO(this.aos)
    let p = ao.p(this.staking)
    if (this.committing) return
    this.committing = true
    try {
      const db = await p.d("Get-DB", { DB: this.pid })
      const block = db.blocks[db.height]
      if (block?.txid) {
        const _hash = JSON.parse(await ao.ar.data(block.txid, true)).zkdb
        if (_hash && _hash !== this.hash) {
          let contract = null
          if (!this.alchemy_key) {
            const wallet = new ethers.Wallet(
              this.committer.privateKey,
              ethers.provider,
            )
            contract = new ethers.Contract(this.contract, abi, wallet)
          } else {
            const provider = new JsonRpcProvider(
              `https://eth-${this.evm_network}.g.alchemy.com/v2/${this.alchemy_key}`,
            )
            const wallet = new Wallet(this.committer.privateKey, provider)
            contract = new Contract(this.contract, abi, wallet)
          }
          const tx = await contract.commitRoot(this.pid, _hash)
          const receipt = await tx.wait()
          if (receipt.status) {
            console.log("hash committed!!", _hash)
            this.hash = _hash
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    this.committing = false
  }
  async start() {
    setInterval(() => this.commit(), 10000)
  }
}
class CNode {
  constructor() {
    this.committer = null
    this.funcs = {
      _: ({ op, id, send }) => send({ op, id }),
      new: ({ op, id, msg, send }) => {
        this.committer = new Committer(msg.params)
      },
    }
  }
}

const cnode = new CNode()

new Connected({ parent: process, funcs: cnode.funcs })

module.exports = CNode
