const { VM } = require("./vm")
const { Server } = require("./server")

const {
  dbname = null,
  port = 9090,
  config = "./weavedb.config.js",
} = require("yargs")(process.argv.slice(2)).argv

const vm = new VM({ dbname, conf: require(config) })
new Server({ query: vm.query.bind(vm) })

if (vm.conf.nostr) {
  const { nostr } = require("./nostr")
  nostr({ server: vm, port: vm.conf.nostr.port, db: vm.conf.nostr.db })
}
