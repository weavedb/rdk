class Connect {
  constructor({ params, op, c, setParent }) {
    this.cb = {}
    this.count = 0
    this.c = c
    this.receive = async ({ err, result, op, id }) => {
      await this.cb[id]?.(err, result)
      delete this.cb[id]
    }
    if (this.c.on) this.c.on("message", this.receive)
    if (op) this.c.send({ op: "new", params })
    if (setParent) this.c.setParent(this)
  }
  send(...params) {
    this.receive(...params)
  }
  to({ op, params = {}, cb }) {
    const id = ++this.count
    this.cb[id] = cb
    try {
      this.c.send({ op, ...params, id })
    } catch (e) {
      console.log(e)
    }
  }
  kill() {
    this.c.kill()
  }
}

class Connected {
  constructor({ funcs, parent }) {
    this.parent = parent
    this.receive = async msg => {
      const { op, id } = msg
      ;(funcs[op] ?? funcs._)({ msg, send: this.to.bind(this), op, id })
    }
    if (this.parent?.on) this.parent.on("message", this.receive)
  }
  setParent(parent) {
    this.parent = parent
  }
  to({ op, id, err, result }) {
    this.parent.send({ op, id, err, result })
  }
  send(...params) {
    this.receive(...params)
  }
  kill() {}
}

module.exports = { Connect, Connected }
