import { User } from '../components/auth/types/user'
import { ProductReturnType } from './productTypes'

export interface PostReviewTypes {
  comment: string
  rating: number
  isSecret: boolean
  reviewImg: string[]
}

export interface ReviewTypes {
  id: number
  comment: string
  rating: number
  isSecret: boolean
  reviewImg: string[]
  createdAt: string
  updatedAt: string
  userId: number
  productId: number
  product: ProductReturnType
  user: User
}
