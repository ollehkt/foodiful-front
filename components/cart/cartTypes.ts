import { ProductReturnType } from '../product/types/productTypes'

export interface CartType {
  productId: number
  quantity: number
  additionalCount: number
}

export interface CartReturnType extends CartType {
  id: number
  product: ProductReturnType
}
