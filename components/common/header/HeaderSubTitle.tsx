import Link from 'next/link'
import { SubTitle } from '../../constants/headerTitle'

interface PropsType {
  subTitle: SubTitle[]
  activeIdx: number
  setActiveIdx: (p: number | null) => void
  pathName: string
}

const HeaderSubTitle = ({ subTitle, activeIdx, setActiveIdx, pathName }: PropsType) => {
  const onClickSubTitle = () => {
    setActiveIdx(null)
  }
  return (
    <ul
      className={`absolute top-[40px] ${
        activeIdx === 3 ? 'right-[-80px]' : 'left-0'
      }  w-[240px] p-[20px] flex flex-col  bg-[white] shadow-basic rounded-[10px]`}
    >
      {subTitle &&
        subTitle.map(({ title, url }) => (
          <Link
            key={`${title}-${url}`}
            className={`flex items-center w-[200px] h-[36px] hover:text-active hover:bg-[#eee] text-left ${
              pathName.includes(url) ? 'text-main bg-[#fafafa]' : ''
            }`}
            href={url}
            onClick={onClickSubTitle}
          >
            <span className="p-[6px] text-[16px] font-[500] leading-6">{title}</span>
          </Link>
        ))}
    </ul>
  )
}
export default HeaderSubTitle
