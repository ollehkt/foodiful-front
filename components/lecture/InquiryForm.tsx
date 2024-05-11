import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { usePostInquiry } from './hooks/useLecture'
import { User } from '../auth/types/user'
import { getStoredUser } from '../util/userStorage'

interface PropsType {
  placeholder: string
  lectureId: string
  parentId: number | null
}

function InquiryForm({ placeholder, lectureId, parentId }: PropsType) {
  const [user, setUser] = useState<User | null>(null)
  const [inquiryState, setInquiryState] = useState({
    comment: '',
    isSecret: true,
    parentId,
    lectureId,
  })
  const { postInquiryMutate } = usePostInquiry()
  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInquiryState({ ...inquiryState, comment: e.currentTarget.value })
  }

  const onClickPostBtn = () => {
    postInquiryMutate({ lectureInquiry: inquiryState })
  }

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  return (
    <>
      <div className="flex items-center gap-x-2 my-1">
        <input
          className="w-5 h-5"
          type="checkbox"
          checked={inquiryState.isSecret}
          onChange={() => setInquiryState({ ...inquiryState, isSecret: !inquiryState.isSecret })}
        />
        <p className="text-gray-700 pb-1">비밀글 작성</p>
      </div>
      <div className="flex justify-center items-center mt-[10px]">
        <div className="w-full flex relative items-center">
          <textarea
            value={inquiryState.comment}
            onChange={onChangeComment}
            className="resize-none w-full h-[60px] rounded-md border-main border-2 pl-2 pr-[80px] "
            placeholder={`${user ? placeholder : '로그인 후 문의를 남겨주세요'}`}
            minLength={5}
            maxLength={149}
            disabled={!user}
          />
          <span className="absolute bottom-1 right-2 text-textDisabled text-[15px]">
            {inquiryState.comment.length} / 150
          </span>
        </div>
        <Button
          title="등록하기"
          onClick={onClickPostBtn}
          style="h-[60px] mx-2 font-semibold border-2 border-main hover:bg-main"
          size="md"
          disabled={!user}
        />
      </div>
    </>
  )
}

export default InquiryForm
