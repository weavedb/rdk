const { Server } = require("./server")

const {
  dbname = null,
  port = 9090,
  config = "./weavedb.config.js",
} = require("yargs")(process.argv.slice(2)).argv

const server = new Server({ port, dbname, conf: require(config) })

if (server.conf.nostr) {
  const { nostr } = require("./nostr")
  nostr({ server, port: server.conf.nostr.port, db: server.conf.nostr.db })
}
