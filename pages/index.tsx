import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import ScrollImageLists from '../components/scrollImage/ScrollImages'
import { httpRequest } from '../components/lib/httpRequest'
import { useUser } from '../components/auth/hooks/useUser'
import { getStoredUser } from '../components/util/userStorage'
import MainSlider from '../components/common/MainSlider'
import Container from '../components/common/Container'
import { api } from '../components/axios/axiosInstance'
import { ProductReturnType } from '../components/util/types/productTypes'

export const getStaticProps = async (): Promise<{ props: { data: ProductReturnType[] } }> => {
  const {
    data: { data },
  } = await api('/product/all')

  return { props: { data } }
}

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { getUser } = useUser()

  useEffect(() => {
    const storedUser = getStoredUser()
    // const user = async () => {
    //   const res = await getUser(storedUser)
    // }
    // user()
    console.log(storedUser)
  }, [])

  return (
    <>
      <MainSlider imgs={['/photo0.jpeg', '/foodiful.jpeg']} />
      <Container>
        <ScrollImageLists products={data} />
      </Container>
    </>
  )
}

export default Home
