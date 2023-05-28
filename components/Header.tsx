import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className="w-full  bg-gradient-to-tl from-[#fbc0ff] to-[#fff]">
      <div className="w-[1280px] h-[80px] mx-auto flex justify-between items-center">
        <div className="font-bold text-3xl text-main">Foodiful</div>
        <div className="w-[60px]">logo</div>
        <div className="w-[800px]">navigation</div>
        <Link className="text-xl no-underline text-[#666] hover:text-[#000]" href="auth">
          로그인
        </Link>
      </div>
    </div>
  )
}

export default Header
