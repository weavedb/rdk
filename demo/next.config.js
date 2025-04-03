const arnext = require("arnext/config")
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      tls: false,
      net: false,
      http2: false,
      dns: false,
    }

    return config
  },
}
module.exports = arnext(nextConfig)
