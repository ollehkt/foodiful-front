import React from 'react'

const Footer = () => {
  return (
    <section className="w-full h-[300px] mt-[40px] pt-[30px] bg-[#eee]">
      <div className="w-[80%] mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold my-4 text-gray-700">Foodiful</h1>
        <div className="flex justify-start gap-x-2 w-[200px] my-1">
          <p className="text-gray-400">주식회사</p>
          <p className="text-gray-500 font-semibold"> 푸디풀</p>
        </div>
        <div className="flex justify-start gap-x-2 w-[200px] my-1">
          <p className="text-gray-400">전화번호</p>
          <p className="text-gray-500 font-semibold"> 010-5471-0182</p>
        </div>
        <div className="flex justify-start gap-x-2 w-[200px] my-1">
          <p className="text-gray-400">문의시간</p>
          <p className="text-gray-500 font-semibold">평일 10:00 ~ 18:00</p>
        </div>
        <div className="flex text-gray-400 gap-x-8 mt-4">
          <p>이용 규약과 정책</p>
          <p>특정 상거래에 관한 법률에 근거한 표기</p>
          <p>개인 정보 보호 방침</p>
        </div>
      </div>
    </section>
  )
}

export default Footer
