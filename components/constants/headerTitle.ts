export interface SubTitle {
  title: string
  url: string
}

export interface TitleType {
  title: string
  url: string
  subTitle?: SubTitle[]
}

export const headerTitle = [
  {
    title: '푸디풀 소개',
    url: '/introduce/foodiful',
  },
  {
    title: '제품 소개',
    url: '/product',
    subTitle: [
      { title: '전체보기', url: '/product' },
      { title: '다식', url: '/product/dasik' },
      { title: '바람떡', url: '/product/windtteok' },
      { title: '쌀강정', url: '/product/ricegangjeong' },
      { title: '곶감단지', url: '/product/gotgam' },
      { title: '호두정과', url: '/product/hodu' },
    ],
  },
  {
    title: '클래스 소개',
    url: '/lecture',
    subTitle: [
      { title: '전체보기', url: '/lecture' },
      { title: '쌀강정 클래스', url: '/lecture/ricegangjeong' },
      { title: '다식 클래스', url: '/lecture/dasik' },
      { title: '호두 클래스', url: '/lecture/hodu' },
      { title: '곶감단지 클래스', url: '/lecture/gotgam' },
    ],
  },
  {
    title: '예약 하기',
    url: '/reservation',
  },
]
