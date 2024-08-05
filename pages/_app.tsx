import '../styles/globals.css'
import App, { AppContext, AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { Hydrate } from '@tanstack/react-query'
import { Provider, useSetAtom } from 'jotai'
import ToastList from '../components/common/toast/ToastList'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import HeaderNavMobile from '../components/common/header/mobile/HeaderNavMobile'
import { getStoredUser, removeStoredUser, setStoreUser } from '../components/util/userStorage'
import { useUser } from '../components/auth/hooks/useUser'
import ModalContainer from '../components/common/modal/ModalContainer'
import RQProvider from '../components/util/RQProvider'
import { isMobileDisplay } from '../store/isMobileDisplay'
import Head from 'next/head'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
} // 기존 AppProps타입에 Layout을 추가한 것.
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { getUser } = useUser()

  const setIsMobile = useSetAtom(isMobileDisplay)
  setIsMobile(pageProps.isMobile)

  const handleResize = () => {
    if (window.innerWidth < 950) {
      window.localStorage.setItem('isMobile', 'true')
      setIsMobile(true)
    } else {
      window.localStorage.setItem('isMobile', 'false')
      setIsMobile(false)
    }
  }

  useEffect(() => {
    const isMobile = window.localStorage.getItem('isMobile')
    setIsMobile(isMobile === 'true' ? true : false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const storedUser = getStoredUser()
    ;(async () => {
      if (storedUser) {
        const res = await getUser(storedUser)
        setStoreUser(res)
      } else {
        removeStoredUser()
      }
    })()
  }, [])

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement) => (
      <>
        <RQProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider>
              <ToastList />
              <HeaderNavMobile />
              <ModalContainer />
              <Layout>
                <div className="w-full mx-auto">{page}</div>
              </Layout>
            </Provider>
          </Hydrate>
        </RQProvider>
      </>
    ))

  return getLayout(
    <>
      <Head>
        <title>푸디풀 FOODIFUL</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const userAgent = appContext.ctx.req
    ? appContext.ctx.req?.headers['user-agent']
    : navigator.userAgent

  const mobile = userAgent?.indexOf('Mobi')

  appProps.pageProps.isMobile = mobile !== -1 ? true : false

  return { ...appProps }
}

export default MyApp
