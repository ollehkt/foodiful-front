import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useCancelOrder } from '../../../../components/order/hooks/useOrder'

function OrderCancelForm() {
  const [cancelReason, setCancelReason] = useState('')
  const {
    query: { orderId },
  } = useRouter()

  const { mutate: cancelOrder } = useCancelOrder()
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCancelReason(e.currentTarget.value)
  }
  const onClickCancel = () => {
    cancelOrder(orderId as string)
  }
  return (
    <div>
      <div>주문 취소</div>
      <div className="flex">
        <div>주문 ID</div>
        <div>{orderId}</div>
      </div>
      <div>
        <div>취소 사유</div>
        <label htmlFor="" className="flex ml-[-4px] lg:ml-0">
          취소 사유
          <textarea
            className="resize-none border-2 border-disabled rounded-md ml-2 lg:ml-[90px] h-[100px]"
            name="requirement"
            id=""
            cols={35}
            rows={10}
            value={cancelReason}
            placeholder="취소 사유를 입력해주세요."
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  )
}

export default OrderCancelForm
