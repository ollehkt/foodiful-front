import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import ToastList from '../components/common/toast/ToastList'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
} // 기존 AppProps타입에 Layout을 추가한 것.
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement) => (
      <QueryClientProvider client={queryClient}>
        <Provider>
          <ToastList />

          <Layout>
            <div className="w-full mx-auto">{page}</div>
          </Layout>
        </Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    ))

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
