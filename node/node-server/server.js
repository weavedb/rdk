const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const { addReflection } = require("grpc-server-reflection")
const PROTO_PATH = __dirname + "/weavedb.proto"
const path = require("path")

class Server {
  constructor({ query, port = 9090 }) {
    this.port = port
    this.server = new grpc.Server()
    this.query = query
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
    this.weavedb = grpc.loadPackageDefinition(packageDefinition).weavedb
    this.start()
  }
  start() {
    this.server.addService(this.weavedb.DB.service, {
      query: this.query,
    })
    this.server.bindAsync(
      `0.0.0.0:${this.port}`,
      grpc.ServerCredentials.createInsecure(),
      () => {
        addReflection(
          this.server,
          path.resolve(__dirname, "./static_codegen/descriptor_set.bin"),
        )
        this.server.start()
      },
    )
    console.log(`server ready on ${this.port}!`)
  }
}

module.exports = { Server }
