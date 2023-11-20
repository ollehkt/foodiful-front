import { ReactElement } from 'react'
import MyPageLayout from '../../components/layout/MyPageLayout'
import Layout from '../../components/layout/Layout'

export function getMyPageLayout(page: ReactElement) {
  return (
    <Layout>
      <MyPageLayout>{page}</MyPageLayout>
    </Layout>
  )
}
