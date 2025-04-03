local json = require("json")
local bint = require('.bint')(256)

Handlers.add(
  'Rollup',
  "Rollup",
  function(msg) 
    msg.reply({ Data = "rolled up!" })
  end
)


Handlers.add(
  'Finalize',
  "Finalize",
  function(msg) 
    Send({ Target = msg.to, Action = "Finalize", ["Block-Height"] = msg.height, TxID = msg.txid })
    msg.reply({ Data = "finalized!" })
  end
)

