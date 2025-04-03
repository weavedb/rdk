import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs"
import EthCrypto from "eth-crypto"
import { dirname, resolve } from "path"
import { fileURLToPath } from "node:url"
import _Arweave from "arweave"
const Arweave = _Arweave.default ?? _Arweave

const __dirname = dirname(fileURLToPath(import.meta.url))
const wallets = {
  ar: ["owner", "bundler", "db", "validator1", "validator2", "delegator"],
  eth: ["committer", "admin"],
}

const main = async () => {
  const dir = resolve(__dirname, ".wallets")
  if (!existsSync(dir)) mkdirSync(dir)
  const arweave = Arweave.init()
  for (const type in wallets) {
    for (const name of wallets[type]) {
      const file = resolve(dir, `${name}.json`)
      if (existsSync(file)) {
        console.log("exists:", name)
      } else {
        let wallet = null
        if (type === "ar") {
          wallet = await arweave.wallets.generate()
        } else if (type === "eth") {
          wallet = EthCrypto.createIdentity()
        }
        if (wallet) {
          writeFileSync(file, JSON.stringify(wallet))
          console.log("generated:", name)
        }
      }
    }
  }
}

main()
