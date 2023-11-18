import Link from 'next/link'
import { ReactElement } from 'react'
import Container from '../common/Container'
import ToastList from '../common/toast/ToastList'
import { myPageNav } from '../constants/myPageNav'

const MyPageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <ToastList />
      <Container style="flex gap-10 mt-[100px]">
        <div className="w-[30%] h-[600px] rounded-md shadow-basic">
          <div className="flex flex-col justify-center items-center gap-4 mt-[20px]">
            {myPageNav.map(({ title, url }) => (
              <Link
                href={url}
                key={title}
                className="w-[80%] py-2 cursor-pointer text-center hover:bg-[#eee] hover:text-active rounded-md"
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </Container>
    </>
  )
}

export default MyPageLayout
