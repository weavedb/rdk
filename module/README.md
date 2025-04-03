# WeaveDB Lite

WeaveDB Lite is a lightweight AO wasm module, which can run in mainy environments.

```bash
yarn add weavedb-lite
```
## API

The basic query types are the same as [the 1st gen WeaveDB](https://weavedb.vercel.app/docs/sdk/queries). Currently, there is no authentication mechanism implemented since it's expected to be used internally in AO processes or locally in NodeJs scripts.

### AO Process

Coming soon...

### Browser

Coming soon...

### NodeJS

Let's create `db.js`.

```js
import DB from "weavedb-lite"
import assert from "assert"

const main = async ()=>{
  const db = await new DB().init()
  const { id } = await db.add({ name: "Bob" }, "ppl")
  await db.update({ age: 20 }, "ppl", id)
  await db.set({ name: "Alice" }, "ppl", "Alice")
  await db.upsert({ name: "Mike", age: 30 }, "ppl", "Mike")
  await db.delete("ppl", "Alice")
  
  assert.deepEqual(
    await db.get("ppl"), 
	[{ name: "Bob", age: 20 },{ name: "Mike", age: 30 }]
  )
  
  await db.get("ppl", 1) // limit
  await db.get("ppl", ["age", "desc"]) // sort by age in descending order
  await db.get("ppl", ["age"], ["age", "==", 30]) // return ppl with age == 30
  await db.get("ppl", ["age"], ["startAfter", 20]) // return ppl with age > 20
  
  const doc = await db.cget("ppl", ["age"], 1) // get cursor
  const doc2 = await db.cget("ppl", ["age"], ["startAfter", doc], 1) // paginate
}

main()
```
It's still experimental and `--experimental-wasm-memory64` flag is necessary to run node scripts.

```bash
node --experimental-wasm-memory64 db.js
```
#### Persistency

By default, WeaveDB Lite runs in memory, but you can make it persistent by specifying a `cache` file to store data.

```js
const db = await new DB({ cache: ".cache" }).init()
```
You can reset the cache by setting `reset` true.

```js
const db = await new DB({ cache: ".cache", reset: true }).init()
```
