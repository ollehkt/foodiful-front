import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../../components/auth/types/user'
import useToast from '../../../components/common/hooks/useToast'
import StrongTitle from '../../../components/common/StrongTitle'
import ProductItem from '../../../components/product/ProductItem'
import { ProductReturnType } from '../../../components/product/types/productTypes'
import { getStoredUser } from '../../../components/util/userStorage'

import { getMyPageLayout } from '../getMyPageLayout'

const MyPageFavorites = () => {
  const { fireToast } = useToast()
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const [myFavoriteProducts, setMyFavoriteProducts] = useState<ProductReturnType[]>([])

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
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="좋아하는 상품" style="border-b-2 border-main pb-2" />
      <div className="w-full my-12 py-2">
        {!myFavoriteProducts.length ? (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 상품이 없습니다.
          </div>
        ) : (
          <div className="grid justify-center md:justify-start md:grid-cols-3 2xl:md-grid-cols-4 my-12 items-center gap-y-2">
            {myFavoriteProducts.slice(0, 4).map((product) => (
              <ProductItem key={product.id} product={product} mini={true} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

MyPageFavorites.getLayout = getMyPageLayout

export default MyPageFavorites
