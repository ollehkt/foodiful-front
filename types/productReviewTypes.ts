export interface ProductReviewTypes {
  createdAt: string
  updatedAt: string
  comment: string
  userId: number
  productId: number
  id: number
  deleted: boolean
  isSecret: boolean
  rating: number
  reviewImg: string[]
}
