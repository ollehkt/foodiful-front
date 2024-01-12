import React from 'react'

function PurchasedTitle() {
  return (
    <div className="flex items-center justify-between px-1 mt-3 text-sm text-textDisabled">
      <div className="hidden md:block md:grow-[1.5]">주문 일자</div>
      <div className="md:grow-[1.6]">주문 번호</div>
      <div className="hidden md:block md:grow-[0.7]">주문자 성함</div>
      <div className="md:grow-[1]">주문 가격</div>
      <div className="mr-8 md:mr-0 md:grow-[0.9]">주문 현황</div>
      <div className="hidden md:block md:grow-[1.5]"></div>
    </div>
  )
}

export default PurchasedTitle
