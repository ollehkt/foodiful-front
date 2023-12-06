import { useAtom, useSetAtom } from 'jotai'
import { ReactElement, useEffect } from 'react'
import { isMobileDisplay } from '../../store/isMobileDisplay'

import Footer from '../common/footer/Footer'
import Header from '../common/header/Header'

const Layout = ({ children }: { children: ReactElement }) => {
  const setIsMobile = useSetAtom(isMobileDisplay)

  useEffect(() => {
    if (window.innerWidth < 500) setIsMobile(true)
  }, [])

  return (
    <>
      <Header />
      <div className="w-full mx-auto">{children}</div>

      <Footer />
    </>
  )
}

export default Layout
