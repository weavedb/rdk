const API_URL = "https://raas-api.weavedb-node.xyz/nodes"
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
    const jsonResponse = await response.json()
    console.log("jsonResponse", jsonResponse)
    const { rollups } = jsonResponse
    console.log("rollups", rollups)

    const formattedNodes = [
      ...DEFAULT_NODES,
      ...rollups.map((node) => ({
        key: node.rollupId,
        endpoint: `${node.rollupId}.${DOMAIN_URL}:${PORT_NUM}`,
        network: node.ipAddress,
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
