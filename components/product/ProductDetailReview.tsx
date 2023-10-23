import React from 'react'
import PostReview from '../review/PostReview'

const ProductDetailReview = ({ name }: { name: string }) => {
  return (
    <div className="w-full">
      <PostReview name={name} />
    </div>
  )
}

export default ProductDetailReview
