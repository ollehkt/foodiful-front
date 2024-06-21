import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import { ProductReviewTypes } from './types/productReviewTypes'
import { encodingUserId } from '../util/encodingUserId'
import Link from 'next/link'

interface PropsType {
  review: ProductReviewTypes
  mypage?: boolean
}

const ReviewItem = ({ review, mypage }: PropsType) => {
  const { createdAt, updatedAt, comment, userId, productId, id, rating, reviewImg, user, product } =
    review
  const [isImageClicked, setIsImageClicked] = useState(false)
  const isMobile = useAtomValue(isMobileDisplay)
  return (
    <>
      <div
        className={`w-full ${
          reviewImg ? 'cursor-pointer' : 'cursor-default'
        } py-[12px] my-[20px] bg-main bg-opacity-10  rounded-md ${
          isImageClicked
            ? ''
            : isImageClicked && !reviewImg
            ? ''
            : !isMobile && 'relative h-[200px]'
        }  `}
        onClick={() => {
          if (!reviewImg) {
            return
          }
          setIsImageClicked((prev) => !prev)
        }}
      >
        <div className="p-[4px_0px_4px_4px]">
          <div
            style={{
              backgroundImage:
                'url(https://static-resource-smartstore.pstatic.net/brandstore/p/static/20231106154503/img/sprite/svg/spIcon_svg.svg)',
              backgroundSize: '824px 788px',
              backgroundPosition: '-661px -79px',
              width: '74px',
              height: '14px',
              display: 'inline-block',
              position: 'relative',
              verticalAlign: 'top',
            }}
          >
            <div
              style={{
                backgroundImage:
                  'url(https://static-resource-smartstore.pstatic.net/brandstore/p/static/20231106154503/img/sprite/svg/spIcon_svg.svg)',
                backgroundSize: '824px 788px',
                backgroundPosition: '-661px -101px',
                width: `${20 * rating}%`,
                height: '14px',
                display: 'block',
              }}
            ></div>
          </div>

          <div className="font-semibold text-gray-700">{user && encodingUserId(user)}</div>

          <div className="text-gray-500">
            {updatedAt ? dayjs(updatedAt).format('YY.MM.DD') : dayjs(createdAt).format('YY.MM.DD')}
          </div>
          {mypage && (
            <span className="inline-flex text-gray-500">
              <p className="">상품:</p>

              <Link
                href={`/product/${product.id}`}
                className="ml-1 text-main font-semibold underline hover:text-hover"
              >
                {product.name}
              </Link>
            </span>
          )}
          <p className="mt-[10px] text-gray-500">후기 내용</p>
          <div className={`md:w-[60%] w-[80%]  text-[#333] font-semibold break-keep`}>
            {comment}
          </div>
          {isMobile && !isImageClicked && reviewImg && (
            <div className="relative h-6">
              <span className="absolute bottom-0 left-[45%] text-[20px] font-extrabold text-main animate-bounce">
                <AiOutlineArrowDown />
              </span>
            </div>
          )}
        </div>
        {reviewImg &&
          (isMobile ? (
            <Image
              className={`${isImageClicked ? 'p-1 my-2 rounded-lg' : 'hidden'}`}
              src={reviewImg}
              alt="리뷰 이미지"
              width={240}
              height={200}
            />
          ) : (
            <Image
              className={`${
                isImageClicked
                  ? 'p-1 my-2 rounded-lg'
                  : 'absolute right-0 top-0 w-[200px] h-[200px] rounded-md'
              }`}
              src={reviewImg}
              alt="리뷰 이미지"
              width={240}
              height={200}
            />
          ))}
        {isMobile && isImageClicked && reviewImg && (
          <div className="relative h-6">
            <span className="absolute bottom-0 left-[45%] text-[20px] font-extrabold text-main animate-bounce">
              <AiOutlineArrowUp />
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default ReviewItem
