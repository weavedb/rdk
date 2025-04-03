local json = require("json")
local bint = require('.bint')(256)

Variant = "0.0.3"

local utils = {
  add = function(a, b)
    return tostring(bint(a) + bint(b))
  end,
  subtract = function(a, b)
    return tostring(bint(a) - bint(b))
  end,
  toBalanceValue = function(a)
    return tostring(bint(a))
  end,
  toNumber = function(a)
    return bint.tonumber(a)
  end
}

Denomination = Denomination or 12
Balances = Balances or { [ao.id] = "0" }
TotalSupply = TotalSupply or "0"
Name = 'Testnet WDB'
Ticker = 'tdbWDB'
Logo = 'sUvAzEo-s7JwDV3_JgRCo5uwjaV5koBIi5eFe0sFjCc'

payments = payments or {}

if parent ~= '<PARENT>' then parent = '<PARENT>' end
if source ~= '<SOURCE>' then source = '<SOURCE>' end

Handlers.add(
  "Credit-Notice",
  "Credit-Notice",
  function (msg)
    assert(msg.From == parent, 'Not from parent token!')
    Balances[msg.Tags.Sender] = Balances[msg.Tags.Sender] or "0"
    Balances[msg.Tags.Sender] = utils.add(Balances[msg.Tags.Sender], msg.Quantity)
  end
)

Handlers.add(
  'balance',
  "Balance",
  function(msg)
    local bal = '0'

    if (msg.Tags.Recipient) then
      if (Balances[msg.Tags.Recipient]) then
	bal = Balances[msg.Tags.Recipient]
      end
    elseif msg.Tags.Target and Balances[msg.Tags.Target] then
      bal = Balances[msg.Tags.Target]
    elseif Balances[msg.From] then
      bal = Balances[msg.From]
    end
    msg.reply({
	Balance = bal,
	Ticker = Ticker,
	Account = msg.Tags.Recipient or msg.From,
	Data = bal
    })
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
  'info',
  "Info",
  function(msg)
    msg.reply({
	["Parent-Token"] = parent,
	["Source-Token"] = source,	  
	Name = Name,
	Ticker = Ticker,
	Logo = Logo,
	Denomination = tostring(Denomination)
    })
  end
)

Handlers.add(
  'transfer',
  "Transfer",
  function(msg)
    assert(ao.env.Process.Owner == msg.From, 'Only owner can execute!'..msg.From..":"..ao.env.Process.Owner)
    assert(type(msg.Tags.Sender) == 'string', 'Sender is required!')
    assert(type(msg.Recipient) == 'string', 'Recipient is required!')
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    assert(bint.__lt(0, bint(msg.Quantity)), 'Quantity must be greater than 0')

    if not Balances[msg.Sender] then Balances[msg.Sender] = "0" end
    if not Balances[msg.Recipient] then Balances[msg.Recipient] = "0" end

    if bint(msg.Quantity) <= bint(Balances[msg.Sender]) then
      Balances[msg.Sender] = utils.subtract(Balances[msg.Sender], msg.Quantity)
      Balances[msg.Recipient] = utils.add(Balances[msg.Recipient], msg.Quantity)

      if not msg.Cast then
	local debitNotice = {
	  Action = 'Debit-Notice',
	  Recipient = msg.Recipient,
	  Quantity = msg.Quantity,
	  Data = Colors.gray ..
            "You transferred " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " to " .. Colors.green .. msg.Recipient .. Colors.reset
	}
	local creditNotice = {
	  Target = msg.Recipient,
	  Action = 'Credit-Notice',
	  Sender = msg.Sender,
	  Quantity = msg.Quantity,
	  Data = Colors.gray ..
            "You received " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " from " .. Colors.green .. msg.Sender .. Colors.reset
	}

	for tagName, tagValue in pairs(msg) do
	  if string.sub(tagName, 1, 2) == "X-" then
	    debitNotice[tagName] = tagValue
	    creditNotice[tagName] = tagValue
	  end
	end

	msg.reply(debitNotice)
	Send(creditNotice)
      end
    else
      msg.reply({
	  Action = 'Transfer-Error',
	  ['Message-Id'] = msg.Id,
	  Error = 'Insufficient Balance!'.. Balances[msg.Sender] .. ':' .. msg.Quantity
      })
    end
  end
)

Handlers.add(
  "withdraw",
  "Withdraw",
  function (msg)
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    if not Balances[msg.From] then Balances[msg.From] = "0" end
    local qty = tonumber(msg.Quantity)
    assert(type(qty) == 'number', 'qty must be number')
    
    if bint(Balances[msg.From]) >= bint(msg.Quantity) then
      Balances[msg.From] = utils.subtract(Balances[msg.From], msg.Quantity)
      ao.send({
	  Target = parent,
	  Tags = {
	    Action = "Transfer",
	    Quantity = msg.Quantity,
	    Recipient = msg.From,
	  }
      })
    end
  end
)
