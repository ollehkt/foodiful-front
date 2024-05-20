export interface ReservationType {
  id: number
  reserveDate: string[]
  regular: boolean
}

export interface PostReservationType {
  lectureId: number
  reserveDate: string
}

export interface updateReservartionType extends PostReservationType {
  reservationId: number
}

export interface FetchReservationType extends ReservationType {
  lectureDuration: number
  lectureId: number
  lectureName: string
  lecturePrice: number
  lectureRegular: boolean
  deleted: boolean
}
