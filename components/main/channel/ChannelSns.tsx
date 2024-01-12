import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

/**
 *
 * TODO: 인스타 연동 및 인스타 아이콘 추가
 */

const ChannelSns = () => {
  return (
    <div className="w-[90%] h-[60px] mt-[10px] flex justify-between items-center px-[10px] mx-auto rounded-2xl shadow-lg bg-white">
      <span>다른 방법으로 상담</span>

      <div className="flex gap-2 items-center">
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
            <Image src="/kakao.png" alt="instagram" width={34} height={34} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ChannelSns
