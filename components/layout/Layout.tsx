import { ReactElement } from 'react'
import Footer from '../common/footer/Footer'
import Header from '../common/header/Header'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <div className="w-full mx-auto">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
