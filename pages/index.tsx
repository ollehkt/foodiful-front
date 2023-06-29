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

  useEffect(() => {
    const storedUser = getStoredUser()
    const user = async () => {
      const res = await getUser(storedUser)
    }
    user()
  }, [getUser])

  return (
    <>
      <ScrollImageLists />
    </>
  )
}

export default Home
