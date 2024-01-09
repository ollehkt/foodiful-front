import { ReactElement } from 'react'
import MyPageLayout from '../../components/layout/MyPageLayout'
import Layout from '../../components/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '../../components/util/getQueryClient'

export function getMyPageLayout(page: ReactElement) {
  const queryClient = getQueryClient()

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <MyPageLayout>{page}</MyPageLayout>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Layout>
  )
}
