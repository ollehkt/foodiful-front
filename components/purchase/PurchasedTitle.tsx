import React from 'react'

function PurchasedTitle() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 items-center px-1 mt-3 text-sm text-textDisabled">
      <div className="hidden md:block">주문 일자</div>
      <div className="">주문 번호</div>
      <div className="hidden md:block">주문자 성함</div>
      <div className="">주문 가격</div>
      <div className="hidden md:block mr-8 md:mr-0 ">주문 현황</div>
    </div>
  )
}

export default PurchasedTitle
