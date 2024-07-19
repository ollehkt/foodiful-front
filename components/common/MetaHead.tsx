import Head from 'next/head'
import React from 'react'

interface PropsType {
  title?: string
  description?: string
  url?: string
  img?: string
}

const MetaHead = ({ title, description, url, img }: PropsType) => {
  return (
    <Head>
      <title>{title || '푸디풀 FOODIFUL'}</title>
      <meta name="Keywords" content="한식 디저트" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description || '한식 디저트의 모든 것, 푸디풀'} />
      <meta property="og:title" content={title || '푸디풀 FOODIFUL'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://www.foodiful.shop'} />
      <meta property="og:image" content={img || 'https://foodiful.shop/public/foodiful.jpeg'} />
      <meta property="og:article:author" content="푸디풀 FOODIFUL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="foodiful.shop" />
      <meta property="twitter:url" content="https://www.foodiful.shop" />
      <meta name="twitter:title" content="푸디풀 FOODIFUL" />
      <meta name="twitter:description" content="한식 디저트의 모든 것, 푸디풀" />
      <meta name="twitter:image" content="https://foodiful.shop/public/foodiful.jpeg" />
    </Head>
  )
}

export default MetaHead
