export interface RefundType {
  id: number
  refundAt: string
  refundReason: string
  totalPrice: number
  orderId: string
  userId: number
  products: {
    productId: number
    additionalCount: number
    descImg: string
    name: string
    count: number
  }[]
}
