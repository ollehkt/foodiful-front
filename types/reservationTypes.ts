export interface ReservationTypes {
  id: number
  reserveDate: string[]
  regular: boolean
}

export interface PostReservationType {
  classId: number
  reservedTime: string[]
  deleted: boolean
  id: number
  userId: number
}
