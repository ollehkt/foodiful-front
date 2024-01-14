import Image from 'next/image'
import StrongTitle from '../common/StrongTitle'

interface PropsType {
  descs: { title: string; desc: string; img: string }[]
}

const IntroduceDesc = ({ descs }: PropsType) => {
  return (
    <div className="my-[120px] grid grid-cols-2 gap-y-32 justify-center items-center">
      {descs.map(
        ({ title, desc, img }: { title: string; desc: string; img: string }, idx: number) => (
          <>
            <div
              className={`${(idx + 1) % 2 === 0 && 'order-last'}`}
              key={`${title}-${img}-${idx}`}
            >
              <StrongTitle title={title} style="my-[20px]" />
              <div className="font-semibold text-xl">{desc}</div>
            </div>
            <div className="w-[80%] h-[500px] relative">
              <Image src={img} alt="main-image" priority fill />
            </div>
          </>
        )
      )}
    </div>
  )
}

export default IntroduceDesc
