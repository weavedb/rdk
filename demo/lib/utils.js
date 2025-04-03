const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_verifierRU",
        type: "address",
      },
      {
        internalType: "address",
        name: "_verifierDB",
        type: "address",
      },
      {
        internalType: "address",
        name: "_committer",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "commit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_root",
        type: "uint256",
      },
    ],
    name: "commitRoot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "committer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qBool",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "cond",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qCond",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "path2",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qCustom",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qFloat",
    outputs: [
      {
        internalType: "uint256[3]",
        name: "",
        type: "uint256[3]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qInt",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qNull",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qRaw",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "txid",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "path",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "zkp",
        type: "uint256[]",
      },
    ],
    name: "qString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "roots",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifierDB",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifierRU",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

const opt =
  process.env.NEXT_PUBLIC_NODE === "localhost"
    ? {
        ar: { port: 4000 },
        aoconnect: {
          MU_URL: "http://localhost:4002",
          CU_URL: "http://localhost:4004",
          GATEWAY_URL: "http://localhost:4000",
        },
      }
    : {}

module.exports = { abi, opt }
