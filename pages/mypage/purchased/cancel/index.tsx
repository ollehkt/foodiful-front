import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button } from '../../../../components/common/Button'
import Container from '../../../../components/common/Container'
import StrongTitle from '../../../../components/common/StrongTitle'
import { useCancelOrder } from '../../../../components/order/hooks/useOrder'
import { modalState } from '../../../../store/modalState'

function OrderCancelForm() {
  const [refundReason, setRefundReason] = useState('')
  const {
    query: { orderId, date },
    back,
    push,
  } = useRouter()
  const setModal = useSetAtom(modalState)

  const { mutate: cancelOrder } = useCancelOrder()
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRefundReason(e.currentTarget.value)
  }
  const onClickCancel = () => {
    setModal({
      isOpen: true,
      title: '주문 취소',
      content: '정말 주문을 취소하시겠습니까?',
      confirmFunc: async () => {
        const res  =await 
        cancelOrder({ orderId: orderId as string, refundReason })
        push('/mypage/refund')
      },
    })
  }
  return (
    <Container style="my-8">
      <StrongTitle title="주문 취소" style="my-5 border-b-2 border-main pb-2" />

      <div className="flex justify-start items-center gap-4 my-8">
        <div>주문 ID</div>
        <div className="ml-4 lg:ml-[40px]">{orderId}</div>
      </div>
      <div className="flex justify-start items-center gap-4 my-8">
        <div>주문 일자</div>
        <div className="ml-0 lg:ml-[28px]">{date}</div>
      </div>
      <div className="flex justify-start itmes-center gap-4">
        <label htmlFor="cancel" className="flex">
          취소 사유
          <textarea
            className="resize-none border-2 border-disabled rounded-md ml-4 lg:ml-[40px] h-[100px]"
            name="requirement"
            id="cancel"
            cols={35}
            rows={10}
            value={refundReason}
            placeholder="취소 사유를 입력해주세요."
            onChange={onChange}
          />
        </label>
      </div>
      <div className="flex justify-center md:justify-start items-center gap-4 my-10 mx-auto lg:ml-16">
        <Button title="주문취소" onClick={onClickCancel} size="md" />
        <Button title="돌아가기" onClick={() => back()} size="md" style="bg-main text-white" />
      </div>
    </Container>
  )
}

export default OrderCancelForm
