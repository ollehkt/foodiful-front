import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto+Condensed&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-roboto">
        <Main />
        <NextScript />
        <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="beforeInteractive" />
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  )
}
