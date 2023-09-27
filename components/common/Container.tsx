import React from 'react'

interface PropsType {
  style?: string
  children: React.ReactNode
}

const Container = ({ style, children }: PropsType) => {
  return <div className={`w-[80%] mx-auto ${style}`}>{children}</div>
}

export default Container
