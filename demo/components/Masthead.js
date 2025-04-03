import { Image, Flex, Box } from "@chakra-ui/react"
import { Link } from "arnext"

export default function Header({}) {
  return (
    <Flex
      align="center"
      justify="center"
      mt="60px"
      color="#3c3c43"
      fontSize={"30px"}
    >
      <Flex
        align="center"
        justify="center"
        h="100%"
        w="100%"
        sx={{
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
        p={[2, 4, 8]}
      >
        <Flex
          w="100%"
          maxW="1150px"
          wrap="wrap"
          align="center"
          my={["20px", "30px", "50px"]}
          sx={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
        >
          <Box w={["100%", null, null, ""]} flex={1}>
            <Flex align="center" justify={["center", null, null, "flex-start"]}>
              <Box fontSize={["20px", "30px", "36px"]}>
                <Box fontWeight="bold">Zero Knowledge Provable</Box>
                <Box fontWeight="bold">NoSQL Database</Box>
              </Box>
            </Flex>
            <Box
              mt={[2, null, null, 4]}
              w="100%"
              maxW="1150px"
              fontSize={["12px", "14px", "18px", "20px"]}
              sx={{
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              <Flex justify={["center", null, null, "flex-start"]}>
                <Box>
                  <Box>Hyper Extending Blockchains with zkJSON.</Box>
                  <Box mt={1}>Web3 with Web2 UX is Finally Here.</Box>
                </Box>
              </Flex>
              <Flex
                mt={6}
                mb={5}
                wrap="wrap"
                justify={["center", null, null, "flex-start"]}
              >
                <Link href="https://x.com/Mardeni01" target="_blank">
                  <Flex
                    color="white"
                    sx={{
                      bg: "#9C89F6",
                      borderRadius: "30px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                    fontSize={["14px", "16px", "18px"]}
                    w={["70px", "100px"]}
                    justify="center"
                    p={2}
                  >
                    CEO
                  </Flex>
                </Link>
                <Link href="https://x.com/0xTomo" target="_blank">
                  <Flex
                    ml={4}
                    color="white"
                    sx={{
                      bg: "#9C89F6",
                      borderRadius: "30px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                    fontSize={["14px", "16px", "18px"]}
                    w={["70px", "100px"]}
                    justify="center"
                    p={2}
                  >
                    Tech
                  </Flex>
                </Link>
                <Link
                  href="https://github.com/weavedb/weavedb-ao"
                  target="_blank"
                >
                  <Flex
                    ml={4}
                    color="white"
                    sx={{
                      bg: "#9C89F6",
                      borderRadius: "30px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                    fontSize={["14px", "16px", "18px"]}
                    w={["70px", "100px"]}
                    justify="center"
                    p={2}
                  >
                    Github
                  </Flex>
                </Link>
                <Link href="https://x.com/weave_db" target="_blank">
                  <Flex
                    ml={4}
                    color="white"
                    sx={{
                      bg: "#9C89F6",
                      borderRadius: "30px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                    fontSize={["14px", "16px", "18px"]}
                    w={["70px", "100px"]}
                    justify="center"
                    p={2}
                  >
                    X
                  </Flex>
                </Link>
              </Flex>
            </Box>
          </Box>
          <Flex
            flex={["", null, null, 1]}
            alignItems="center"
            justifyContent="center"
            py={6}
            display={["none", null, null, "flex"]}
          >
            <Flex
              p={10}
              align="center"
              justify="center"
              sx={{
                border: "15px solid #5137C5",
                borderRadius: "50%",
                ":hover": { opacity: 0.75 },
              }}
            >
              <Image
                src="/logo.svg"
                boxSize={["50px", "100px", "120px", "200px"]}
                pt="30px"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
