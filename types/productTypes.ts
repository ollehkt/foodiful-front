export interface CategoryType {
  title: string
  isClicked: boolean
}

export interface ProductType {
  name: string
  subTitle: string
  description: string
  price: number
  discount: number
  quantity: number
  descImg: string[]
  categories: CategoryType[] | string[]
  deliver: boolean
}

export interface ProductReturnType extends ProductType {
  id: number
}

export interface PromiseProductType {
  data: ProductReturnType
  success: boolean
}
