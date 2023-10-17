import React from 'react'
import ChannelContent from './ChannelContent'
import ChannelHeader from './ChannelHeader'
import ChannelSns from './ChannelSns'

const ChannelContainer = () => {
  return (
    <div className="absolute top-[-500px] xs:w-[100px] w-[390px] h-[500px] rounded-3xl shadow-xl bg-[#eee]  overflow-hidden">
      <ChannelHeader />
      <ChannelContent />
      <ChannelSns />
    </div>
  )
}

export default ChannelContainer
