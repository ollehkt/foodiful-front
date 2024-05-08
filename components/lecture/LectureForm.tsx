import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useRenderImages } from '../common/hooks/useRenderImages'
import { LectureType } from './types/lectureTypes'
import { useInput } from '../common/hooks/useInput'
import { useGetPresignedUrl } from '../common/hooks/useGetPresignedUrl'
import { api } from '../axios/axiosInstance'
import { Button } from '../common/Button'
import dynamic from 'next/dynamic'
import { Input } from '../common/Input'
import { AiFillCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { VALID_IMAGE_FILE_TYPES } from '../common/types/fileTypes'
import Image from 'next/image'
import { useRouter } from 'next/router'

const DynamicEditor = dynamic(() => import('../common/editor/ToastEditor'), {
  ssr: false,
})

const regularBtns = [
  { title: '정규', isClicked: true },
  { title: '비정규', isClicked: false },
]

interface PropsType {
  lectureForUpdate?: LectureType
  onSubmitAdd?: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    unknown,
    {
      lecture: Omit<LectureType, 'id'>
    },
    unknown
  >
  onSubmitUpdate?: UseMutateFunction<
    any,
    unknown,
    {
      lecture: Omit<LectureType, 'id'>
      lectureId: number
    },
    unknown
  >
}

function LectureForm({ onSubmitAdd, onSubmitUpdate, lectureForUpdate }: PropsType) {
  const { push } = useRouter()
  const { onChangeRenderImgs } = useRenderImages()
  const [files, setFiles] = useState<File[]>([])
  const [imagesSrc, setImagesSrc] = useState<string[]>(
    (lectureForUpdate && lectureForUpdate.descImg) || []
  )

  const {
    state: lecture,
    setState: setLecture,
    onChangeInput,
  } = useInput<Omit<LectureType, 'id'>, string | number | string[] | boolean>(
    (lectureForUpdate && { ...lectureForUpdate }) || {
      name: '',
      subTitle: '',
      descImg: [],
      description: '',
      discount: 0,
      lectureDuration: 0,
      price: 0,
      regular: false,
    }
  )
  const { getPresignedUrlByFiles } = useGetPresignedUrl()
  const onClickDeleteFile = async (img: string) => {
    if (img.includes('kt-first-bucket')) {
      await api.delete(`/product/image/${lectureForUpdate && lectureForUpdate.id}`, {
        data: {
          img,
        },
      })
    }
    setImagesSrc(imagesSrc.filter((image) => image !== img))
  }

  const onSelectRegular = (title: string) => {
    setLecture({ ...lecture, regular: title === '정규' ? true : false })
  }
  return (
    <div className="mx-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="w-[60%] block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0  sm:leading-6 shadow-sm"
                  labelStyle="block  font-medium leading-6"
                  type="text"
                  labelName="클래스 이름"
                  value={lecture.name}
                  name="name"
                  placeholder="클래스 이름을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="w-[60%] block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0  sm:leading-6 shadow-sm"
                  labelStyle="block  font-medium leading-6"
                  type="text"
                  labelName="클래스 간단 설명"
                  value={lecture.subTitle}
                  name="subTitle"
                  placeholder="클래스에 대한 간단한 설명을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:leading-6 shadow-sm"
                  labelStyle="block font-medium leading-6 "
                  type="text"
                  labelName="클래스 가격"
                  value={lecture.price}
                  name="price"
                  placeholder="클래스 가격을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="block flex-1 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:leading-6 shadow-sm"
                  labelStyle="block font-medium leading-6 "
                  type="text"
                  labelName="클래스 할인"
                  value={lecture.discount}
                  name="discount"
                  placeholder="클래스 할인율을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  style="block flex-1 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:leading-6 shadow-sm"
                  labelStyle="block font-medium leading-6 "
                  type="text"
                  labelName="클래스 진행시간(분)"
                  value={lecture.lectureDuration}
                  name="lectureDuration"
                  placeholder="클래스 진행시간을 입력해주세요."
                  onChangeInput={onChangeInput}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="product-category" className="block font-medium leading-6">
                정규 클래스 여부
              </label>
              <div className="mt-2">
                <div className="flex flex-wrap">
                  <button
                    className={`mr-4 my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer ${
                      !!lecture.regular ? 'bg-main text-white' : ''
                    }`}
                    onClick={() => setLecture({ ...lecture, regular: true })}
                  >
                    정규
                  </button>
                  <button
                    className={`my-2 border-b-[1px] border-main border-[2px] rounded-md p-2 cursor-pointer ${
                      !lecture.regular ? 'bg-main text-white' : ''
                    }`}
                    onClick={() => setLecture({ ...lecture, regular: false })}
                  >
                    비정규
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block font-medium leading-6">
                클래스 이미지
              </label>
              <div className="mt-2 flex justify-start">
                <label
                  className="p-12 rounded-md border-2 border-dashed border-gray-900/25 cursor-pointer"
                  htmlFor="file-upload"
                >
                  <AiOutlinePlusCircle size={30} />
                  <input
                    id="file-upload"
                    onChange={(e) => onChangeRenderImgs(e, setFiles, setImagesSrc)}
                    name="fileUpload"
                    type="file"
                    multiple
                    accept={VALID_IMAGE_FILE_TYPES}
                    className="hidden"
                  />
                </label>
              </div>

              {imagesSrc && !!imagesSrc.length && (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                  <div className="p-2 flex justify-between overflow-x-scroll">
                    {imagesSrc.map((img, idx) => (
                      <>
                        <Image
                          key={`${img}-${idx}`}
                          src={img}
                          alt="사진 이미지"
                          width={400}
                          height={400}
                          className="mx-4 rounded-md"
                        />
                        <span
                          className="cursor-pointer text-main hover:text-white"
                          onClick={() => onClickDeleteFile(img)}
                        >
                          <AiFillCloseCircle />
                        </span>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block font-medium leading-6 mb-4">
                클래스 상세 설명
              </label>
              <DynamicEditor content={lecture} setContent={setLecture} bucket="lecture" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          onClick={async () => {
            const urls = await getPresignedUrlByFiles(files, 'lecture')
            if (urls) {
              const updatedLecture = { ...lecture, descImg: [...lecture.descImg, ...urls] }
              setLecture({ ...lecture, descImg: [...lecture.descImg, ...urls] })
              if (lectureForUpdate?.id && onSubmitUpdate)
                onSubmitUpdate({ lecture: updatedLecture, lectureId: lectureForUpdate.id })
              else {
                onSubmitAdd && onSubmitAdd({ lecture: updatedLecture })
              }
            }
          }}
          style="text-sm font-semibold leading-6 shadow-sm"
          title="올리기"
        />

        <Button
          onClick={() => push('/lecture')}
          title="취소"
          style="rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>
    </div>
  )
}

export default LectureForm
