import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import Container from '../common/Container'
import HeaderNavMobile from '../common/header/mobile/HeaderNavMobile'
import ToastList from '../common/toast/ToastList'
import { myPageNav } from '../constants/myPageNav'

const MyPageLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter()
  const isMobile = useAtomValue(isMobileDisplay)

  return (
    <>
      <ToastList />

      <HeaderNavMobile />
      {isMobile ? (
        /**
         * TODO: 상단에 드롭다운으로 라우트 주소 표시하기
         */
        <>{children}</>
      ) : (
        <Container style="flex gap-10 mt-[100px]">
          <div className="w-[20%] h-[600px] rounded-md shadow-basic">
            <div className="flex flex-col justify-center items-center gap-4 mt-[20px]">
              {myPageNav.map(({ title, url }) => (
                <Link
                  href={url}
                  key={title}
                  className={`w-[80%] py-2 cursor-pointer text-center hover:bg-[#eee] hover:text-active rounded-md ${
                    router.pathname === url && 'text-main bg-[#eee]'
                  }`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          {children}
        </Container>
      )}
    </>
  )
}

export default MyPageLayout
