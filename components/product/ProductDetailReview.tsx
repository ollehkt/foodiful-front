import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { OrderProductTypes } from '../../types/orderProductTypes'
import { OrderTypes } from '../../types/orderTypes'

import { useUser } from '../auth/hooks/useUser'
import { User } from '../auth/types/user'
import { api } from '../axios/axiosInstance'
import PostReview from '../review/PostReview'
import ReviewList from '../review/ReviewList'
import { getStoredUser } from '../util/userStorage'

const ProductDetailReview = ({
  productName,
  productId,
}: {
  productName: string
  productId: number
}) => {
  const { getUser } = useUser()
  const [user, setUser] = useState<User>()
  const [isUserOrdered, setIsUserOrdered] = useState(false)
  const [isReviewed, setIsReviewed] = useState(false)

  useEffect(() => {
    const storedUser = getStoredUser()
    ;(async () => {
      const { data } = await api(`/product-review/${productId}`)
      const fetchedUserData = await getUser(storedUser)
      if (fetchedUserData) {
        setUser(fetchedUserData)
        const { data: userOrderList } = await api<OrderTypes[]>(`/user/order/${fetchedUserData.id}`)
        if (
          userOrderList.map((orderLists: OrderTypes) =>
            orderLists.orderProduct.map(
              (product: OrderProductTypes) => product.productId === productId
            )
          )
        )
          setIsUserOrdered(true)
      }
    })()
  }, [])

  return (
    <div className="w-full">
      <div className="my-[20px] text-3xl font-bold">후기 등록하기</div>
      {isUserOrdered && user && (
        /** 유저가 이미 쓴 리뷰가 있다면 post 안 뜨고 내가 쓴 리뷰가 위에 보이게 만들기 및 수정 가능하게끔 */
        <PostReview productName={productName} productId={productId} userId={user.id} />
      )}
      <div className="flex flex-col mt-[40px] border-main border-t-[1px]">
        <div className="mt-[10px]  text-3xl">후기 목록</div>
        <ReviewList />
      </div>
    </div>
  )
}

export default ProductDetailReview
