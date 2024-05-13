import { ReactElement } from 'react'
import MyPageLayout from './MyPageLayout'
import Layout from './Layout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ModalContainer from '../common/modal/ModalContainer'
import RQProvider from '../util/RQProvider'

export default function getMyPageLayout(page: ReactElement) {
  return (
    <Layout>
      <RQProvider>
        <ModalContainer />
        <MyPageLayout>{page}</MyPageLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </RQProvider>
    </Layout>
  )
}
