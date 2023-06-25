import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'jotai'
import ToastList from '../components/common/toast/ToastList'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ToastList />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
