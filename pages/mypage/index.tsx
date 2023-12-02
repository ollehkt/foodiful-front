import { ReactElement, useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { getStoredUser } from '../../components/util/userStorage'
import Layout from '../../components/layout/Layout'
import MyPageLayout from '../../components/layout/MyPageLayout'
import { getMyPageLayout } from './getMyPageLayout'
import { useUser } from '../../components/auth/hooks/useUser'
import StrongTitle from '../../components/common/StrongTitle'
import { useRouter } from 'next/router'
import useToast from '../../components/common/hooks/useToast'
import { api } from '../../components/axios/axiosInstance'
import ProductItem from '../../components/product/ProductItem'
import Link from 'next/link'
import { ProductReturnType } from '../../components/product/types/productTypes'

function MyPage() {
  const [user, setUser] = useState<User | null>()
  const [myFavoriteProducts, setMyFavoriteProducts] = useState<ProductReturnType[]>([])
  const [myComments, setMyComments] = useState([])
  const [myPurchasedProducts, setMyPurchasedProducts] = useState([])
  const [myReservations, setMyReservations] = useState([])

  const router = useRouter()
  const { fireToast } = useToast()
  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    } else {
      fireToast({
        id: '재로그인',
        type: 'failed',
        message: '다시 로그인 해주세요.',
        position: 'bottom',
        timer: 1000,
      })
      router.push('/')
    }

    ;(async () => {
      if (storedUser) {
        // const { data: myFavoriteProducts } = await api(`/favorite-product/${storedUser.id}`)
        const myFavoriteProducts = await fetch(
          'https://633010e5591935f3c8893690.mockapi.io/lenssis/api/v1/event'
        ).then((res) => res.json())

        setMyFavoriteProducts(myFavoriteProducts)
        // setMyFavoriteProducts(myFavoriteProducts)
      }
    })()
  }, [])

  return (
    <div className="grow shadow-basic rounded-md px-5">
      <div className="border-t-2 border-t-active py-2 my-12">
        <StrongTitle title="로그인 정보" />
        <div className="my-4">
          <div>이메일</div>
          <div>{user?.email}</div>
        </div>
      </div>
      <div className="w-full my-12 border-t-2 border-t-active py-2">
        <div className="flex justify-between">
          <StrongTitle title="좋아하는 상품" />
          <Link
            className="flex items-center mr-[20px] hover:text-textDisabled"
            href="/mypage/favorites"
          >
            더보기 <span className="mb-[3px] ml-1">&gt;</span>
          </Link>
        </div>
        {!myFavoriteProducts.length ? (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 상품이 없습니다.
          </div>
        ) : (
          <div className="grid justify-center md:justify-start md:grid-cols-3 my-12 items-center">
            {myFavoriteProducts.slice(0, 4).map((product) => (
              <ProductItem key={product.id} product={product} mini={true} hideFavoriteIcon={true} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="내 후기 보기" />
      </div>
      <div className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="상품 구매내역" />
      </div>
      <div className="w-full my-12 border-t-2 border-t-active py-2">
        <StrongTitle title="예약 내역" />
      </div>
    </div>
  )
}

MyPage.getLayout = getMyPageLayout

export default MyPage
