import { ProductReturnType } from '../../product/types/productTypes'

export interface OrderProductTypes {
  product: ProductReturnType
  quantity: number
  additionalCount: number
}
