import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import Footer from '../common/footer/Footer'
import Header from '../common/header/Header'

const Layout = ({ children }: { children: ReactElement }) => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true)

  const router = useRouter()
  let prevScroll = 0

  const handleScroll = () => {
    const scrollY = window.scrollY
    let nextScroll = scrollY || 0

    if (scrollY >= 25) {
      setIsHeaderOpen(false)
      return
    }
    if (scrollY == 0) setIsHeaderOpen(true)

    prevScroll = nextScroll
    if (prevScroll < nextScroll) {
      let timer
      timer = setTimeout(() => {
        timer = null
        window.scroll({ top: nextScroll + 1210, left: 0, behavior: 'smooth' })
      }, 500)
    }
  }
  useEffect(() => {
    if (router.pathname === '/') window.addEventListener('scroll', handleScroll)
    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }
  }, [])

  return (
    <>
      <Header isHeaderOpen={isHeaderOpen} />
      <div className="w-full mx-auto">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
