# WeaveDB Rollup Development Kit

![](./assets/architecuture.png)

## How Rollup Works

- A rollup node can have multiple DB instances.
- The admin user can add/update/remove DB instances.
- Once a DB is added, the gateway node dispatches rollup child process which contains an L2 DB, a WAL DB, and plugins DBs. All these DBs are offchain WeaveDB instances.
- If an L1 DB contract is deployed and rollup is enabled, the rollup process dispatches yet another child process for Warp SDK that keeps bundling L2 transactions and roll them up to the Warp sequencer in parallel.
- The L1 WeaveDB contract can receive bundle transactions in parallel in any order, but can resolve the correct order and compute the exact same state as the corresponding L2 contract. L2 transaction hashes are chaind in such a way that L1 contract can resolve L2 transaction order.
- When the WeaveDB Gateway receives an L2 query, it dispatches the query to the L2 DB on the rollup process, which triggers a WAL DB query, which in turn triggers offchain plugin DB queries.
- If the rollup node started without any local cache, it can recover the L2 DB state from the corresponding L1 contract.
- Users can query the DB directly on the L1 Warp contract, since L2 and L1 share the identical contract. The L1 delay is only a few seconds as the rollup flow takes less than 2 seconds.

## Set up a Node

### Prerequisites

Install `docker` and `docker-compose` globally to your machine. And open port `8080` for anyone.

### weavedb.config.js

Create `weavedb.config.js` in `/grpc-node/node-server` directory.  

#### The minimum requirements

- `admin` : an EVM private key for rollup node admin. The admin can add DBs to the node.
- `bundler` : Arweave RSA keys for rollup bundler.  
The bundler will pay for rollup transactions and receive rewards from PoS in the future.
- `rollups` : this can be either empty or filled with pre-defined DB instances. Each key is the database name.
  - `secure` : passed down to the contract initial-state, allways use `true` in production (default).
  - `owner` : the DB contract owner EVM address.
  - `tick` : time span in millisecond in which [tick](https://weavedb.vercel.app/docs/sdk/crons#tick) query will be periodically executed.
  - `contractTxId` : Warp L1 contractTxId.
  - `plugins` : add offchain plugins, plugin scripts have to be placed in `/grpc-node/node-server/plugins` with the same name.
  - `rollup` : a bloolean value to enable rollup to Arweave/Warp

```js title="/grpc-node/node-server/weavedb.config.js"
module.exports = {
  admin: EVM_PRIVATE_KEY,
  bundler: ARWEAVE_RSA_KEYS,
  rollups: {},
}
```

#### Other Parameters

- `dir` : cache dirctory, default to `/grpc-node/node-server/cache`.
- `dbname` : cache database name, cache will be stored in `dir/dbname`.
- `arweave` : arweave network configuration
- `weavedb_srcTxId` : WeaveDB contract srcTxId
- `weavedb_version` : WeaveDB contract version
- `nostr` : enable WebSocket for Nostr, this turns the node into a Nostr relay.
  - `db` : the database name for Nostr events, there can be only one DB instance to receive Nostr events.


With everything included,

```js title="/grpc-node/node-server/weavedb.config.js"
module.exports = {
  dir: "/home/xyz/cache",
  dbname: "mydb",
  admin: "privateky...",
  arweave: {
    host: "arweave.net",
    port: 443,
    protocol: "https",
  },
  weavedb_srcTxId: "Ohr4AU6jRUCLoNSTTqu3bZ8GulKZ0V8gUm-vwrRbmS4",
  weavedb_version: "0.37.2",
  bundler: {
    kty: "RSA",
	...
  },
  nostr: { db: "nostr" },
  rollups: {
    testdb: {
	  secure: true,
	  owner: "0xdef...",
	  tick: 1000 * 60 * 5,
	  contractTxId: "abcdef...",
	  rollup: true,
	  plugins: { notifications: {} },
	},
	nostr: {
	  owner: "0xdef...",
	  rollup: false,
	}
  },
}
```

#### Auto Recovery

If `contractTxId` is specified and the rollup node is re-initialized without cache, it will auto-recover the rollup DB state from Warp L1 transaction history.

### Run docker-compose

```bash
yarn run-rollup
```
### Admin Operations

Anyone can access the rollup node stats, which returns the deployed DB information.

```js
const DB = require("weavedb-node-client")
const db = new DB({ rpc: "localhost:8080", contractTxId: "testdb" })
const stats = await db.node({op: "stats"})
```

The admin EOA account can manage the rollup node and DBs from anywhere.

#### Add DB

```js
const tx = await db.admin(
  {
    op: "add_db",
    key: "testdb2",
    db: {
      app: "http://localhost:3000", // this will be shown on the explorer
      name: "Jots", // this will be shown on the explorer
      rollup: true,
      plugins: { notifications: {} },
      tick: 1000 * 60 * 5,
    },
  },
  { privateKey: admin.privateKey }
)
```
#### Deploy Warp L1 Contract

```js
const { contractTxId, srcTxId } = await db.admin(
  { op: "deploy_contract", key: "testdb2" },
  { privateKey: admin.privateKey }
)
// you will need the "contractTxId" for regular DB queries
```

#### Update DB

```js
const tx = await db.admin(
  { op: "deploy_contract", key: "testdb2" },
  { privateKey: admin.privateKey }
)
```

#### Remove DB

```js
const tx = await db.admin(
  { op: "remove_db", key: "testdb2" },
  { privateKey: admin.privateKey }
)
```


#### Query DB

You will need the L1 `contractTxId` from the deployment operation to instantiate the DB client.  
All L2 transactions will be signed with L1 `contractTxId` for L1/L2 verifiability.

```js
const DB = require("weavedb-node-client")
const db = new DB({ rpc: "localhost:8080", contractTxId })
const db_info = await db.getInfo()
```

### Plugins

We currently have only one plugin for [Jots](https://weavedb.vercel.app/docs/get-started/jots#write-db-configurations) called `notifications` which generates personal notifications from onchain Jots activities. The notification DB will be an offchain WeaveDB instance, which won't be recorded onchain. Not every data should be onchain, and offchain plugins solve the problem. WeaveDB can seamlessly run in multiple environment such as blockchain, offchain (local), browser and centralized cloud.

## Local Development Tips

### Clone Repo

```bash
git clone https://github.com/weavedb/rdk.git
```

### Explorer

If you are running the rollup node on `localhost:8080`, you can view blocks and transactions on our public [WeaveDB Scan](https://scan.weavedb.dev/node/localhost).

However, the public explorer may not be up-to-date. To run the latest explorer, go to `explorer` folder.

```bash
cd rdk/explorer
yarn
yarn dev
```

Now the explorer is running locally at [localhost:3000/node/localhost](http://localhost:3000/node/localhost).

### Run Envoy Separately

You run Envoy separately on your computer, and run the bare rollup file `index.js` without Docker. This way, you don't have to restart docker-compose every time you make changes in development.

```bash
yarn envoy
```

Then you can run the rollup server without Docker.


```bash
cd rdk/node/node-server
yarn
node index.js
```

### Arweave Local Testnet

To test rollup executions in your local environment, you can run [arlocal](https://github.com/textury/arlocal) (Arweave local testnet), and redirect WeaveDB SDK / Warp SDK to it.

### Integration Tests with Mocha

You don't need to run Envoy for local tests. Envoy is to access the node from web browsers. Also, stop arlocal if you are running test scripts with [mocha](https://mochajs.org/). The test scripts will start everything with a clean state.

We have `Test` helper utility, to make testing easier. Here is some boilerplate for you to start writing tests.

```javascript
const { expect } = require("chai")
const DB = require("weavedb-node-client")
const SDK = require("weavedb-sdk-node")
const { wait, Test } = require("./lib/utils")

describe("rollup node", function () {
  this.timeout(0)
  let admin, network, bundler, test

  before(async () => {
    // testing in insecure mode, never do that in production
    test = new Test({ secure: false })
    ;({ network, bundler, admin } = await test.start())
  })

  after(async () => {
    await test.stop()

    // some processes linger, so force exit for now
    process.exit()
  })

  it("should start server", async () => {
    const db = new DB({
      rpc: "localhost:9090",
      contractTxId: "testdb",
      arweave: network,
    })
    const stats = await db.node({ op: "stats" })
    expect(stats).to.eql({ dbs: [] })

    // add a DB to node
    const tx = await db.admin(
      {
        op: "add_db",
        key: "testdb",
        db: {
          app: "http://localhost:3000",
          name: "Jots",
          rollup: true,
          owner: admin.address,
        },
      },
      { privateKey: admin.privateKey },
    )
    expect(tx.success).to.eql(true)
    await wait(2000)

    // deploy L1 warp contract (via node)
    const { contractTxId, srcTxId } = await db.admin(
      { op: "deploy_contract", key: "testdb" },
      { privateKey: admin.privateKey },
    )
    expect((await db.node({ op: "stats" })).dbs[0].data.rollup).to.eql(true)
    await wait(2000)

    // check L1 warp contract info directly with SDK (not via node)
    const warp_db = new SDK({
      type: 3,
      contractTxId,
      arweave: network,
    })
    await warp_db.init()
    expect((await warp_db.getInfo()).version).to.eql("0.37.2")

    // update the DB (via node)
    const db2 = new DB({
      rpc: "localhost:9090",
      contractTxId,
    })
    const Bob = { name: "Bob" }
    const tx2 = await db2.set(Bob, "ppl", "Bob", {
      privateKey: admin.privateKey,
    })
    expect(tx2.success).to.eql(true)
    expect(await db2.get("ppl", "Bob")).to.eql(Bob)

    // check rollup
    await wait(5000)
    expect(
      (await warp_db.db.readState()).cachedValue.state.rollup.height,
    ).to.eql(1)

    // check if L1 Warp state is the same as L2 DB state
    expect(await warp_db.get("ppl", "Bob")).to.eql(Bob)
  })
})
```

Run the tests.

```bash
cd rdk/node/node-server
yarn test
```
