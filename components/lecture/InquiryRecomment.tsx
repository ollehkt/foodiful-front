import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { usePostRecomment } from './hooks/useLecture'
import { getStoredUser } from '../util/userStorage'
import { User } from '../auth/types/user'
import { useAtomValue } from 'jotai'
import { isMobileDisplay } from '../../store/isMobileDisplay'
import { useUser } from '../auth/hooks/useUser'

interface PropsType {
  parentId: number
  placeholder: string
}

function InquiryReComment({ parentId, placeholder }: PropsType) {
  const [user, setUser] = useState<User | null>(
    typeof window !== 'undefined' ? getStoredUser() : null
  )
  const [recommentState, setRecommentState] = useState({
    comment: '',
    isSecret: true,
    parentId,
  })
  const isMobile = useAtomValue(isMobileDisplay)

  const { postRecommentMutate } = usePostRecomment(parentId)

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRecommentState({ ...recommentState, comment: e.currentTarget.value })
  }

  const onClickPostRecomment = () => {
    if (!recommentState.comment.trim()) {
      return
    }
    postRecommentMutate({ recomment: recommentState })
    setRecommentState({ ...recommentState, comment: '' })
  }

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
          <div className="md:w-full flex relative items-center">
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
            title="등록"
            onClick={onClickPostRecomment}
            style={`h-[60px] ml-2 md:mx-2 font-semibold border-2 ${
              !recommentState.comment.trim() ? 'border-disabled' : 'border-main'
            } hover:bg-main hover:text-white`}
            size={`${isMobile ? 'sm' : 'md'}`}
            disabled={!user || !recommentState.comment.trim()}
          />
        </div>
      </div>
    </>
  )
}

export default InquiryReComment
