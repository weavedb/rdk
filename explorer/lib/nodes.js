const API_URL =
  "https://lcb7ocx1z4.execute-api.ap-southeast-1.amazonaws.com/dev/nodes"
const DOMAIN_URL = "raas.weavedb-node.xyz"
const PORT_NUM = "443"
const DEFAULT_NODES = [
  {
    endpoint: "rollup-testnet.weavedb.xyz:443",
    network: "Private Alpha",
    key: "alpha",
  },
  { endpoint: "localhost:8080", network: "Localhost", key: "localhost" },
]

async function fetchNodes() {
  try {
    const response = await fetch(API_URL)
    const userNodes = await response.json()
    console.log("userNodes", userNodes)
    const formattedNodes = [
      ...DEFAULT_NODES,
      ...userNodes.map((node) => ({
        key: node.rollupId,
        endpoint: `${node.rollupId}.${DOMAIN_URL}:${PORT_NUM}`,
        network: node.OrgId,
      })),
    ]
    return formattedNodes
  } catch (error) {
    console.error("Failed to fetch nodes:", error)
    return DEFAULT_NODES
  }
}

const nodes = await fetchNodes()
console.log("nodes", nodes)

export { nodes }
