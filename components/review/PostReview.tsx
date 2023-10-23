import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaRegStarHalf, FaStarHalf } from 'react-icons/fa'

/**
 *
 * TODO: 유저의 구매목록에 현재 상품 id가 있을때만 작성 부분 활성화 해야함
 */

const PostReview = ({ name }: { name: string }) => {
  const [reviewState, setReviewState] = useState({
    comment: '',
    rating: 0,
    isSecret: false,
    reviewImg: [],
  })

  const [stars, setStars] = useState(0)
  const [isMouseHover, setIsMouseHover] = useState(false)

  return (
    <div className="w-full">
      {/** 별점 */}
      <div className="">
        별점 선택하기
        <div className="mx-5 flex flex-row-reverse justify-end text-2xl">
          <label htmlFor="score">별점 선택하기</label>
          <input type="radio" className="peer hidden" id="value5" value="5" name="score" />
          <label
            htmlFor="value5"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input type="radio" className="peer hidden" id="value4" value="4" name="score" />
          <label
            htmlFor="value4"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input type="radio" className="peer hidden" id="value3" value="3" name="score" />
          <label
            htmlFor="value3"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input type="radio" className="peer hidden" id="value2" value="2" name="score" />
          <label
            htmlFor="value2"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input type="radio" className="peer hidden" id="value1" value="1" name="score" />
          <label
            htmlFor="value1"
            className="cursor-pointer peer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
        </div>
      </div>
      <textarea
        value={reviewState.comment}
        onChange={() => {}}
        className="resize-none w-[80%] border-2"
        placeholder={`${name} 에 대한 리뷰를 입력해주세요.`}
      />
      {/** 사진 추가 */}
    </div>
  )
}

export default PostReview
