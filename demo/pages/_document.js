import { Html, Main, NextScript } from "next/document"
import { Head } from "arnext"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>WeaveDB | Zero Knowledge Provable DB</title>
        <link rel="icon" type="image/x-icon" href="/logo.svg" />
        <link
          key="fontawesome"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
