import { ReactElement } from 'react'
import MyPageLayout from '../../components/layout/MyPageLayout'
import Layout from '../../components/layout/Layout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ModalContainer from '../../components/common/modal/ModalContainer'
import RQProvider from '../../components/util/RQProvider'

export function getMyPageLayout(page: ReactElement) {
  return (
    <Layout>
      <RQProvider>
        <ModalContainer />
        <MyPageLayout>{page}</MyPageLayout>
        <ReactQueryDevtools initialIsOpen={true} />
      </RQProvider>
    </Layout>
  )
}
