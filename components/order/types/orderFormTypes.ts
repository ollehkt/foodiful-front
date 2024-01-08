export interface OrderFormType {
  deliverName: string
  deliverAddress: string
  deliverSpecificAddress: string
  deliverPhone: string
  postalCode: string
  requirement: string
  totalPrice: number
  quantity: number
}

export interface OrderPostType extends OrderFormType {
  id: string
}
