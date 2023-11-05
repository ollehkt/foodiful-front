import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { Button } from '../../components/common/Button'
import { useGetProducts } from '../../components/product/hooks/useProduct'
import { ProductReturnType, ProductType } from '../../types/productTypes'
import { getStoredUser } from '../../components/util/userStorage'
import ProductList from '../../components/product/ProductList'
import { useUser } from '../../components/auth/hooks/useUser'
import { api } from '../../components/axios/axiosInstance'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const {
    data: { data },
  } = await api('/product/all')

  return { props: { data } }
}

function ProductPage({ data: products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
// function ProductPage() {
  const { getUser } = useUser()
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  const onClickAddBtn = () => {
    router.push('/product/add')
  }

  useEffect(() => {
    const storedUser = getStoredUser()
    ;(async () => {
      const fetchedUserData = await getUser(storedUser)
      setUser(fetchedUserData)
    })()
  }, [])

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
