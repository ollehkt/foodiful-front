export interface LectureType {
  name: string
  price: number
  discount: number
  subTitle: string
  description: string
  lectureDuration: number
  descImg: string[]
  id: number
  regular: boolean
  isLiked?: boolean
}
