export interface PostInquiryType {
  comment: string
  isSecret: boolean
  parentId: number | null
  lectureId: string
}

export interface InquiryType extends PostInquiryType {
  createdAt: string
  deleted: boolean
  id: number
  updatedAt: string
  userId: number
  recomment: RecommentType
}

export interface PostRecommentType {
  parentId: number
  comment: string
  isSecret: boolean
}

export interface RecommentType extends PostRecommentType {
  id: number
  updatedAt: string
  userId: number
}
