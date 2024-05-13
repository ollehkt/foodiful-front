import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import Container from '../../components/common/Container'

import IntroduceDesc from '../../components/introduce/IntroduceDesc'
import IntroducePortfolio from '../../components/introduce/IntroducePortfolio'

export default function Introduce() {
  return (
    <>
      <div className="w-screen h-screen relative">
        <Image src="/profileImage.png" alt="main-image" fill />
      </div>
      <Container>
        <IntroduceDesc />
        <IntroducePortfolio />
      </Container>
    </>
  )
  // return <div></div>
}
