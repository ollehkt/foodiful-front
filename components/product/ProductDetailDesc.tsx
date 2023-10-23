import dynamic from 'next/dynamic'
import React from 'react'
const DynamicViewer = dynamic(() => import('../common/editor/ToastViewer'), {
  ssr: false,
})
const ProductDetailDesc = ({ description }: { description: string }) => {
  return <DynamicViewer content={description} />
}

export default ProductDetailDesc
