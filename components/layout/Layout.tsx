import { useAtom, useSetAtom } from 'jotai'
import { ReactElement, useEffect } from 'react'
import { isMobileDisplay } from '../../store/isMobileDisplay'

import Footer from '../common/footer/Footer'
import Header from '../common/header/Header'

const Layout = ({ children }: { children: ReactElement }) => {
  const setIsMobile = useSetAtom(isMobileDisplay)

  const handleResize = () => {
    if (window.innerWidth < 950) setIsMobile(true)
    else setIsMobile(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
