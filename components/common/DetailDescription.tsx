import dynamic from 'next/dynamic'
import React from 'react'
const DynamicViewer = dynamic(() => import('./editor/ToastViewer'), {
  ssr: false,
})
const DetailDesc = ({ description }: { description: string }) => {
  return <DynamicViewer content={description} />
}

export default DetailDesc
