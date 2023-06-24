import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScrollImageLists from '../components/scrollImage/ScrollImages'
import { httpRequest } from '../components/lib/httpRequest'

const Home: NextPage = () => {
  const requestAuthentication = async () => {
    const token = localStorage.getItem('jwt')
    try {
      const res = await httpRequest('auth/authenticate')('GET')('로그인에 실패했습니다')(token)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    // requestAuthentication()
  }, [])

  return (
    <>
      <ScrollImageLists />
    </>
  )
}

export default Home
