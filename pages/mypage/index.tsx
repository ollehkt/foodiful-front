import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { getStoredUser } from '../../components/util/userStorage'
import getMyPageLayout from '../../components/layout/getMyPageLayout'
import StrongTitle from '../../components/common/StrongTitle'
import { useRouter } from 'next/router'
import useToast from '../../components/common/hooks/useToast'
import ProductItem from '../../components/product/ProductItem'
import { useGetOrder } from '../../components/order/hooks/useOrder'
import PurchasedTitle from '../../components/purchase/PurchasedTitle'
import PurchasedOrderItem from '../../components/purchase/PurchasedOrderItem'
import { Button } from '../../components/common/Button'
import {
  useGetFavoriteLectures,
  useGetFavoriteProducts,
} from '../../components/common/favorite/hooks/useFavorite'
import { useGetReservationByUserId } from '../../components/calendar/hooks/useReservation'
import { useGetReviewByUserId } from '../../components/review/hooks/useReviews'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import ReservationList from '../../components/reserve/ReservationList'
import ReviewList from '../../components/review/ReviewList'
import LectureItem from '../../components/lecture/LectureItem'
import { useUser } from '../../components/auth/hooks/useUser'

function MyPage() {
  const [user, setUser] = useState<User | null>(null)
  const { data: myReviews } = useGetReviewByUserId(user?.id)
  const { data: myPurchasedList } = useGetOrder(user?.id)
  const { data: myFavoriteProducts } = useGetFavoriteProducts()
  const { data: myFavoriteLectures } = useGetFavoriteLectures()
  const { data: myReservations } = useGetReservationByUserId(user?.id)
  const { getUser } = useUser()
  const isMobile = useAtomValue(isMobileDisplay)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const storedUser = getStoredUser()
      if (storedUser) {
        const fetchedUser = await getUser(storedUser)
        if (fetchedUser) {
          setUser(fetchedUser)
        } else {
          setUser(null)
          router.push('/auth')
        }
      } else {
        setUser(null)
        router.push('/auth')
      }
    })()
  }, [])

  return (
    <div className="grow shadow-basic rounded-md px-5">
      <section className="border-t-2 border-t-active py-2 my-12">
        <StrongTitle title="로그인 정보" />
        <div className="my-4">
          <div className="text-main text-lg font-bold">{user?.email}</div>
          <div className="text-lg">
            <span className="text-main font-bold">{user?.name}</span> 님
          </div>
        </div>
        {isMobile && (
          <Button
            title="수정"
            onClick={() => router.push('/mypage/modify')}
            style="bg-main text-white py-1"
            size="sm"
          />
        )}
      </section>
      <section className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="좋아하는 상품" />

        {!!myFavoriteProducts.length ? (
          <>
            <div className="grid justify-center md:justify-start md:grid-cols-3 my-12 items-center">
              {myFavoriteProducts.slice(0, 4).map((product) => (
                <ProductItem key={product.id} product={product} mini={true} />
              ))}
            </div>
            {myFavoriteProducts.length > 4 && (
              <div className="flex justify-content my-2">
                <Button
                  title="전체 보기"
                  onClick={() => {
                    router.push('/mypage/favorites/product')
                  }}
                  style="mx-auto bg-main text-white"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 상품이 없습니다.
          </div>
        )}
      </section>
      <section className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="좋아하는 클래스" />

        {!!myFavoriteLectures.length ? (
          <>
            <div className="grid justify-center md:justify-start md:grid-cols-3 my-12 items-center">
              {myFavoriteLectures.slice(0, 4).map((lecture) => (
                <LectureItem key={lecture.id} lecture={lecture} mini={true} />
              ))}
            </div>
            {myFavoriteLectures.length > 4 && (
              <div className="flex justify-content my-2">
                <Button
                  title="전체 보기"
                  onClick={() => {
                    router.push('/mypage/favorites/lecture')
                  }}
                  style="mx-auto bg-main text-white"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 클래스가 없습니다.
          </div>
        )}
      </section>
      <section className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="내 후기 보기" />
        {!!myReviews.length ? (
          <>
            <ReviewList reviewList={myReviews.slice(0, 3)} mypage />
            {myReviews.length > 3 && (
              <div className="flex justify-content my-2">
                <Button
                  title="더 보기"
                  onClick={() => {
                    router.push('/mypage/reviews')
                  }}
                  style="mx-auto bg-main text-white"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            작성하신 후기가 없습니다.
          </div>
        )}
      </section>
      <section className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="주문/배송 내역" />
        {!!myPurchasedList.length ? (
          <>
            <PurchasedTitle />
            {myPurchasedList.slice(0, 5).map((purchased) => (
              <PurchasedOrderItem key={purchased.id} order={purchased} />
            ))}
            {myPurchasedList.length > 5 && (
              <div className="flex justify-content my-2">
                <Button
                  title="더 보기"
                  onClick={() => {
                    router.push('/mypage/purchased')
                  }}
                  style="mx-auto bg-main text-white"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            주문 내역이 없습니다.
          </div>
        )}
      </section>

      <section className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="예약 내역" />
        {!!myReservations.length ? (
          <>
            <ReservationList reservations={myReservations.slice(0, 5)} />
            {myReservations.length > 5 && (
              <div className="flex justify-content my-2">
                <Button
                  title="더 보기"
                  onClick={() => {
                    router.push('/mypage/reserved')
                  }}
                  style="mx-auto bg-main text-white"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            예약 내역이 없습니다.
          </div>
        )}
      </section>
    </div>
  )
}

MyPage.getLayout = getMyPageLayout

export default MyPage
