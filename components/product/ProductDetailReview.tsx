import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useUser } from '../auth/hooks/useUser'
import { api } from '../axios/axiosInstance'
import PostReview from '../review/PostReview'
import { getStoredUser } from '../util/userStorage'

const ProductDetailReview = ({ name }: { name: string }) => {
  const [user, setUser] = useState()
  const { getUser } = useUser()
  const [isUserOrdered, setIsUserOrdered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()
    ;(async () => {
      const fetchedUserData = await getUser(storedUser)
      console.log(fetchedUserData)
      // const {
      //   data: { data: userOrderList },
      // } = await api(`/order/${fetchedUserData.id}`)
      // console.log(userOrderList)
    })()
  }, [])
  return (
    <div className="w-full">
      <PostReview name={name} />
    </div>
  )
}

export default ProductDetailReview
