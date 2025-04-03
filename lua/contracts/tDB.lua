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
TotalSupply = TotalSupply or utils.toBalanceValue(0)
Name = 'Testnet DB'
Ticker = 'tDB'
Logo = 'sUvAzEo-s7JwDV3_JgRCo5uwjaV5koBIi5eFe0sFjCc'

Handlers.add(
  'info',
  "Info",
  function(msg)
    if msg.reply then
      msg.reply({
	  Name = Name,
	  Ticker = Ticker,
	  Logo = Logo,
	  Denomination = tostring(Denomination)
      })
    else
      Send({Target = msg.From, 
	    Name = Name,
	    Ticker = Ticker,
	    Logo = Logo,
	    Denomination = tostring(Denomination)
      })
    end
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
    if msg.reply then
      msg.reply({
	  Balance = bal,
	  Ticker = Ticker,
	  Account = msg.Tags.Recipient or msg.From,
	  Data = bal
      })
    else
      Send({
	  Target = msg.From,
	  Balance = bal,
	  Ticker = Ticker,
	  Account = msg.Tags.Recipient or msg.From,
	  Data = bal
      })
    end
  end
)

Handlers.add(
  'balances',
  "Balances",
  function(msg) 
    if msg.reply then
      msg.reply({ Data = json.encode(Balances) })
    else 
      Send({Target = msg.From, Data = json.encode(Balances) }) 
    end
  end
)

Handlers.add(
  'transfer',
  "Transfer",
  function(msg)
    assert(type(msg.Recipient) == 'string', 'Recipient is required!')
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    assert(bint.__lt(0, bint(msg.Quantity)), 'Quantity must be greater than 0')

    if not Balances[msg.From] then Balances[msg.From] = "0" end
    if not Balances[msg.Recipient] then Balances[msg.Recipient] = "0" end

    if bint(msg.Quantity) <= bint(Balances[msg.From]) then
      Balances[msg.From] = utils.subtract(Balances[msg.From], msg.Quantity)
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
	  Sender = msg.From,
	  Quantity = msg.Quantity,
	  Data = Colors.gray ..
            "You received " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " from " .. Colors.green .. msg.From .. Colors.reset
	}

	for tagName, tagValue in pairs(msg) do
	  if string.sub(tagName, 1, 2) == "X-" then
	    debitNotice[tagName] = tagValue
	    creditNotice[tagName] = tagValue
	  end
	end

	if msg.reply then
	  msg.reply(debitNotice)
	else
	  debitNotice.Target = msg.From
	  Send(debitNotice)
	end
	Send(creditNotice)
      end
    else
      if msg.reply then
	msg.reply({
	    Action = 'Transfer-Error',
	    ['Message-Id'] = msg.Id,
	    Error = 'Insufficient Balance!'
	})
      else
	Send({
	    Target = msg.From,
	    Action = 'Transfer-Error',
	    ['Message-Id'] = msg.Id,
	    Error = 'Insufficient Balance!'
	})
      end
    end
  end
)

Handlers.add(
  'mint',
  "Mint",
  function(msg)
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    assert(bint(0) < bint(msg.Quantity), 'Quantity must be greater than zero!')
    
    if not Balances[ao.id] then Balances[ao.id] = "0" end
    if msg.From == ao.env.Process.Owner then
      Balances[msg.From] = Balances[msg.From] or "0"
      Balances[msg.From] = utils.add(Balances[msg.From], msg.Quantity)
      TotalSupply = utils.add(TotalSupply, msg.Quantity)
      if msg.reply then
	msg.reply({
	    Data = Colors.gray .. "Successfully minted " .. Colors.blue .. msg.Quantity .. Colors.reset
	})
      else
	Send({
	    Target = msg.From,
	    Data = Colors.gray .. "Successfully minted " .. Colors.blue .. msg.Quantity .. Colors.reset
	})
      end
    else
      if msg.reply then
	msg.reply({
	    Action = 'Mint-Error',
	    ['Message-Id'] = msg.Id,
	    Error = 'Only the Process Owner can mint new ' .. Ticker .. ' tokens!'
	})
      else
	Send({
	    Target = msg.From,
	    Action = 'Mint-Error',
	    ['Message-Id'] = msg.Id,
	    Error = 'Only the Process Owner can mint new ' .. Ticker .. ' tokens!'
	})
      end
    end
  end
)

Handlers.add(
  'totalSupply',
  "Total-Supply",
  function(msg)
    assert(msg.From ~= ao.id, 'Cannot call Total-Supply from the same process!')
    if msg.reply then
      msg.reply({
	  Action = 'Total-Supply',
	  Data = TotalSupply,
	  Ticker = Ticker
      })
    else
      Send({
	  Target = msg.From,
	  Action = 'Total-Supply',
	  Data = TotalSupply,
	  Ticker = Ticker
      })
    end
  end
)

Handlers.add(
  'burn',
  'Burn',
  function(msg)
    assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')
    assert(bint(msg.Tags.Quantity) <= bint(Balances[msg.From]), 'Quantity must be less than or equal to the current balance!')

    Balances[msg.From] = utils.subtract(Balances[msg.From], msg.Tags.Quantity)
    TotalSupply = utils.subtract(TotalSupply, msg.Tags.Quantity)
    if msg.reply then
      msg.reply({
	  Data = Colors.gray .. "Successfully burned " .. Colors.blue .. msg.Tags.Quantity .. Colors.reset
      })
    else
      Send({Target = msg.From,  Data = Colors.gray .. "Successfully burned " .. Colors.blue .. msg.Tags.Quantity .. Colors.reset })
    end
  end
)

