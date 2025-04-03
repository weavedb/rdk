const { abi } = require("@/lib/utils")
const { Wallet, getDefaultProvider, Contract } = require("ethers")
const provider = getDefaultProvider("sepolia", {
  alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
})
import DB from "weavedb-node-client"
const privateKey = process.env.PRIVATE_KEY
const wallet = new Wallet(privateKey, provider)

export default async function handler(req, res) {
  const { key, contractTxId } = JSON.parse(req.body)
  let success = false
  const db2 = new DB({ rpc: process.env.NEXT_PUBLIC_RPC_NODE, contractTxId })
  const hash = (await db2.node({ op: "hash", key })).hash
  let updated = false
  if (hash) {
    const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT, abi, wallet)
    const hash2 = await contract.roots(contractTxId)
    console.log(hash2)
    try {
      if (BigInt(hash) === hash2) {
        success = true
      } else {
        const tx = await contract.commitRoot(contractTxId, hash)
        const res = await tx.wait()
        if (res.status === 1) {
          success = true
          updated = true
        }
      }
    } catch (e) {}
  }
  res.status(200).json({ updated, success, hash, contractTxId })
}
