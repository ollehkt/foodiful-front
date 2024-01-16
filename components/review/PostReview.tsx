import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { VALID_IMAGE_FILE_TYPES } from '../common/types/fileTypes'
import { Button } from '../common/Button'
import { useGetPresignedUrl } from '../common/hooks/useGetPresignedUrl'
import { useRenderImages } from '../common/hooks/useRenderImages'
import useToast from '../common/hooks/useToast'
import { usePostReview, useUpdateReview } from './hooks/useReviews'
import { PostReviewTypes, ProductReviewTypes, UpdateReviewTypes } from './types/productReviewTypes'
import { useSetAtom } from 'jotai'
import { modalState } from '../../store/modalState'

interface PropsType {
  productName: string
  productId: number
  userId: number
  userReviewed?: ProductReviewTypes
  isModifyMode?: boolean
  setIsModifyMode?: Dispatch<SetStateAction<boolean>>
}

const ReviewForm = ({
  productName,
  productId,
  userId,
  userReviewed,
  setIsModifyMode,
}: PropsType) => {
  const [reviewState, setReviewState] = useState<PostReviewTypes>(
    userReviewed
      ? userReviewed
      : {
          comment: '',
          rating: 0,
          reviewImg: '',
        }
  )

  const [files, setFiles] = useState<File[]>([])
  const [imgSrc, setImgSrc] = useState<string[]>(
    userReviewed?.reviewImg ? [userReviewed.reviewImg] : []
  )
  const { onChangeRenderImgs } = useRenderImages()
  const { getPresignedUrlByFiles } = useGetPresignedUrl()
  const { fireToast } = useToast()
  const router = useRouter()
  const setModal = useSetAtom(modalState)

  const { mutate: postReviewMutation } = usePostReview(productId)
  const { mutate: updateReviewMutation } = useUpdateReview(productId)

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

    /**
     *  post 시에는 리뷰 이미지가 있을 때
     *  update 시에는 리뷰 이미지가 기존 이미지와 다를 때 -> url 올리기 전 까지는 기존 이미지와 같은 지 다른지 모른다.
     *  그렇다면 aws에서 현재 파일이 등록되어 있는 지 확인 후 업로드 시키기 or 그냥 계속 업로드 되게 만들기
     *  => 뭐가 리소스 낭비가 더 심할지 고민
     */
    if (reviewState.reviewImg) {
      const urls = await getPresignedUrlByFiles(files, 'product-review')
      if (urls) {
        userReviewed
          ? updateReview({ ...reviewState, reviewImg: urls[0], reviewId: userReviewed.id })
          : postReview({ ...reviewState, reviewImg: urls[0] })
      }
    } else
      userReviewed
        ? updateReview({ ...reviewState, reviewId: userReviewed.id })
        : postReview(reviewState)
  }

  const postReview = async (postReview: PostReviewTypes) => {
    if (!postReview.comment || postReview.rating === 0) {
      fireToast({
        id: '후기 등록 실패',
        type: 'failed',
        message: '후기 내용을 입력해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      return
    }
    setModal({
      isOpen: true,
      title: '후기 추가',
      content: '후기를 추가하시겠습니까?',
      confirmFunc: () => {
        postReviewMutation({
          ...postReview,
          comment: postReview.comment.trim(),
          productId,
          userId,
        })
      },
    })
  }

  const updateReview = async (updatedReview: UpdateReviewTypes) => {
    if (!updatedReview.comment || updatedReview.rating === 0) {
      fireToast({
        id: '후기 등록 실패',
        type: 'failed',
        message: '후기 내용을 입력해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      return
    }
    setModal({
      isOpen: true,
      title: '후기 업데이트',
      content: '후기를 업데이트 하시겠습니까?',
      confirmFunc: () =>
        updateReviewMutation({
          ...updatedReview,
          comment: updatedReview.comment.trim(),
          productId,
          userId,
        }),
    })
  }
  return (
    <div className="w-full">
      {/** 별점 */}
      <div className="mt-[40px]">
        <label htmlFor="cover-photo" className="block text-lg font-medium leading-6 text-gray-900">
          {userReviewed ? '후기 이미지 수정하기' : '후기 이미지 추가하기'}
        </label>
        <div className="my-2 flex justify-start">
          <label
            className="p-12 rounded-md border-2 border-dashed border-gray-900/25 cursor-pointer h-[130px]"
            htmlFor="file-upload"
          >
            <AiOutlinePlusCircle size={30} />
            <input
              id="file-upload"
              onChange={(e) => {
                setImgSrc([])
                onChangeRenderImgs(e, setFiles, setImgSrc)
              }}
              name="fileUpload"
              type="file"
              accept={VALID_IMAGE_FILE_TYPES}
              className="hidden"
            />
          </label>
          <div className="ml-[20px] h-[200px] flex items-center gap-x-2 overflow-y-hidden overflow-x-scroll">
            {!!imgSrc.length &&
              imgSrc.map((img) => <Image key={img} src={img} alt={img} width={200} height={200} />)}
          </div>
        </div>
      </div>

      <div className="flex  justify-between items-center text-2xl ">
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
        <div className="w-full flex relative items-center">
          <textarea
            value={reviewState.comment}
            onChange={onChangeComment}
            className="resize-none w-full h-[60px] rounded-md border-main border-2 pl-2 pr-[80px] "
            placeholder={`${productName} 에 대한 리뷰를 5자 이상 입력해주세요.`}
            minLength={5}
            maxLength={149}
          />
          <span className="absolute bottom-1 right-2 text-textDisabled text-[15px]">
            {reviewState.comment.length} / 150
          </span>
        </div>
        {userReviewed && (
          <Button
            title="취소하기"
            onClick={() => setIsModifyMode && setIsModifyMode(false)}
            style="h-[60px] mx-2 font-semibold"
            size="md"
          />
        )}
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

export default ReviewForm
