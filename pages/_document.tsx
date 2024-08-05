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
        <meta
          name="google-site-verification"
          content="YT3qpGDBggwidVw7Qwpg2udlItGiwy9uU4rDibNySK4"
        />
        <meta name="Keywords" content="한식 디저트" />
        <meta name="description" content={'한식 디저트의 모든 것, 푸디풀'} />
        <meta property="og:title" content={'푸디풀 FOODIFUL'} />
        <meta name="og:description" content={'한식 디저트의 모든 것, 푸디풀'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={'https://www.foodiful.shop'} />
        <meta property="og:image" content={'https://www.foodiful.shop/foodiful.jpeg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="foodiful.shop" />
        <meta property="twitter:url" content="https://www.foodiful.shop" />
        <meta name="twitter:title" content="푸디풀 FOODIFUL" />
        <meta name="twitter:description" content="한식 디저트의 모든 것, 푸디풀" />
        <meta name="twitter:image" content="https://www.foodiful.shop/foodiful.jpeg" />
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
