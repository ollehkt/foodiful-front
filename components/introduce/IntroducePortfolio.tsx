import React, { useCallback, useRef } from 'react'
import useIntersectionObserver from '../common/hooks/useIntersectionObserver'
import StrongTitle from '../common/StrongTitle'

const IntroducePortfolio = () => {
  const ref = useRef<HTMLDivElement>(null)

  const addAnimation = useCallback(() => {
    if (ref.current) ref.current.classList.add('animate-translateUp')
  }, [])

  useIntersectionObserver(ref, addAnimation)

  return (
    <div className="flex flex-col items-center">
      <StrongTitle title="푸디풀 이력" />
      <div className="flex flex-col gap-y-4 leading-7 mt-6">
        <StrongTitle style="text-xl text-main" title="2024" /> KNN / SBS 굿모닝투데이 방영 <br />
        <StrongTitle style="text-xl text-main" title="2023" /> 한식진흥원 한식교강사 교육 수료{' '}
        <br /> 한국자산관리공사 출강 <br /> 임실치즈과학고등학교 창업실습 프로그램 출강 <br />
        <StrongTitle style="text-xl text-main" title="2020-2021" />
        국제한식조리학교 졸업 <br /> CCIK <br />
        떡제조기능사 - 한국산업인력공단 <br /> FCAA <br />
        <StrongTitle style="text-xl text-main" title="2019" />
        푸드스타일리스트 자격증 - 아이엠푸드스타일리스트 <br /> 페레로로셰 푸드스타일링, 손모델{' '}
        <br />
        뉴텔라 푸드스타일링 <br /> 동원물 제품(만두) 푸드스타일링 <br /> 굿모닝 웍스(소스통)
        푸드스타일링, 손모델 <br /> <StrongTitle
          style="text-xl text-main"
          title={'2017-2018'}
        />{' '}
        일본 도쿄 핫토리영양전문학교 졸업 東京、服部栄養専門学校 <br />
        조리사면허증 - 도쿄도지사 <br />
        식육 인스트렉터 - (사)일본전국조리사양성시설협회 <br /> 일본 레스토랑 서비스기능검정 3급{' '}
        <br />
        기술검정요리기술(상급) - 일본 전국 요리학교 협회 <br /> 제 1회 frecofoods 고기요리 콘테스트
        1위 <br /> American cheese menu contest 수상 - 아메리카유제품수출협회(USDEC) <br /> 도쿄
        힐튼 일식당 (쥬니소우) <br />
        도쿄 호텔 핫포엔 <br /> 핫토리영양전문학교 마스터코스 - 서양요리 <br /> 핫토리영양전문학교
        마스터코스 - 일본요리 <br /> 핫토리영양전문학교 -제과제빵 <br />{' '}
      </div>
    </div>
  )
}

export default IntroducePortfolio
