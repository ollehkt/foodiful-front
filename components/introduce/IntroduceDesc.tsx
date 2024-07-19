import Image from 'next/image'
import StrongTitle from '../common/StrongTitle'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'

const descs = [
  {
    img: '/profileImage.png',
    title: '안녕하세요.',
    desc: '다양한 경험을 바탕으로 재밌고 즐거운 교육을 진행하는 푸디풀 대표 "전민지"입니다.',
  },
  {
    img: '/foodiful.jpeg',
    title: '푸디풀 입니다.',
    desc: 'Food와 Beautiful을 더한 단어로 우리나라의 음식을 우리나라 모든 사람들과  세계의 다양한 사람들에게 알리기 위해 노력합니다.',
  },
]
const IntroduceDesc = () => {
  const isMobile = useAtomValue(isMobileDisplay)
  return (
    <div className="my-28 grid grid-cols-1 gap-y-20 justify-center items-center">
      {descs.map(
        ({ title, desc, img }: { title: string; desc: string; img: string }, idx: number) => (
          <div
            key={`${title}-${desc}`}
            className={`flex ${isMobile ? 'flex-col items-center' : 'justify-center gap-x-4'} `}
          >
            <div
              className={`${
                !isMobile ? ((idx + 1) % 2 === 0 ? 'order-last w-[30%]' : 'w-[30%]') : ''
              }`}
              key={`${title}-${img}-${idx}`}
            >
              <StrongTitle title={title} style="my-[20px]" />
              <div className="font-semibold text-xl leading-10 break-keep break-word">{desc}</div>
            </div>
            <div
              className={`mt-5 ${
                isMobile
                  ? 'flex justify-center'
                  : `relative w-[30%] ${idx === 0 ? 'flex justify-end' : ''}`
              }`}
            >
              <Image
                src={img}
                alt="main-image"
                priority
                width={400}
                height={400}
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default IntroduceDesc

/**
 * import Image from 'next/image'
import StrongTitle from '../common/StrongTitle'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'

const descs = [
  {
    img: '/profileImage.png',
    title: '안녕하세요 푸디풀 입니다.',
    desc: '다양한 경험을 바탕으로 재밌고 즐거운 교육을 진행하는 푸디풀 대표 전민지입니다.',
  },
  { img: '/foodiful.jpeg', title: '푸디풀 입니다', desc: '엄청난 이력의 소유자 입니다.' },
]
const IntroduceDesc = () => {
  const isMobile = useAtomValue(isMobileDisplay)
  return (
    <div className="my-[120px] grid grid-cols-1 gap-y-40 justify-center items-center">
      {descs.map(
        ({ title, desc, img }: { title: string; desc: string; img: string }, idx: number) => (
          <div
            key={`${title}-${desc}`}
            className={`flex ${isMobile ? 'flex-col items-center' : ' justify-center'}`}
          >
            <div
              className={`${
                isMobile
                  ? 'break-keep'
                  : (idx + 1) % 2 === 0
                  ? 'order-last w-[40%] text-end'
                  : 'w-[30%]'
              } `}
              key={`${title}-${img}-${idx}`}
            >
              <StrongTitle title={title} style="my-[20px] " />
              <div className="font-semibold text-xl">{desc}</div>
            </div>
            <div className={`${isMobile ? '' : 'relative'}`}>
              <Image
                src={img}
                alt="main-image"
                priority
                width={400}
                height={400}
                className="w-[300px] h-[300px] rounded-md shadow-basic"
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default IntroduceDesc

 */
