import { Flex, Box } from "@chakra-ui/react"
import { map } from "ramda"

export default function About({ setTab }) {
  return (
    <Box w="100%" maxW="1150px" py={[0, 4, 8, 12]} px={[4, 6, 8]}>
      <Box
        fontWeight="bold"
        color="#ddd"
        fontSize={["12px", "14px", "16px", "20px"]}
      >
        Decentralized NoSQL Database
      </Box>
      <Box mb={4} fontWeight="bold" fontSize={["16px", "20px", "30px", "35px"]}>
        Better Developer Experience than Web2
      </Box>
      <Flex w="100%" wrap="wrap">
        {map(v => {
          return map(v2 => {
            return (
              <Box flex={1} py={4} px={[0, 4]} minW="300px">
                <Box
                  p={4}
                  color="#9C89F6"
                  sx={{ borderRadius: "5px", border: "#9C89F6 1px solid" }}
                >
                  <Box fontWeight="bold" fontSize="18px">
                    {v2.title}
                  </Box>
                  <Box mt={2} color="#ddd" fontSize="12px">
                    {v2.desc}
                  </Box>
                </Box>
              </Box>
            )
          })(v)
        })([
          [
            {
              title: "Smart Contract NoSQL Database",
              desc: "WeaveDB is an AO process, which is a decentralized smartcontract and all data are permanently stored on the Arweave blockchain.",
            },
            {
              title: "Compatible with Firestore",
              desc: "WeaveDB queries are mostly compatible with Google Firestore, but the query APIs are simpler and more powerful in JSON formats.",
            },
            {
              title: "Web2 Cloud Performance",
              desc: "WeaveDB achieves the web2-like performance and latency by being a rollup to AO. Each DB instance is an app-specific rollup.",
            },
          ],
          [
            {
              title: "No Infra Maintenance",
              desc: "Once your DB instance is deployed onchain, there is no maintenance required, which is a far better dev experience than web2 cloud services.",
            },
            {
              title: "Hyper Optimized ZKP for JSON",
              desc: "zkJSON is novel encoding and zk circuits optimized for JSON. It takes only 3 seconds to generate a zkp to prove any JSON data.",
            },
            {
              title: "Query from Other Blockchains",
              desc: "WeaveDB is an optimistic zk-rollup to other blockchains allowing queries from any chain, which hyper-extends blockchains with off-chan data.",
            },
          ],
          [
            {
              title: "Advanced DSL FPJSON",
              desc: "FPJSON is a functional programming language in JSON format, which enables advanced access control rules for permissionless DBs.",
            },
            {
              title: "Social Logins & Passkeys",
              desc: "WeaveDB allows crypto wallets using web2 social logins such as Google, Github, and Apple. It also integrates passkeys for biometric authentications.",
            },
            {
              title: "Extensive Developer Tools",
              desc: "WeaveDB comes with an extensive set of dev tools such as No Code Web Console, CLI Testing Tools, WeaveDB Scan, ArNext React Framework.",
            },
          ],
        ])}
      </Flex>
      <Flex justify="center" mt={4} fontSize={["14px", null, null, "16px"]}>
        <Flex
          onClick={() => setTab("create")}
          mx={6}
          bg="#9C89F6"
          w="250px"
          py={2}
          color="white"
          justify="center"
          sx={{
            borderRadius: "5px",
            cursor: "pointer",
            ":hover": { opacity: 0.75 },
          }}
        >
          Try Demo
        </Flex>
        <Flex
          onClick={() => setTab("usecases")}
          mx={6}
          bg="#9C89F6"
          w="250px"
          py={2}
          color="white"
          justify="center"
          sx={{
            borderRadius: "5px",
            cursor: "pointer",
            ":hover": { opacity: 0.75 },
          }}
        >
          Use Cases
        </Flex>
      </Flex>
    </Box>
  )
}
