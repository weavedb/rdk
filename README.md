# WeaveDB on AO

## Deployment

You need to set up 5 components for local testing.

- WAO Server
- WeaveDB on AO
- Rollup Node
- WeaveLayer on AO
- Frontend Demo

### WAO Server (Local Arweave & AO Units)

```bash
npx wao
```

Check that the following units are running.

- Arweave : [localhost:4000](http://localhost:4000)
- MU : [localhost:4002](http://localhost:4002)
- SU : [localhost:4003](http://localhost:4003)
- CU : [localhost:4004](http://localhost:4004)

### WeaveDB Processes on AO

Clone the repo and install dependencies.

```bash
git clone https://github.com/weavedb/weavedb-ao.git
cd weavedb-ao/lua && yarn
mkdir scripts/.wallets
```
Under `scripts/.wallets`, prepare the following wallets.

- Owner ( `owner.json` | Arweave )
- Bundler ( `bundler.json` | Arweave )
- DB-Creator ( `db.json` | Arweave )
- Validator1 ( `validator1.json` | Arweave )
- Validator2 ( `validator2.json` | Arweave )
- Delegator ( `delegator.json` | Arweave )
- Rollup-Admin ( `admin.json` | EVM )
- ZK-Committer ( `committer.json` | EVM )

The zk-committer must have a positive ETH balance. Alchemy has a faucet for [Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia).

Or you can generate missing wallets.

```bash
node scripts/gen_wallets.js
```

Create `.env` in `weavedbb-ao/lua` directory and specify [alchemy](https://alchemy.com) key.

```text
ALCHEMY=XXXXXXXXXXXXXXXXXXXX
```

Deploy contracts.

```bash
node scripts/deploy_all.js
```

### WeaveDB Rollup

In another terminal, run envoy so frontend apps can access via port 8080.

```bash
cd weavedb-ao
yarn envoy
```

Now start the rollup node in another terminal.

```bash
cd weavedbb-ao/node/node-server && yarn
node index.js
```

### WeaveLayer Staking on AO

Set up staking.

```bash
node scripts/setup_staking.js
```

### Frontend Demo

In anotehr terminal, run the demo app.

```bash
cd weavedb-ao/demo && yarn
yarn dev
```

Now, the demo is runnint at [localhost:3000](http://localhost:3000).
