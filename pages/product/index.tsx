import { useRouter } from 'next/router'
import { Button } from '../../components/common/Button'
import { getStoredUser } from '../../components/util/userStorage'
import ProductList from '../../components/product/ProductList'
import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { getProducts, useGetProducts } from '../../components/product/hooks/useProduct'
import { ProductSkeleton } from '../../components/common/skeleton/Skeleton'
import { DehydratedState, Hydrate, QueryClient, dehydrate } from '@tanstack/react-query'
import { queryKeys } from '../../query-keys/queryKeys'
import { InferGetServerSidePropsType } from 'next'
import { api } from '../../components/axios/axiosInstance'
import { ProductReturnType } from '../../components/product/types/productTypes'

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const { data = [] } = await api('/product/all')

  return { props: { data } }
}

function ProductPage({ data: products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const { data: productsUserLiked } = useGetProducts()

  const onClickAddBtn = () => {
    router.push('/product/add')
  }

  return (
    <>
      {user && user.role === 'ADMIN' && (
        <div className="flex justify-center pt-2">
          <Button style="text-xl" size="md" title="상품 추가" onClick={onClickAddBtn} />
        </div>
      )}
      <div className="mx-auto w-[80%] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ProductList products={user ? productsUserLiked : products} />
      </div>
    </>
  )
}

export default ProductPage
