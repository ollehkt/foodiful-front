import type { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import { useUser } from '../components/auth/hooks/useUser'
import { getStoredUser } from '../components/util/userStorage'
import MainSlider from '../components/common/MainSlider'
import Container from '../components/common/Container'
import { api } from '../components/axios/axiosInstance'
import Channel from '../components/main/channel/Channel'
import ProductList from '../components/product/ProductList'
import { User } from '../components/auth/types/user'
import { useGetProducts } from '../components/product/hooks/useProduct'
import { ProductSkeleton } from '../components/common/skeleton/Skeleton'
import { ProductReturnType } from '../components/product/types/productTypes'
import { useGetOrder } from '../components/order/hooks/useOrder'

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const { data } = await api('/product/all')

  return { props: { data } }
}

// const Home = () => {
const Home = ({ data: products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, setUser] = useState<User>()

  const { data: myPurchasedProducts } = useGetOrder()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])
  const { data: productsUserLiked, isFetching } = useGetProducts()
  return (
    <>
      <div className="relative w-full">
        <MainSlider imgs={['/photo0.jpeg', '/foodiful.jpeg']} />

        <div className="w-[80%] mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {isFetching ? (
            <ProductSkeleton count={4} />
          ) : (
            <ProductList products={user && productsUserLiked ? productsUserLiked : products} />
          )}
        </div>

        <Channel />
      </div>
    </>
  )
}

export default Home
