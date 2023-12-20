import React from 'react'
interface PropsType {
  title: string
}
function TitleAndLine({ title }: PropsType) {
  return <div className="border-b-[1px] border-main ">{title}</div>
}

export default TitleAndLine
