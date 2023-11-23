import type { InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import { useUser } from '../components/auth/hooks/useUser'
import { getStoredUser } from '../components/util/userStorage'
import MainSlider from '../components/common/MainSlider'
import Container from '../components/common/Container'
import { api } from '../components/axios/axiosInstance'
import { ProductReturnType } from '../types/productTypes'
import Channel from '../components/main/channel/Channel'
import ProductList from '../components/product/ProductList'
import { User } from '../components/auth/types/user'

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const { data } = await api('/product/all')

  return { props: { data } }
}

// const Home = () => {
const Home = ({ data: products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, setUser] = useState<User>()
  const [productsUserLiked, setProductuserLiked] = useState<ProductReturnType[]>([])

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
    ;(async () => {
      if (storedUser) {
        const { data: Products } = await api(`/product/all/${storedUser.id}`)
        setProductuserLiked(Products)
      }
    })()
  }, [])
  return (
    <>
      <div className="relative w-full">
        <MainSlider imgs={['/photo0.jpeg', '/foodiful.jpeg']} />

        <div className="w-[80%] mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <ProductList products={user ? productsUserLiked : products} />
        </div>

        <Channel />
      </div>
    </>
  )
}

export default Home
