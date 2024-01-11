import { ProductReturnType } from '../../product/types/productTypes'

export interface PostOrderProductTypes {
  product: ProductReturnType
  quantity: number
  additionalCount: number
}
