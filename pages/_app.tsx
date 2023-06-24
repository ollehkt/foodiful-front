import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import ToastItem from '../components/common/toast/toastItem'
import { Provider, useAtomValue } from 'jotai'
import { toast } from '../store/toastState'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const toastValue = useAtomValue(toast)
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ToastItem content={toastValue.content} type={toastValue.type} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
