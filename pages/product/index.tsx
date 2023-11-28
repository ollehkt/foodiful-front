import { useRouter } from 'next/router'
import { Button } from '../../components/common/Button'

import { ProductReturnType } from '../../types/productTypes'
import { getStoredUser } from '../../components/util/userStorage'
import ProductList from '../../components/product/ProductList'

import { api } from '../../components/axios/axiosInstance'
import { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { useGetProducts } from '../../components/product/hooks/useProduct'
import useToast from '../../components/common/hooks/useToast'
import { ProductSkeleton } from '../../components/common/skeleton/Skeleton'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../query-keys/queryKeys'

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const { data } = await api('/product/all')

  return { props: { data } }
}

function ProductPage({ data: products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // function ProductPage() {
  const { fireToast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const { data: productsUserLiked, isFetching } = useGetProducts()

  const onClickAddBtn = () => {
    router.push('/product/add')
  }

  return (
    <div>
      {user && user.role === 'ADMIN' && (
        <Button style="text-xl" title="Add" onClick={onClickAddBtn} />
      )}

      <div className="mx-auto w-[80%] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {isFetching ? (
          <ProductSkeleton count={4} />
        ) : (
          <ProductList products={user && productsUserLiked ? productsUserLiked : products} />
        )}
      </div>
    </div>
  )
}

export default ProductPage
