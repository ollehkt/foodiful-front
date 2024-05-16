import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className="w-full mt-12 pb-10 bg-[#eee]">
      <div className="w-[80%] mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold my-4 text-gray-700">Foodiful</h1>
        <div className="flex justify-start gap-x-2 w-[200px] my-1">
          <p className="text-gray-400">주식회사</p>
          <p className="text-gray-500 font-semibold"> 푸디풀</p>
        </div>
        <div className="flex justify-start gap-x-2 w-[200px] my-1">
          <p className="text-gray-400">전화번호</p>
          <p className="text-gray-500 font-semibold"> 010-5471-0182</p>
        </div>
        <div className="flex justify-start gap-x-2 w-[200px] my-1">
          <p className="text-gray-400">문의시간</p>
          <p className="text-gray-500 font-semibold">평일 10:00 ~ 18:00</p>
        </div>
        <div className="flex flex-col sm:flex-row text-gray-400 gap-x-8 gap-y-2 break-keep mt-4 text-sm sm:text-base">
          <p>이용 규약과 정책</p>
          <p>특정 상거래에 관한 법률에 근거한 표기</p>
          <p>개인 정보 보호 방침</p>
        </div>
        <div className="flex gap-x-4 items-center mt-4">
          <Link href="https://talk.naver.com/ct/w4ll42" legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full overflow-hidden"
            >
              <Image src="/naver-talk.jpeg" alt="naver-talk" width={34} height={34} />
            </a>
          </Link>
          <Link href="https://pf.kakao.com/_fxduzb" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Image
                src="/kakao-ch.png"
                alt="instagram"
                width={34}
                height={34}
                className="rounded-full"
              />
            </a>
          </Link>
          <Link href="https://www.instagram.com/foodi_ful" legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Image
                src="/instagram.webp"
                alt="insta"
                width={34}
                height={34}
                className="rounded-full"
              />
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Footer
