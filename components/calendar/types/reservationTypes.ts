export interface ReservationTypes {
  id: number
  reserveDate: string[]
  regular: boolean
}

export interface PostReservationType {
  classId: number
  reserveDate: string
}

export interface updateReservartionType extends PostReservationType {
  reservationId: number
}
