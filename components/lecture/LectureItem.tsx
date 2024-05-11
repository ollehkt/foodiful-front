import React from 'react'
import { LectureType } from './types/lectureTypes'
import { useRouter } from 'next/router'
import Image from 'next/image'
import FavoriteIcon from '../common/favorite/FavoriteIcon'

interface PropsType {
  lecture: LectureType
}

const LectureItem = ({ lecture }: PropsType) => {
  const { id, name, descImg, description, discount, lectureDuration, price, regular, isLiked } =
    lecture
  const router = useRouter()
  return (
    <div key={`${name}-${id}`} className={`flex flex-col w-[250px]`}>
      <Image
        key={descImg[0]}
        src={descImg.length > 0 ? descImg[0] : '/foodiful.jpeg'}
        alt="클래스 설명 사진"
        width={200}
        height={200}
        className={`rounded-md w-[250px] h-[250px] border-2 border-[gray] cursor-pointer`}
        onClick={() => router.push(`/lecture/${id}`)}
      />
      <div className="flex items-center justify-between mt-4 relative">
        <h3 className="text text-gray-700">{name.slice(0, 10).slice(0, 12)}</h3>
        <FavoriteIcon id={id} isLiked={isLiked} lecture />
      </div>
      <p className="mt-1 text-lg font-medium text-gray-900">{price.toLocaleString()}원</p>
    </div>
  )
}

export default LectureItem
