import { useRouter } from 'next/router'
import { Button } from '../../components/common/Button'

import { ProductReturnType, ProductType } from '../../types/productTypes'
import { getStoredUser } from '../../components/util/userStorage'
import ProductList from '../../components/product/ProductList'

import { api } from '../../components/axios/axiosInstance'
import { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const { data } = await api('/product/all')

  return { props: { data } }
}

function ProductPage({ data: products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // function ProductPage() {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  const router = useRouter()

  const onClickAddBtn = () => {
    router.push('/product/add')
  }

  return (
    <div>
      {user && user.role === 'ADMIN' && (
        <Button style="text-xl" title="Add" onClick={onClickAddBtn} />
      )}

      <div className="mx-auto w-[80%] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default ProductPage
