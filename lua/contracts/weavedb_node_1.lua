local json = require("json")
balances = balances or {}
payments = payments or {}

if name ~= "Testnet WDB" then name = "Testnet WDB" end

if ticker ~= "tdbWDB" then ticker = "tdbWDB" end

if denomination ~= 12 then denomination = 12 end

if parent ~= '<PARENT>' then parent = '<PARENT>' end
if source ~= '<SOURCE>' then source = '<SOURCE>' end

Handlers.add(
  "Credit-Notice",
  Handlers.utils.hasMatchingTag("Action", "Credit-Notice"),
  function (msg)
    assert(msg.From == parent, 'Not from parent token!')
    balances[msg.Tags.Sender] = balances[msg.Tags.Sender] or 0
    balances[msg.Tags.Sender] = balances[msg.Tags.Sender] + tonumber(msg.Tags.Quantity)
  end
)

Handlers.add(
  "balance",
  Handlers.utils.hasMatchingTag("Action", "Balance"),
  function (msg)
    local target = msg.Tags.Target or msg.From
    local bal = "0"
    if balances[target] then
      bal = tostring(balances[target])
    end
    ao.send({Target = msg.From, Tags = {
	       Target = target,
	       Balance = bal,
	       Ticker = ticker or ""
    }})
  end
)

Handlers.add(
  "balances",
  Handlers.utils.hasMatchingTag("Action", "Balances"),
  function (msg)
    ao.send({
	Target = msg.From,
	Data = json.encode(balances)
    })
  end

)

Handlers.add(
  "info",
  Handlers.utils.hasMatchingTag("Action", "Info"),
  function (msg)
    ao.send({Target = msg.From, Tags = {
	       ["Parent-Token"] = parent,
	       ["Source-Token"] = source,
	       Name = name,
	       Ticker = ticker,
	       Logo = logo,
	       Denomination = tostring(denomination)
    }})
  end
)

Handlers.add(
  "transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function (msg)
    assert(ao.env.Process.Owner == msg.From, 'Only owner can execute!'..msg.From..":"..ao.env.Process.Owner)
    assert(type(msg.Tags.Sender) == 'string', 'Sender is required!')
    assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
    assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

    if not balances[msg.Tags.Sender] then
      balances[msg.Tags.Sender] = 0
    end

    if not balances[msg.Tags.Recipient] then
      balances[msg.Tags.Recipient] = 0
    end

    local qty = tonumber(msg.Tags.Quantity)
    assert(type(qty) == 'number', 'qty must be number')
    
    if balances[msg.Tags.Sender] >= qty then
      balances[msg.Tags.Sender] = balances[msg.Tags.Sender] - qty
      balances[msg.Tags.Recipient] = balances[msg.Tags.Recipient] + qty
      ao.send({
	  Target = msg.Tags.Sender,
	  Tags = {
	    Action = "Debit-Notice",
	    Quantity = tostring(qty),
	    Recipient = msg.Tags.Recipient,
	    ["Parent-Token"] = parent,
	    ["Source-Token"] = source,
	    ["X-Note"] = msg.Tags.Note
	  }
      })
      ao.send({
	  Target = msg.Tags.Recipient,
	  Tags = {
	    Action = "Credit-Notice",
	    Quantity = tostring(qty),
	    Sender = msg.Tags.Sender,
	    ["Parent-Token"] = parent,
	    ["Source-Token"] = source,
	    ["X-Note"] = msg.Tags.Note
      }})

    end
  end
)

Handlers.add(
  "withdraw",
  Handlers.utils.hasMatchingTag("Action", "Withdraw"),
  function (msg)
    assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')
    if not balances[msg.From] then balances[msg.From] = 0 end
    local qty = tonumber(msg.Tags.Quantity)
    assert(type(qty) == 'number', 'qty must be number')
    
    if balances[msg.From] >= qty then
      balances[msg.From] = balances[msg.From] - qty
      ao.send({
	  Target = parent,
	  Tags = {
	    Action = "Transfer",
	    Quantity = tostring(qty),
	    Recipient = msg.From,
	  }
      })
    end
  end
)
