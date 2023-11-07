import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { VALID_IMAGE_FILE_TYPES } from '../../types/fileTypes'
import { PostReviewTypes } from '../../types/reviewState'
import { api } from '../axios/axiosInstance'

import { Button } from '../common/Button'
import { useGetPresignedUrl } from '../common/hooks/useGetPresignedUrl'
import { useRenderImages } from '../common/hooks/useRenderImages'
import useToast from '../common/hooks/useToast'

interface PropsType {
  productName: string
  productId: number
  userId: number
}

const PostReview = ({ productName, productId, userId }: PropsType) => {
  const [reviewState, setReviewState] = useState<PostReviewTypes>({
    comment: '',
    rating: 0,
    isSecret: false,
    reviewImg: [],
  })

  const [files, setFiles] = useState<File[]>([])
  const [imgSrc, setImgSrc] = useState<string[]>([])
  const { onChangeRenderImgs } = useRenderImages()
  const { getPresignedUrlByFiles } = useGetPresignedUrl()
  const { fireToast } = useToast()

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewState({ ...reviewState, comment: e.currentTarget.value })
  }

  const onClickRating = (e: React.MouseEvent<HTMLInputElement>) => {
    setReviewState({ ...reviewState, rating: Number(e.currentTarget.value) })
  }

  const onClickPostBtn = async () => {
    if (!reviewState.comment)
      fireToast({
        id: '내용 추가',
        type: 'failed',
        message: '후기 내용을 추가해야 합니다.',
        timer: 1500,
        position: 'bottom',
      })
    if (reviewState.rating < 1 || reviewState.rating > 5) {
      fireToast({
        id: '별점 추가',
        type: 'failed',
        message: '별점을 추가해야 합니다.',
        timer: 1500,
        position: 'bottom',
      })
      return
    }
    const urls = await getPresignedUrlByFiles(files, 'product-review')
    if (urls) {
      const updatedReview = {
        ...reviewState,
        reviewImg: [...reviewState.reviewImg, ...urls],
      }
      postReview(updatedReview)
    }
  }

  const postReview = async (updatedReview: PostReviewTypes) => {
    const { data } = await api.post('/product-review', {
      ...updatedReview,
      productId,
      userId,
    })
    console.log(data)
  }
  return (
    <div className="w-full">
      {/** 별점 */}
      <div className="mt-[40px]">
        <label htmlFor="cover-photo" className="block text-lg font-medium leading-6 text-gray-900">
          후기 이미지 추가하기
        </label>
        <div className="mt-2 flex justify-start">
          <label
            className="p-12 rounded-md border-2 border-dashed border-gray-900/25 cursor-pointer h-[130px]"
            htmlFor="file-upload"
          >
            <AiOutlinePlusCircle size={30} />
            <input
              id="file-upload"
              onChange={(e) => onChangeRenderImgs(e, setFiles, setImgSrc)}
              name="fileUpload"
              type="file"
              multiple
              accept={VALID_IMAGE_FILE_TYPES}
              className="hidden"
            />
          </label>
          <div className="ml-[20px] h-[200px] flex items-center gap-x-2 overflow-y-hidden overflow-x-scroll">
            {imgSrc.length > 0 &&
              imgSrc.map((img) => <Image key={img} src={img} alt={img} width={200} height={200} />)}
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse  justify-between items-center text-2xl ">
        <div className="text-xl mr-[140px] flex items-center">
          비밀글
          <input
            className="mx-2 w-[16px] h-[16px] cursor-pointer"
            type="checkbox"
            onChange={() => setReviewState({ ...reviewState, isSecret: !reviewState.isSecret })}
            checked={reviewState.isSecret}
          />
        </div>
        <div className="flex flex-row-reverse ">
          <input
            type="radio"
            className="peer hidden"
            id="value5"
            value={5}
            name="score"
            onClick={onClickRating}
          />
          <label
            htmlFor="value5"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input
            type="radio"
            className="peer hidden"
            id="value4"
            value={4}
            name="score"
            onClick={onClickRating}
          />
          <label
            htmlFor="value4"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input
            type="radio"
            className="peer hidden"
            id="value3"
            value={3}
            name="score"
            onClick={onClickRating}
          />
          <label
            htmlFor="value3"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input
            type="radio"
            className="peer hidden"
            id="value2"
            value={2}
            name="score"
            onClick={onClickRating}
          />
          <label
            htmlFor="value2"
            className="cursor-pointer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <input
            type="radio"
            className="peer hidden"
            id="value1"
            value={1}
            name="score"
            onClick={onClickRating}
          />
          <label
            htmlFor="value1"
            className="cursor-pointer peer text-disabled peer-hover:text-main peer-checked:text-active"
          >
            ★
          </label>
          <label htmlFor="score">별점 선택하기</label>
        </div>
      </div>

      <div className="flex justify-center items-center mt-[10px]">
        <textarea
          value={reviewState.comment}
          onChange={onChangeComment}
          className="resize-none w-full h-[60px] rounded-md border-main border-2 px-2"
          placeholder={`${productName} 에 대한 리뷰를 5자 이상 입력해주세요.`}
          minLength={5}
        />
        <Button
          title="등록하기"
          onClick={onClickPostBtn}
          style="h-[60px] mx-2 font-semibold"
          size="md"
        />
      </div>
    </div>
  )
}

export default PostReview
