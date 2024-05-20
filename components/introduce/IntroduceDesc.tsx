import Image from 'next/image'
import StrongTitle from '../common/StrongTitle'

const descs = [
  {
    img: '/profileImage.png',
    title: '이게 푸디풀 입니다',
    desc: '엄청난 이력의 소유자 입니다.',
  },
  { img: '/foodiful.jpeg', title: '푸디풀 입니다', desc: '엄청난 이력의 소유자 입니다.' },
]
const IntroduceDesc = () => {
  return (
    <div className="my-[120px] grid grid-cols-1 gap-y-40 justify-center items-center">
      {descs.map(
        ({ title, desc, img }: { title: string; desc: string; img: string }, idx: number) => (
          <div key={`${title}-${desc}`} className="flex justify-center">
            <div
              className={`${(idx + 1) % 2 === 0 && 'order-last w-[40%]'} w-[30%]`}
              key={`${title}-${img}-${idx}`}
            >
              <StrongTitle title={title} style="my-[20px]" />
              <div className="font-semibold text-xl">{desc}</div>
            </div>
            <div className="relative w-[40%]">
              <Image src={img} alt="main-image" priority width={500} height={500} />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default IntroduceDesc
