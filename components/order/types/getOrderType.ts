import { ProductReturnType } from '../../product/types/productTypes'

export interface GetOrderType {
  orderDate: string
  quantity: number
  userId: number
  id: string
  deliverAddress: string
  deliverName: string
  requirement: string
  totalPrice: number
  deliverPhone: string
  orderStatus: string
  deliverSpecificAddress: string
  postalCode: string
  orderProduct: OrderProductType[]
}

export interface OrderProductType {
  id: number
  orderCount: number
  orderPrice: number
  productId: number
  orderId: string
  additionalCount: number
  product: ProductReturnType
}
