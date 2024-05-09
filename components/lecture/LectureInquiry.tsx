import React, { useState } from 'react'
import { User } from '../auth/types/user'
import InquiryForm from './InquiryForm'
import InquiryList from './InquiryItem'
import { InquiryType } from './types/inquiryTypes'
import InquiryItem from './InquiryItem'
import InquiryReComment from './InquiryRecomment'

interface PropsType {
  lectureName: string
  lectureId: string
  inquiryList: InquiryType[]
}

function LectureInquiry({ lectureName, lectureId, inquiryList }: PropsType) {
  const [userWritten, setUserWritten] = useState()
  const [isModifyMode, setIsModifyMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  return (
    <div>
      <>
        <div className="my-[20px] text-3xl font-bold">문의 등록하기</div>
        <InquiryForm
          placeholder={`${lectureName}에 대한 문의를 입력해주세요.`}
          lectureId={lectureId}
          parentId={null}
        />
      </>
      <div className="flex-col mt-[40px] border-main border-t-[1px]">
        <div className="mt-[10px]  text-3xl mb-4">문의 목록</div>
        {!!inquiryList.length ? (
          <>
            {inquiryList.map((item) => (
              <InquiryItem key={item.id} inquiry={item} />
            ))}
          </>
        ) : (
          <div className="flex justify-center text-center my-[50px] text-main text-xl font-bold">
            후기가 없습니다. <br />
            구매 후 후기를 등록해주세요.
          </div>
        )}
      </div>
    </div>
  )
}

export default LectureInquiry
