import { PostOrderProductTypes } from './postOrderProductTypes'

export interface OrderTypes {
  id: number
  deliverAddress: string
  deliverName: string
  deliverPhone: string
  deliverSpecificAddress: string
  orderDate: string
  orderProduct: PostOrderProductTypes[]
  orderStatus: boolean
  quantity: number
  requirement: string
  totalPrice: number
  userId: number
}
