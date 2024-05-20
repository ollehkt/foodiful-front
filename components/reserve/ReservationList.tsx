import React from 'react'
import { FetchReservationType } from '../calendar/types/reservationType'
import ReservationItem from './ReservationItem'

interface PropsType {
  reservations: FetchReservationType[]
}

function ReservationList({ reservations }: PropsType) {
  return (
    <div className="mt-4 flex flex-col gap-y-4">
      {reservations.map(
        ({ id, deleted, ...reservation }) =>
          !deleted && <ReservationItem key={id} id={id} reservation={reservation} />
      )}
    </div>
  )
}

export default ReservationList
