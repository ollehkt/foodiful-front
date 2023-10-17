export interface CategoryType {
  title: string
  isClicked: boolean
}

export interface ProductType {
  name: string
  description: string
  price: number
  discount: number
  descImg: string[]
  categories: CategoryType[] | string[]
  deliver: boolean
}

export interface ProductReturnType extends ProductType {
  id: number
}
