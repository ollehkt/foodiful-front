// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type IntroduceData = {
  data: { mainImg: string; descs: { img: string; title: string; desc: string }[] }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IntroduceData>) {
  const data = {
    mainImg: '/foodiful.jpeg',
    descs: [
      {
        img: '/profileImage.png',
        title: '이게 푸디풀 입니다',
        desc: '엄청난 이력의 소유자 입니다.',
      },
      { img: '/foodiful.jpeg', title: '푸디풀 입니다', desc: '엄청난 이력의 소유자 입니다.' },
    ],
  }

  res.status(200).json({ data })
}
