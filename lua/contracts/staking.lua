local json = require("json")
local bint = require('.bint')(256)

if aoETH ~= '<TOKEN>' then aoETH = '<TOKEN>' end
if dbToken ~= '<DB>' then dbToken = '<DB>' end
local ten16 = "10000000000000000"
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

invalids = invalids or {}
nodes = nodes or {}
count = count or 0
dbs = dbs or {}
profits = profits or {}
Balances = Balances or { [ao.id] = "0" }
Withdraws = Withdraws or { [ao.id] = "0" }
RewardWithdraws = RewardWithdraws or { [ao.id] = "0" }
minETH = "1000000000000000000"
rewards = rewards or nil
TotalStake = TotalStake or "0"
TotalDeposit = TotalDeposit or "0"
TotalReward = TotalReward or "0"

function isValidAddr(address)
  return string.match(address, "^[A-Za-z0-9_-]+$") ~= nil and #address == 43
end


Handlers.add(
  "Add-DB",
  "Add-DB",
  function (msg)
    assert(type(msg.Node) == 'string' and nodes[msg.Node] ~= nil, 'Valid Node is required!')
    assert(type(msg.Allocations) == 'string', 'Allocations is required!')
    assert(nodes[msg.Node].admin == msg.From, 'Only node admin can execute!')
    assert(type(msg.DB) == 'string' and isValidAddr(msg.DB), 'Valid DB is required!')
    assert(bint.__lt(0, bint(msg.Price)), 'Price must be greater than 0')
    assert(bint.__lt(0, bint(msg.Validators)), 'Validators must be greater than 0')
    assert(bint.__lt(0, bint(msg["Min-Stake"])), 'Min-Stake must be greater than 0')
    assert(nodes[msg.Node].dbs[msg.DB] == nil, 'DB already exists!')
    nodes[msg.Node].dbs[msg.DB] = { process = msg.DB }
    local allocations = json.decode(msg.Allocations)
    for k, v in pairs(allocations) do
      assert(bint.__lt(0, bint(v)), 'alloc must be greater than 0')
      if k ~= "infra" and k ~= "validators" and k ~= "protocol" and not isValidAddr(k) then
	assert(false, 'invalid allocation address')
      end
    end
    dbs[msg.DB] = {
      delegates = {},
      stakes = {},
      price = msg.Price,
      stake = "0",
      deposit = "0",
      allocations = allocations,
      db = msg.DB,
      txs = 0,
      node = msg.Node,
      height = 0,
      profit = "0",
      min = msg["Min-Stake"],
      blocks = {},
      validators = tonumber(msg.Validators)
    }
    msg.reply({ Data = "db added!" })
  end
)

Handlers.add(
  "Get-Nodes",
  "Get-Nodes",
  function (msg)
    Send({ Target = msg.From, Data = json.encode(nodes) })
  end
)

Handlers.add(
  "Get-Node",
  "Get-Node",
  function (msg)
    assert(type(msg["Node"]) == 'string' and nodes[msg["Node"]] ~= nil, 'Valid Node is required!')
    Send({ Target = msg.From, Data = json.encode(nodes[msg.Node] or nil) })
  end
)

Handlers.add(
  "Get-DB",
  "Get-DB",
  function (msg)
    assert(type(msg["DB"]) == 'string' and dbs[msg["DB"]] ~= nil, 'Valid DB is required!')
    Send({ Target = msg.From, Data = json.encode(dbs[msg.DB]) })
  end
)

Handlers.add(
  "Get-DBs",
  "Get-DBs",
  function (msg)
    Send({ Target = msg.From, Data = json.encode(dbs) })
  end
)

local getStakes = function (addr, deposit, timestamp, unstake)
  local deadline = m.add(rewards.duration, rewards.start)
  if bint.__le(bint(deadline), bint(timestamp)) then timestamp = deadline end
  local r = m.div(m.mul(rewards.pool, m.sub(timestamp, rewards.ts)), rewards.duration)
  if bint(rewards.total) > 0 then rewards.k = m.add(rewards.k, m.div(r, m.div(rewards.total, ten16))) end
  rewards.stakes[addr] = rewards.stakes[addr] or { amount = 0, k = rewards.k, bal = 0 }
  rewards.ts = timestamp
  local amount = "0"
  if unstake then
    amount = deposit
  else
    amount = rewards.stakes[addr].amount
  end
  local reward = m.mul(
    m.div(amount, ten16),
    m.sub(rewards.k, rewards.stakes[addr].k)
  )
  rewards.stakes[addr].bal = m.add(rewards.stakes[addr].bal, reward)
  rewards.stakes[addr].k = rewards.k
end

local getStakes2 = function (addr, timestamp, unstake)
  local deadline = m.add(rewards.duration, rewards.start)
  if bint.__le(bint(deadline), bint(timestamp)) then timestamp = deadline end
  local r = m.div(m.mul(rewards.pool, m.sub(timestamp, rewards.ts)), rewards.duration)
  local k = rewards.k
  if bint(rewards.total) > 0 then k = m.add(rewards.k, m.div(r, m.div(rewards.total, ten16))) end
  local amount = "0"
  local k2 = k
  local bal = "0"
  if rewards.stakes[addr] ~= nil then
    amount = rewards.stakes[addr].amount
    k2 = rewards.stakes[addr].k
    bal = rewards.stakes[addr].bal
  end

  local reward = m.mul( m.div(amount, ten16), m.sub(k, k2))
  return m.add(bal, reward)
end

local stake = function(addr, deposit, timestamp)
  getStakes(addr, deposit, timestamp)
  rewards.stakes[addr].amount = m.add(rewards.stakes[addr].amount, deposit)
  rewards.total = m.add(rewards.total, deposit)
end

local unstake = function(addr, deposit, timestamp)
  getStakes(addr, deposit, timestamp, true)
  rewards.stakes[addr].amount = m.sub(rewards.stakes[addr].amount, deposit)
  rewards.total = m.sub(rewards.total, deposit)
end

local getReward = function(addr, timestamp)
  getStakes(addr, nil, timestamp)
  return rewards.stakes[addr].bal
end


Handlers.add(
  "Stake",
  "Credit-Notice",
  function (msg)
    local qty = m.mul(m.div(msg.Quantity, ten16), ten16)
    if msg.From == aoETH then
      if msg["X-Action"] == "Add-Node" then
	assert(type(msg["X-URL"]) == 'string', 'X-URL is required!')
	assert(bint.__le(bint(minETH), bint(qty)), 'Deposit not enough!')
	count = count + 1
	nodes[tostring(count)] = { url = msg["X-URL"], admin = msg.Sender, deposit = qty, dbs = {} }
	TotalStake = m.add(TotalStake, qty)
	msg.reply({ Data = "node added!" })
      else
	assert(type(msg["X-DB"]) == 'string' and dbs[msg["X-DB"]] ~= nil, 'Valid DB is required!')
	local db = dbs[msg["X-DB"]]
	if msg["X-Action"] == "Delegate" then
	  local to = msg["X-Delegate-To"]
	  assert(type(to) == 'string' and db.delegates[to] ~= nil, 'Valid Delegate-To is required!')
	  db.delegates[to][msg.Sender] = db.delegates[to][msg.Sender] or "0"
	  db.delegates[to][msg.Sender] = m.add(db.delegates[to][msg.Sender], qty)
	  stake(msg.Sender, qty, msg.Timestamp)
	else
	  db.stakes[msg.Sender] = db.stakes[msg.Sender] or "0"
	  db.delegates[msg.Sender] = db.delegates[msg.Sender] or {}
	  db.stakes[msg.Sender] = m.add(db.stakes[msg.Sender], qty)
	  stake(msg.Sender, qty, msg.Timestamp)
	end
	db.stake = m.add(db.stake, qty)
	TotalStake = m.add(TotalStake, qty)
	msg.reply({ Data = "staked!" })
      end
    elseif msg.From == dbToken then
      if msg["X-Action"] == "Set-Reward" then
	assert(msg.Sender == ao.env.Process.Owner, "only process owner can execute!")
	assert(rewards == nil, 'Rewards have already been set!')
	assert(bint.__lt(0, bint(msg["X-Duration"])), 'Duration must be greater than 0')
	rewards = {
	  pool = msg.Quantity,
	  ts = msg.Timestamp,
	  start = msg.Timestamp,
	  duration = msg["X-Duration"],
	  k = "0",
	  total = "0",
	  stakes = {}
	}
	msg.reply({ Data = "reward set!" })
      elseif type(msg["X-DB"]) == 'string' and dbs[msg["X-DB"]] ~= nil then
	local db = dbs[msg["X-DB"]]
	db.deposit = m.add(db.deposit, msg.Quantity)
	TotalDeposit = m.add(TotalDeposit, msg.Quantity)
	msg.reply({ Data = "depositted!" })
      else
	TotalReward = m.add(TotalReward, msg.Quantity)
	msg.reply({ Data = "protocol depositted!" })
      end
    end
  end
)

Handlers.add(
  "Withdraw",
  "Withdraw",
  function (msg)
    assert(type(msg["DB"]) == 'string' and dbs[msg["DB"]] ~= nil, 'Valid DB is required!')
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    local qty = m.mul(m.div(msg.Quantity, ten16), ten16)
    local db = dbs[msg["DB"]]
    local staked = "0"
    if type(msg["Delegate-To"]) == "string" then
      assert(isValidAddr(msg["Delegate-To"]), "Invalid Delegate-To address!")
      staked = db.delegates[msg["Delegate-To"]][msg.From] or "0"
      assert(bint.__le(bint(qty), bint(staked)), "Staked amount is not enough!")
      db.delegates[msg["Delegate-To"]][msg.From] = m.sub(staked, qty)
    else
      staked = db.stakes[msg.From] or "0"
      assert(bint.__le(bint(qty), bint(staked)), "Staked amount is not enough!")
      db.stakes[msg.From] = m.sub(staked, qty)
    end
    unstake(msg.From, qty, msg.Timestamp)
    Send({
	Target = aoETH,
	Action = "Transfer",
	Recipient = msg.From,
	Quantity = qty
    })
    TotalStake = m.sub(TotalStake, qty)
    db.stake = m.sub(db.stake, qty)
    msg.reply({ Data = "withdrew!" })
  end
)

Handlers.add(
  "Withdraw-DB",
  "Withdraw-DB",
  function (msg)
    local bal = Balances[msg.From] or "0"
    RewardWithdraws[msg.From] = RewardWithdraws[msg.From] or "0"
    RewardWithdraws[msg.From] = m.add(RewardWithdraws[msg.From], bal)
    Balances[msg.From] = "0"

    if rewards.stakes[msg.From] ~= nil then
      local r = getReward(msg.From, msg.Timestamp)
      bal = m.add(bal, r)
      Withdraws[msg.From] = Withdraws[msg.From] or "0"
      Withdraws[msg.From] = m.add(Withdraws[msg.From], r)
      rewards.stakes[msg.From].bal = "0"
    end
    assert(bint.__lt(0, bint(bal)), "Balance is zero!")
    Send({
	Target = dbToken,
	Action = "Transfer",
	Recipient = msg.From,
	Quantity = bal
    })
    msg.reply({ Data = "withdrew!" })
  end
)

Handlers.add(
  'info',
  "Info",
  function(msg)
    msg.reply(
      {
	Data = json.encode({
	    NodeCount = tostring(count),
	    MinETH = minETH,
	    TotalStake = TotalStake,
	    TotalDeposit = TotalDeposit,
	    TotalReward = TotalReward,
	    Rewards = rewards or nil
	})
    })
  end
)

Handlers.add(
  "Rollup",
  "Rollup",
  function (msg)
    local db = dbs[msg.From]
    assert(db ~= nil, 'DB does not exist!')
    assert(type(msg.TxID) == "string" and isValidAddr(msg.TxID), 'TxID is required!')
    assert(bint.__lt(0, bint(msg.Block)), 'Block is required!')
    assert(bint.__lt(0, bint(msg.Txs)), 'Txs is required!')
    local info = nodes[db.node].dbs[db.db]
    local price = m.mul(msg.Txs, db.price)
    assert(bint.__le(bint(price), bint(db.deposit)), 'Deposit is not enough!')
    local block = db.blocks[msg.Block]
    assert(block ==  nil, 'Block already exists!')
    db.deposit = m.sub(db.deposit, price)
    db.blocks[msg.Block] = {
      txid = msg.TxID,
      txs = msg.Txs,
      validators = {},
      validated_count = 0,
      finalized = false
    }
    msg.reply({ Data = "rolled up!" })
  end
)

Handlers.add(
  "Validate",
  "Validate",
  function (msg)
    assert(type(msg.DB) == "string", 'DB is required!')
    local db = dbs[msg.DB]
    assert(db ~= nil, 'DB does not exist!')
    assert(tonumber(msg.Block) - 1 == db.height, 'Current Block is required!')
    local block = db.blocks[msg.Block]
    assert(block ~=  nil, 'Block does not exist!')
    assert(block.finalized ==  false, 'Block has been finalized!')
    assert(type(msg["TxID"]) == "string" and block.txid == msg["TxID"],  'Valid TxID is required!')
    local info = nodes[db.node].dbs[db.db]
    assert(bint.__le(bint(db.min), bint(db.stakes[msg.From])), 'Min Stake is required!')
    assert(block.validators[msg.From] == nil, 'Already validated!')
    block.validators[msg.From] = true
    block.validated_count = block.validated_count + 1
    if block.validated_count == db.validators then
      local price = m.mul(block.txs, db.price)
      db.txs = db.txs + tonumber(block.txs)
      block.finalized = true
      db.height = db.height + 1
      db.profit = m.add(db.profit, price)
      local total_alloc = "0"
      for k, v in pairs(db.allocations) do
	total_alloc = m.add(total_alloc, v)
      end
      local total = price
      local validator_total = "0"
      local reward_base = "0"
      for k, v in pairs(db.allocations) do
	local amount = m.div(m.mul(price, v), total_alloc)
	if k == "protocol" then
	  total = m.sub(total, amount)
	  Balances[ao.id] = Balances[ao.id] or "0"
	  Balances[ao.id] = m.add(Balances[ao.id], amount)
	elseif k == "validators" then
	  reward_base = amount
	elseif k ~= "infra" then
	  total = m.sub(total, amount)
	  Balances[k] = Balances[k] or "0"
	  Balances[k] = m.add(Balances[k], amount)
	end
	end
      for k, v in pairs(block.validators) do
	validator_total = m.add(validator_total, db.stakes[k])
	for k2, v2 in pairs(db.delegates[k]) do
	  validator_total = m.add(validator_total, v2)
	end
      end
      local admin = nodes[db.node].admin
      Balances[admin] = Balances[admin] or "0"
      for k, v in pairs(block.validators) do
	Balances[k] = Balances[k] or "0"
	local v_reward = m.div(m.mul(reward_base, db.stakes[k]), validator_total)
	Balances[k] = m.add(Balances[k], v_reward)
	total = m.sub(total, v_reward)
	for k2, v2 in pairs(db.delegates[k]) do
	  Balances[k2] = Balances[k2] or "0"
	  local v_reward = m.div(m.mul(reward_base, v2), validator_total)
	  Balances[k2] = m.add(Balances[k2], v_reward)
	  total = m.sub(total, v_reward)
	end
      end
	Balances[admin] = m.add(Balances[admin], total)
	msg.reply({ Data = "finalized!" })
	Send({ Target = msg.DB, Action = "Finalize", ["Block-Height"] = msg.Block, TxID = block.txid })
    end
    msg.reply({	Data = "validated!" })
  end
)


function getBalance(addr,ts)
  local bal = '0'
  local yield = '0'
  if (Balances[addr]) then bal = Balances[addr] end
  if (rewards.stakes[addr]) then yield = getStakes2(addr, ts) end
  local obj = {
    Yield = yield,
    Balance = bal,
    Total = m.add(bal, yield),
    Ticker = Ticker,
    Account = addr,
    Timestamp = ts
  }
  return obj
end


Handlers.add(
  'balance',
  "Balance",
  function(msg)
    local addr = msg.Tags.Recipient or msg.Tags.Target or msg.From
    local timestamp = msg.TS or msg.Timestamp
    local obj = getBalance(addr, timestamp)
    msg.reply({	Tags = obj, Data = json.encode(obj) })
  end
)

Handlers.add(
  'balances',
  "Balances",
  function(msg) 
    msg.reply({ Data = json.encode(Balances) })
  end
)

Handlers.add(
  'Get-Stats',
  "Get-Stats",
  function(msg)
    local addr = msg.Address or msg.From
    assert(isValidAddr(addr), "Invalid address!")
    local timestamp = msg.TS or msg.Timestamp
    local bal = getBalance(addr, timestamp)
    local stake = 0
    local delegated = 0
    local stakes = {}
    
    for k, v in pairs(dbs) do
      for k2, v2 in pairs(v.stakes) do
	if k2 == addr then
	  stake = m.add(stake, v2)
	  stakes[k] = stakes[k] or { stake = "0", delegated = "0" }
	  stakes[k].stake = m.add(stakes[k].stake, v2)
	end
      end
      for k2, v2 in pairs(v.delegates) do
	for k3, v3 in pairs(v2) do
	  if k3 == addr then
	    stakes[k] = stakes[k] or { stake = "0", delegated = "0" }
	    stake = m.add(stake, v3)
	    stakes[k].stake = m.add(stakes[k].stake, v3)
	  end
	  if k2 == addr then
	    stakes[k] = stakes[k] or { stake = "0", delegated = "0" }
	    delegated = m.add(delegated, v3)
	    stakes[k].delegated = m.add(stakes[k].delegated, v3)
	  end
	end
      end
    end
    
    local stats = {
      yield = bal.Yield,
      withdraw = Withdraws[msg["Address"]] or "0",
      reward_withdraw = RewardWithdraws[msg["Address"]] or "0",
      reward = bal.Balance,
      stake = stake,
      stakes = stakes,
      delegated = delegated,
      timestamp = timestamp
    }
    msg.reply({ Data = json.encode(stats) })
  end
)
