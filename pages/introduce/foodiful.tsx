import Image from 'next/image'
import React from 'react'
import Container from '../../components/common/Container'
import IntroduceDesc from '../../components/introduce/IntroduceDesc'
import IntroducePortfolio from '../../components/introduce/IntroducePortfolio'
import MainSlider from '../../components/common/MainSlider'
import dasik from '/public/dasik1.jpeg'
import inhudan from '/public/inhudan.jpeg'
import inhudan1 from '/public/inhudan1.jpeg'
import yanggaeng from '/public/yanggaeng.jpeg'
import StrongTitle from '../../components/common/StrongTitle'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'

export default function Introduce() {
  const isMobile = useAtomValue(isMobileDisplay)
  return (
    <>
      <div className="w-screen mt-[40px] relative">
        <MainSlider imgs={[dasik, inhudan, inhudan1, yanggaeng]} />
      </div>
      <Container>
        <IntroduceDesc />
        <IntroducePortfolio />
        <div className="flex flex-col items-center my-10">
          <StrongTitle title="KNN / SBS 굿모닝투데이 방영 영상" style="my-6" />
          <iframe
            width={`${isMobile ? 300 : 560}`}
            height="315"
            src="https://www.youtube.com/embed/Bn_HQswkMvw?si=iM-A0Lt29pDraiLB"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
    </>
  )
  // return <div></div>
}
