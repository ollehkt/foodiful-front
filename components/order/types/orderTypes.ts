import { OrderProductTypes } from './orderProductTypes'

export interface OrderTypes {
  id: number
  deliverAddress: string
  deliverName: string
  deliverPhone: string
  deliverSpecificAddress: string
  orderDate: string
  orderProduct: OrderProductTypes[]
  orderStatus: boolean
  quantity: number
  requirement: string
  totalPrice: number
  userId: number
}
