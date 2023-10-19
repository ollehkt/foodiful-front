export interface ClassType {
  name: string
  price: number
  discount: number
  description: string
  classDuration: number
  descImg: string[]
  id: number
  regular: boolean
}

export type ClassReturnType = {
  success: boolean
  data: ClassType[]
}
