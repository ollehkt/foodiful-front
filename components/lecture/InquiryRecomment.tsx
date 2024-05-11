import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { usePostRecomment } from './hooks/useLecture'
import { getStoredUser } from '../util/userStorage'
import { User } from '../auth/types/user'

interface PropsType {
  parentId: number
  placeholder: string
}

function InquiryReComment({ parentId, placeholder }: PropsType) {
  const [user, setUser] = useState<User | null>(null)
  const [recommentState, setRecommentState] = useState({
    comment: '',
    isSecret: true,
    parentId,
  })

  const { postRecommentMutate } = usePostRecomment()

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRecommentState({ ...recommentState, comment: e.currentTarget.value })
  }

  const onClickPostRecomment = () => {
    postRecommentMutate({ recomment: recommentState })
  }
  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])
  return (
    <>
      <div>
        <div className="flex items-center gap-x-2 my-1">
          <input
            className="w-5 h-5"
            type="checkbox"
            checked={recommentState.isSecret}
            onChange={() =>
              setRecommentState({ ...recommentState, isSecret: !recommentState.isSecret })
            }
          />
          <p className="text-gray-700 pb-1">비밀글 작성</p>
        </div>
        <div className="flex justify-center items-center mt-[10px]">
          <div className="w-full flex relative items-center">
            <textarea
              value={recommentState.comment}
              onChange={onChangeComment}
              className="resize-none w-full h-[60px] rounded-md border-main border-2 pl-2 pr-[80px] "
              placeholder={`${user ? placeholder : '로그인 후 댓글을 작성해주세요.'}`}
              minLength={5}
              maxLength={149}
              disabled={!user}
            />
            <span className="absolute bottom-1 right-2 text-textDisabled text-[15px]">
              {recommentState.comment.length} / 150
            </span>
          </div>
          <Button
            title="등록하기"
            onClick={onClickPostRecomment}
            style="h-[60px] mx-2 font-semibold border-2 border-main hover:bg-main"
            size="md"
            disabled={!user}
          />
        </div>
      </div>
    </>
  )
}

export default InquiryReComment
