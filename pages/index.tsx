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

export const getServerSideProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const {
    data: { data },
  } = await api('/product/all')

  return { props: { data } }
}

// const Home = () => {
const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { getUser } = useUser()

  useEffect(() => {
    const storedUser = getStoredUser()
    const user = async () => {
      await getUser(storedUser)
    }
    user()
  }, [])

  return (
    <>
      <div className="relative w-full">
        <MainSlider imgs={['/photo0.jpeg', '/foodiful.jpeg']} />
        <Container>
          <ProductList products={data} />
        </Container>
        <Channel />
      </div>
    </>
  )
}

export default Home
