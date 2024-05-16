import React, { MouseEvent, useEffect, useState } from 'react'
import { InquiryType } from './types/inquiryTypes'
import { IoLockClosed } from 'react-icons/io5'
import dayjs from 'dayjs'
import InquiryReComment from './InquiryRecomment'
import {
  useDeleteInquiry,
  useDeleteInquiryRecomment,
  useGetInquiryRecomment,
} from './hooks/useLecture'
import { User } from '../auth/types/user'
import { getStoredUser } from '../util/userStorage'
import { Button } from '../common/Button'
import { useSetAtom } from 'jotai'
import { modalState } from '../../store/modalState'

interface PropsType {
  inquiry: InquiryType
}

function InquiryItem({ inquiry }: PropsType) {
  const { id: inquiryId, userId, comment, isSecret, updatedAt } = inquiry
  const [isDetailOpened, setIsDetailOpened] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const onClickInquiry = () => {
    !isSecret && setIsDetailOpened(!isDetailOpened)
  }
  const setModal = useSetAtom(modalState)
  const { data: inquiryRecomments } = useGetInquiryRecomment(inquiry.id)
  const { deleteInquiryMutate } = useDeleteInquiry()
  const { deleteInquiryRecommentMutate } = useDeleteInquiryRecomment()
  console.log(inquiryRecomments)
  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>, type: string, id: number) => {
    e.stopPropagation()
    setModal({
      isOpen: true,
      title: `${type === '문의' ? '문의 삭제' : '댓글 삭제'}`,
      content: `${type === '문의' ? '문의를 삭제하시겠습니까?' : '댓글을 삭제하시겠습니까?'}`,
      confirmFunc: () => {
        type === '문의' ? deleteInquiryMutate(id) : deleteInquiryRecommentMutate(id)
      },
    })
  }

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])
  return (
    <div className={`${isDetailOpened && 'bg-gray-200'}`}>
      <div
        className={`flex items-center justify-between border-t-[1px] border-t-gray-400 py-5 px-2 hover:bg-gray-100  ${
          isSecret ? 'cursor-default' : 'cursor-pointer'
        }`}
        onClick={onClickInquiry}
      >
        {isSecret ? (
          user && user.id === userId ? (
            <>
              <span className="text-sm">나의 글</span>
              {comment}{' '}
              {inquiryRecomments &&
                (!inquiryRecomments.length ? '(0)' : `(${inquiryRecomments.length})`)}
            </>
          ) : (
            <>
              <IoLockClosed className="text-gray-700" size={20} />
              <p>비밀글 입니다.</p>
            </>
          )
        ) : (
          <>
            {user && user.id === userId ? <span className="text-sm">나의 글</span> : <div></div>}
            {comment}{' '}
            {inquiryRecomments &&
              (!inquiryRecomments.length ? '(0)' : `(${inquiryRecomments.length})`)}
          </>
        )}

        <div className="flex items-center gap-x-4">
          <p>
            {user && user.role === 'ADMIN'
              ? userId
              : userId.toString().length > 5
              ? `${userId.toString().slice(0, 4)}****`
              : `${userId}****`}
          </p>
          <p className="text-gray-700">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</p>
          {user && (user.id === userId || user.role === 'ADMIN') && (
            <Button
              title="삭제"
              size="sm"
              style="hover:bg-main py-[2px]"
              onClickWithEvent={(e: MouseEvent<HTMLButtonElement>) =>
                onClickDelete(e, '문의', inquiryId)
              }
            />
          )}
        </div>
      </div>
      {isDetailOpened && (
        <div className="pb-4">
          <div className="pb-8 pt-4 bg-gray-200 border-t-[1px] border-t-gray-400 px-2">
            <InquiryReComment
              placeholder={`"${comment}"에 대한 댓글을 입력해주세요.`}
              parentId={inquiryId}
            />
          </div>
          {!!inquiryRecomments.length &&
            inquiryRecomments.map(
              ({
                id: recommentId,
                updatedAt,
                comment: recomment,
                isSecret,
                userId: recommentUserId,
              }) => (
                <div
                  key={recommentId}
                  className="flex items-center justify-between mx-4 px-2 py-8 my-2 border-[1px] border-main bg-white rounded-md"
                >
                  {isSecret ? (
                    user && user.id === recommentUserId ? (
                      <>
                        <span className="text-sm">나의 글</span>
                        {recomment}
                      </>
                    ) : (
                      <>
                        <IoLockClosed className="text-gray-700" size={20} />
                        <p>비밀글 입니다.</p>
                      </>
                    )
                  ) : (
                    <>
                      {user && user.id === recommentUserId ? (
                        <span className="text-sm">나의 글</span>
                      ) : (
                        <div></div>
                      )}
                      {recomment}
                    </>
                  )}

                  <div className="flex items-center gap-x-4">
                    <p>
                      {user && user.role === 'ADMIN'
                        ? userId
                        : recommentUserId.toString().length > 5
                        ? `${recommentUserId.toString().slice(0, 4)}****`
                        : `${recommentUserId}****`}
                    </p>
                    <p className="text-gray-700">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</p>
                    {user && (user.id === recommentUserId || user.role === 'ADMIN') && (
                      <Button
                        title="삭제"
                        size="sm"
                        style="hover:bg-main py-[2px]"
                        onClickWithEvent={(e: MouseEvent<HTMLButtonElement>) =>
                          onClickDelete(e, '댓글', recommentId)
                        }
                      />
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </div>
  )
}

export default InquiryItem