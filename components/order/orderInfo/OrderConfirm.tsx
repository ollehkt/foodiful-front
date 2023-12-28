import React from 'react'
import { RequestPayParams, RequestPayResponse } from '../../../portone'
import { Button } from '../../common/Button'
import { OrderFormType } from '../types/orderFormTypes'

function OrderConfirm({ orderForm }: { orderForm: OrderFormType }) {
  const onClickPayment = () => {
    if (!window.IMP) return
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp11681327') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'html5_inicis.INIBillTst', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: orderForm.totalPrice, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: orderForm.deliverName, // 구매자 이름
      buyer_tel: orderForm.deliverPhone, // 구매자 전화번호
      buyer_email: '', // 구매자 이메일
      buyer_addr: `${orderForm.deliverAddress}${orderForm.deliverSpecificAddress}`, // 구매자 주소
      buyer_postcode: orderForm.deliverPostalCode, // 구매자 우편번호
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response
    console.log(response)

    if (success) {
      alert('결제 성공')
      /**
       * TODO: 결제 성공 시 아래 데이터를 기반으로 db 저장
       * apply_num
: 
"51754876"
bank_name: null
buyer_addr: "부산 수영구 광안로 12105-501"
buyer_email: ""
buyer_name: "이경택"
buyer_postcode: "48298"
buyer_tel: "01016703643"
card_name: "BC카드"
card_number: "514876*********7"
card_quota: 0
currency: "KRW"
custom_data: null
imp_uid: "imp_188073388759"
merchant_uid: "mid_1703766070866"
name: "아임포트 결제 데이터 분석"
paid_amount: 208000
paid_at: 1703766110
pay_method: "card"
pg_provider: "html5_inicis"
pg_tid: "StdpayCARDINIBillTst20231228212148925358"
pg_type: "payment"
receipt_url: "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIBillTst20231228212148925358&noMethod=1"
status: "paid"
success: true
       */
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <div className=" md:w-[40%] mt-[40px] mx-auto shadow-basic rounded-md flex flex-col items-center gap-4">
      <div className="font-bold text-lg text-main my-[20px]">총 주문금액</div>
      <div className="w-[60%] flex justify-between items-center">
        <div>총 상품금액</div>
        <div>
          <span className="text-main text-bold">{orderForm.totalPrice.toLocaleString()}</span>원
        </div>
      </div>
      <div className="w-[60%] flex justify-between items-center">
        <div>배송비</div>
        <div>
          <span className="text-main text-bold">3,000</span>원
        </div>
      </div>

      <Button
        title="결제하기"
        onClick={onClickPayment}
        style="my-4 bg-main text-[white]"
        size="lg"
      />
    </div>
  )
}

export default OrderConfirm
