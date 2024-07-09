import React from 'react'
import InquiryForm from './InquiryForm'

import { InquiryType } from './types/inquiryTypes'
import InquiryItem from './InquiryItem'

interface PropsType {
  lectureName: string
  lectureId: string
  inquiryList: InquiryType[]
}

function LectureInquiry({ lectureName, lectureId, inquiryList }: PropsType) {
  return (
    <>
      <div>
        <p className="my-[20px] text-3xl font-bold">문의 등록하기</p>
        <InquiryForm
          placeholder={`${lectureName}에 대한 문의를 입력해주세요.`}
          lectureId={lectureId}
          parentId={null}
        />
      </div>
      <div className="flex-col mt-[40px] border-main border-t-[1px]">
        <p className="mt-[10px]  text-3xl mb-4">문의 목록</p>
        {!!inquiryList?.length ? (
          inquiryList.map((item) => (
            <InquiryItem key={item.id} inquiry={item} lectureId={lectureId} />
          ))
        ) : (
          <p className="flex justify-center text-center my-[50px] text-main text-xl font-bold">
            등록된 문의가 없습니다.
          </p>
        )}
      </div>
    </>
  )
}

export default LectureInquiry
