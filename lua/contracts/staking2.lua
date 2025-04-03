local json = require("json")
local bint = require('.bint')(256)

local m = {
  add = function(a, b)
    return tostring(bint(a) + bint(b))
  end,
  sub = function(a, b)
    return tostring(bint(a) - bint(b))
  end,
  mul = function(a, b)
    return tostring(bint(a) * bint(b))
  end,
  div = function(a, b)
    return tostring(math.floor(bint(a) / bint(b)))
  end,
  toBalanceValue = function(a)
    return tostring(bint(a))
  end,
  toNumber = function(a)
    return bint.tonumber(a)
  end,
  floor = function(a)
    return tostring(math.floor(bint.tonumber(a)))
  end,
  ceil = function(a)
    return tostring(math.ceil(bint.tonumber(a)))
  end
}

local pool = nil
local stakes = {}
local total = "0"
local ts = nil
local start = nil
local k = "0"
local dur = nil

local getStakes = function (addr, deposit, timestamp, unstake)
  local deadline = m.add(dur, start)
  if bint.__le(bint(deadline), bint(timestamp)) then timestamp = deadline end
  local r = m.div(m.mul(pool, m.sub(timestamp, ts)), dur)
  if bint(total) > 0 then k = m.add(k, m.div(r, total)) end
  stakes[addr] = stakes[addr] or { amount = 0, k = k, bal = 0 }
  ts = timestamp
  local amount = "0"
  if unstake then
    amount = deposit
  else
    amount = stakes[addr].amount
  end
  local reward = m.mul(amount,  (m.sub(k, stakes[addr].k)))
  stakes[addr].bal = m.add(stakes[addr].bal, reward)
end

Handlers.add(
  'setup',
  "setup",
  function(msg)
    pool = msg.pool
    ts = msg.ts
    start = msg.ts
    dur = msg.dur
    msg.reply({	Data = "set!" })
  end
)

Handlers.add(
  'stake',
  "stake",
  function(msg)
    deposit = msg.deposit
    addr = msg.addr
    getStakes(addr, deposit, msg.ts)
    stakes[addr].amount = m.add(stakes[addr].amount, deposit)
    stakes[addr].k = k
    total = m.add(total, deposit)
    msg.reply({	Data = "staked!" })
  end
)

Handlers.add(
  'unstake',
  "unstake",
  function(msg)
    deposit = msg.deposit
    addr = msg.addr
    getStakes(addr, deposit, msg.ts, true)
    stakes[addr].amount = m.sub(stakes[addr].amount, deposit)
    total = m.sub(total, deposit)
    msg.reply({	Data = "unstaked!" })
  end
)

Handlers.add(
  'info',
  "info",
  function(msg)
    msg.reply({
	Data = json.encode({
	    stakes = stakes,
	    pool = pool,
	    total = total,
	    ts = ts,
	    k = k
	})
    })
  end
)

Handlers.add(
  'get',
  "get",
  function(msg)
    addr = msg.addr
    getStakes(addr, nil, msg.ts)
    msg.reply({	Data = json.encode({ amount = stakes[addr].bal, addr = addr, ts = ts }) })
  end
)
