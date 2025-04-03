import { startAuthentication, startRegistration } from "@simplewebauthn/browser"
import { map } from "ramda"
import forge from "node-forge"
import Arweave from "arweave"
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
} from "@simplewebauthn/server"
import { Image, Flex, Box } from "@chakra-ui/react"
import { Link } from "arnext"
import { useEffect, useState } from "react"
const { AO } = require("aonote")
import { opt } from "@/lib/utils"
import lf from "localforage"

function to64(x) {
  let modulus = Buffer.from(x.toByteArray())
  if (modulus[0] === 0) modulus = modulus.slice(1)
  return modulus
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function generateDeterministicRSAKey(entropy) {
  const rng = forge.random.createInstance()
  rng.seedFileSync = () => entropy.toString("hex")
  const rsaKeyPair = forge.pki.rsa.generateKeyPair({
    bits: 4096,
    e: 0x10001,
    prng: rng,
  })
  const { publicKey, privateKey } = rsaKeyPair
  const { n } = publicKey
  const { d, p, q, dP, dQ, qInv } = privateKey
  const jwk = {
    kty: "RSA",
    e: "AQAB",
    n: to64(n),
    d: to64(d),
    p: to64(p),
    q: to64(q),
    dp: to64(dP),
    dq: to64(dQ),
    qi: to64(qInv),
  }
  return jwk
}

async function deriveEntropyForRSA(prfKey) {
  const hkdfKeyMaterial = await crypto.subtle.importKey(
    "raw",
    prfKey,
    "HKDF",
    false,
    ["deriveBits"],
  )

  const derivedEntropy = await crypto.subtle.deriveBits(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(32),
      info: new Uint8Array(0),
    },
    hkdfKeyMaterial,
    4096,
  )
  return new Uint8Array(derivedEntropy)
}

export default function Header({
  isWallet,
  setIsWallet,
  addr,
  toast,
  setBalance,
  setDeposit,
  setIsDashboard,
  isDashboard,
  setAddr,
  jwk,
  setJwk,
}) {
  const [connecting, setConnecting] = useState(false)
  const [wallet, setWallet] = useState(null)
  useEffect(() => {
    if (typeof arweaveWallet === "undefined") {
      ;(async () => {
        const wallet = (await lf.getItem("wallet")) ?? null
        setWallet(wallet)
      })()
    }
  }, [])
  const page = isDashboard ? "Dashboard" : isWallet ? "Wallet" : "Demo"
  return (
    <Flex
      h="60px"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        borderBottom: "1px solid #9c89f6",
      }}
      w="100%"
      align="center"
      p={4}
      justify="center"
      bg="white"
    >
      <Flex w="100%" maxW="1360px">
        <Flex align="center" color="#5137C5" fontWeight="bold">
          <Image mr={2} src="/logo.svg" boxSize="25px" />
          <Box display={["none", null, "flex"]} alignItems="center">
            {isDashboard
              ? "Dashboard"
              : isWallet
                ? "WeaveWallet"
                : "WeaveDB Demos"}
          </Box>
        </Flex>
        <Box flex={1} />
        {!addr ? null : (
          <Flex align="center" fontSize={["12px", "14px"]} mr={4}>
            {map(v => {
              return (
                <Box
                  sx={{
                    color: v.name === page ? "#5137C5" : "#222",
                    cursor: "pointer",
                    ":hover": { opacity: 0.75 },
                    textDecoration: v.name === page ? "underline" : "",
                  }}
                  mx={[2, 3, 4]}
                  onClick={() => {
                    if (v.name === "Dashboard") {
                      setIsWallet(false)
                      setIsDashboard(true)
                    } else if (v.name === "Wallet") {
                      setIsWallet(true)
                      setIsDashboard(false)
                    } else {
                      setIsWallet(false)
                      setIsDashboard(false)
                    }
                  }}
                >
                  {v.name}
                </Box>
              )
            })([{ name: "Demo" }, { name: "Dashboard" }, { name: "Wallet" }])}
          </Flex>
        )}
        <Flex
          h="40px"
          justify="center"
          w={["100px", "130px", null, "150px"]}
          align="center"
          bg={"#5137C5"}
          color="white"
          fontSize={["12px", "14px", null, "16px"]}
          py={1}
          px={3}
          sx={{
            borderRadius: "5px",
            ":hover": { opacity: 0.75 },
            cursor: "pointer",
          }}
          onClick={async () => {
            if (!connecting) {
              let err = null
              if (addr) {
                if (confirm("Disconnect your wallet?")) {
                  setIsWallet(false)
                  setIsDashboard(false)
                  setAddr(null)
                  setJwk(null)
                }
              } else {
                setConnecting(true)
                try {
                  let __addr
                  if (typeof arweaveWallet === "undefined") {
                    const arweave = Arweave.init()
                    const createName = "WeaveDB"
                    const rpID = location.host.split(":")[0]
                    const rpName = "Weave Wallet"
                    const first = new Uint8Array(new Array(32).fill(1)).buffer
                    const user = { id: "weavedb", username: "weave_db" }

                    if (wallet) {
                      const dec = new TextDecoder()
                      const opt = await generateAuthenticationOptions({
                        rpID,
                        rpName,
                        allowCredentials: [
                          { id: wallet.id, transport: wallet.transport },
                        ],
                        extensions: {
                          largeBlob: { read: true },
                          prf: { support: "preferred", eval: { first } },
                        },
                      })
                      let res = null
                      try {
                        res = await startAuthentication({ optionsJSON: opt })
                      } catch (e) {
                        res = await startAuthentication({ optionsJSON: opt })
                      }
                      if (res.clientExtensionResults.prf?.results?.first) {
                        const key = new Uint8Array(
                          res.clientExtensionResults.prf.results.first,
                        )
                        const rsaEntropy = await deriveEntropyForRSA(key)
                        const jwk = generateDeterministicRSAKey(rsaEntropy)
                        const addr2 = await arweave.wallets.jwkToAddress(jwk)
                        setJwk(jwk)
                        setWallet(wallet)
                        setAddr(addr2)
                        __addr = addr2
                      } else {
                        const jwk = JSON.parse(
                          dec.decode(res.clientExtensionResults.largeBlob.blob),
                        )
                        const addr2 = await arweave.wallets.jwkToAddress(jwk)
                        setJwk(jwk)
                        setWallet(wallet)
                        setAddr(addr2)
                        __addr = addr2
                      }
                      toast({
                        title: "Wallet Connected!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      })
                    } else {
                      let optionsJSON = await generateRegistrationOptions({
                        rpID,
                        rpName,
                        userName: user.username,
                        extensions: {
                          prf: { support: "preferred", eval: { first } },
                          largeBlob: { support: "preferred" },
                        },
                      })
                      const attResp = await startRegistration({ optionsJSON })
                      if (attResp?.clientExtensionResults?.prf?.enabled) {
                        const opt2 = await generateAuthenticationOptions({
                          rpID,
                          allowCredentials: [
                            { id: attResp.id, transport: attResp.transport },
                          ],
                          extensions: { prf: { eval: { first } } },
                        })
                        const attResp3 = await startAuthentication({
                          optionsJSON: opt2,
                        })

                        const key = new Uint8Array(
                          attResp3?.clientExtensionResults.prf.results.first,
                        )
                        const rsaEntropy = await deriveEntropyForRSA(key)
                        const jwk = generateDeterministicRSAKey(rsaEntropy)
                        const addr = await arweave.wallets.jwkToAddress(jwk)
                        __addr = addr
                        const wallet = {
                          addr,
                          id: attResp.id,
                          transport: attResp.transport,
                        }
                        setJwk(jwk)
                        setWallet(wallet)
                        setAddr(addr)
                        await lf.setItem("wallet", wallet)
                        toast({
                          title: "Wallet Created!",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        })
                      } else if (
                        attResp?.clientExtensionResults?.largeBlob?.supported
                      ) {
                        const jwk = await arweave.wallets.generate()
                        const addr = await arweave.wallets.jwkToAddress(jwk)
                        __addr = addr
                        const wallet = {
                          addr,
                          id: attResp.id,
                          transport: attResp.transport,
                        }
                        await lf.setItem("wallet", wallet)
                        const enc = new TextEncoder()
                        const opt2 = await generateAuthenticationOptions({
                          rpID,
                          allowCredentials: [
                            { id: attResp.id, transport: attResp.transport },
                          ],
                          extensions: {
                            largeBlob: {
                              write: enc.encode(JSON.stringify(jwk)),
                            },
                          },
                        })
                        const attResp3 = await startAuthentication({
                          optionsJSON: opt2,
                        })
                        if (
                          JSON.stringify(
                            attResp3.clientExtensionResults?.largeBlob?.written,
                          )
                        ) {
                          setJwk(jwk)
                          setWallet(wallet)
                          setAddr(addr)
                          toast({
                            title: "Wallet Created!",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          })
                        } else {
                          toast({
                            title: "Something Went Wrong!",
                            status: "error",
                            description: err,
                            duration: 5000,
                            isClosable: true,
                          })
                        }
                      } else {
                        toast({
                          title: "Something Went Wrong!",
                          status: "error",
                          description: "This device is not supported!",
                          duration: 5000,
                          isClosable: true,
                        })
                      }
                    }
                  } else {
                    await arweaveWallet.connect([
                      "ACCESS_ADDRESS",
                      "SIGN_TRANSACTION",
                      "ACCESS_PUBLIC_KEY",
                    ])
                    const addr = await arweaveWallet.getActiveAddress()
                    __addr = addr
                    setAddr(addr)
                    setConnecting(false)
                    toast({
                      title: "Wallet Connected!",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  }
                  try {
                    if (__addr) {
                      const ao = new AO(opt)
                      const { out } = await ao.dry({
                        pid: process.env.NEXT_PUBLIC_TDB,
                        act: "Balance",
                        tags: { Target: __addr },
                        get: "Balance",
                      })
                      setBalance({ amount: out * 1, addr })
                      const { out: out2 } = await ao.dry({
                        pid: process.env.NEXT_PUBLIC_ADMIN_CONTRACT,
                        act: "Balance",
                        tags: { Target: __addr },
                        get: true,
                      })
                      setDeposit(out2 * 1)
                    }
                  } catch (e) {
                    console.log(e)
                  }
                } catch (e) {
                  err = e.toString()
                }
                if (err) {
                  toast({
                    title: "Something Went Wrong!",
                    status: "error",
                    description: err,
                    duration: 5000,
                    isClosable: true,
                  })
                }
              }
              setConnecting(false)
            }
          }}
        >
          {connecting ? (
            <Box as="i" className="fas fa-spin fa-circle-notch" />
          ) : addr ? (
            addr.slice(0, 10)
          ) : (
            "Connect Wallet"
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
