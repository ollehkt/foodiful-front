import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="w-[80%] mx-auto my-20 gap-y-4 flex flex-col justify-center items-center">
      <p className="text-4xl text-main">404 Not Found</p>
      <p className="text-4xl text-main">페이지를</p>
      <p className="text-4xl text-main">찾을 수 없습니다.</p>
      <Link
        href="/"
        className="text-3xl p-2 border-2 border-main rounded-lg hover:bg-main hover:text-white"
      >
        홈으로
      </Link>
    </div>
  )
}
