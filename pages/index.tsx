import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScrollImageLists from '../components/scrollImage/ScrollImages'
import { httpRequest } from '../components/lib/httpRequest'
import { useUser } from '../components/auth/hooks/useUser'
import { getStoredUser } from '../components/util/userStorage'

const Home: NextPage = () => {
  const { getUser } = useUser()

  // const requestAuthentication = async () => {
  //   const token = localStorage.getItem('jwt')
  //   try {
  //     const res = await httpRequest('auth/authenticate')('GET')('로그인에 실패했습니다')(token)
  //     console.log(res)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  let storedUser: any = null
  if (typeof window !== 'undefined') {
    storedUser = getStoredUser()
  }

  useEffect(() => {
    // requestAuthentication()
    const user = async () => {
      const res = await getUser(storedUser)
      console.log(res)
    }
    user()
  }, [])

  return (
    <>
      <ScrollImageLists />
    </>
  )
}

export default Home
