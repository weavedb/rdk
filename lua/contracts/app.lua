local json = require("json")

Handlers.add(
  "Fetch",
  "Fetch",
  function(msg)
    --local result = Send({ Target = msg.DB, Action = "Get", Query = json.encode({ "ppl", "bob" }) }).Data
    msg.reply({ Data = result })
  end
)
