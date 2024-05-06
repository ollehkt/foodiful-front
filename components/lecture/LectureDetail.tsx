import React, { useState } from 'react'
import { LectureType } from './types/lectureTypes'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import Image from 'next/image'
import SubSlider from '../common/DetailSlider'
import { Button } from '../common/Button'
import { useRouter } from 'next/router'

function LectureDetail({ lecture }: { lecture: LectureType }) {
  const { push } = useRouter()
  const { id, name, descImg, subTitle, description, isLiked, lectureDuration, price, regular } =
    lecture
  const isMobile = useAtomValue(isMobileDisplay)
  const [thumbnail, setThumbnail] = useState(descImg[0])
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 border-b-[1px] border-gray-200 mb-4">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-gray-400">
                클래스 수업 &gt; {name}
              </h2>
              {regular && (
                <div className="inline-block text-sm px-2 border-[1px] mt-2 pt-[2px] pb-[4px] bg-main text-white rounded-md">
                  정규 클래스
                </div>
              )}
              <div className="flex items-center justify-between mt-2 text-3xl font-semibold tracking-tight text-gray-900  pb-4 border-b-2 border-main">
                <span>{name} 클래스</span>
              </div>

              <p className="mt-6 text-lg leading-8 text-gray-600 break-keep">{subTitle}</p>

              <div className="text-lg border-t border-disabled mt-[20px] pt-[10px] font-bold">
                수업 시간
              </div>
              <div className="text-main text-3xl py-4">
                {lectureDuration / 60} <span className="text-gray-700">시간</span>
              </div>

              <div className="text-lg border-t border-disabled mt-[20px] pt-[10px] font-bold">
                수업 가격
              </div>
              <div className="text-2xl py-4 text-main font-bold">{price.toLocaleString()}원</div>
            </div>
          </div>
          <section>
            {isMobile ? (
              <>
                <div>
                  <Image
                    className="w-full h-[300px] object-contain mx-auto rounded-md my-4"
                    src={thumbnail ? thumbnail : '/foodiful.jpeg'}
                    alt="대표 이미지"
                    width={300}
                    height={300}
                  />
                  {!!descImg.length && (
                    <div className="flex items-center gap-2 overflow-x-scroll rounded-md">
                      {descImg.map((img) => (
                        <Image
                          key={img}
                          src={img}
                          alt="슬라이더 이미지"
                          width={100}
                          height={100}
                          onClick={() => setThumbnail(img)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : !!descImg.length ? (
              <SubSlider items={descImg} btn slidePx={110} btnSize={24} />
            ) : (
              <Image
                className="w-[450px] h-[400px] object-contain mx-auto rounded-md my-4"
                src={thumbnail ? thumbnail : '/foodiful.jpeg'}
                alt="대표 이미지"
                width={300}
                height={300}
              />
            )}
          </section>
        </div>
        <Button
          title="예약하러가기"
          style="border-2 border-main hover:text-white hover:bg-main"
          size="lg"
          onClick={() => push('/reservation')}
        />
      </div>
    </div>
  )
}

export default LectureDetail
