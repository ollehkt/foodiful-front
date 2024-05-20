import { useRouter } from 'next/router'
import React from 'react'
import Container from '../../../components/common/Container'
import StrongTitle from '../../../components/common/StrongTitle'
import { FaCheckCircle } from 'react-icons/fa'
import { Button } from '../../../components/common/Button'

function OrderConfirmPage() {
  const router = useRouter()

  return (
    <Container style="mt-[40px] flex flex-col items-center">
      <StrongTitle title="주문 완료" />
      <span className="my-4 text-main">
        <FaCheckCircle size={60} />
      </span>
      <div className="w-[60%] md:w-[40%] flex flex-col items-center">
        <div className="text-2xl font-bold my-10 break-keep">
          주문이 정상적으로 완료 되었습니다.
        </div>
        <div className="border-y-2 border-disabled w-full py-4 flex flex-col gap-4">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="font-semibold break-keep">주문 일자</div>
            <div className="text-textDisabled text-lg font-extrabold">{router.query.date}</div>
          </div>
          <div className="flex items-center gap-4 md:gap-11">
            <div className="font-semibold break-keep">주문 ID</div>
            <div className="text-main text-lg font-extrabold">{router.query.id}</div>
          </div>
        </div>
        <div className="flex gap-6 mt-[20px]">
          <Button
            title="주문내역 보기"
            style="bg-main text-white text-lg"
            size="md"
            onClick={() => router.push('/mypage/purchased')}
          />
          <Button
            title="홈으로 가기"
            style="bg-textDisabled text-white hover:bg-disabled hover:text-black text-lg"
            size="md"
            onClick={() => router.push('/')}
          />
        </div>
      </div>
    </Container>
  )
}

export default OrderConfirmPage
