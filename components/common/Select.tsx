import { useAtom } from 'jotai'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import useToast from './hooks/useToast'

interface PropsType {
  options: { id: number; name: string; classDuration: number }[]
  selected: { id: number; name: string }
  setSelected: Dispatch<SetStateAction<{ id: number; name: string; classDuration: number }>>
  isSelectedModalOpen: boolean
  setIsSelectedModalOpen: Dispatch<SetStateAction<boolean>>
}

const Select = ({
  options,
  selected,
  setSelected,
  isSelectedModalOpen,
  setIsSelectedModalOpen,
}: PropsType) => {
  const onSelectOption = (id: number, name: string, classDuration: number) => {
    setSelected({ ...selected, id, name, classDuration })
  }
  const { fireToast } = useToast()
  return (
    <div className="w-[200px] h-[40px] mt-[10px] border rounded-md z-[9999]">
      <div
        className="h-full flex justify-between items-center mx-[10px] text-main font-bold cursor-pointer hover:text-active"
        onClick={() => {
          fireToast({
            id: '클래스 선택 모달 오픈',
            position: 'bottom',
            timer: 3000,
            message: '아래로 스크롤 해서 모든 클래스를 보실 수 있습니다.',
            type: 'notice',
          })
          setIsSelectedModalOpen((prev) => !prev)
        }}
      >
        <div className="">{!selected.name ? '선택하기' : selected.name}</div>
        <Image
          className="relative"
          src="/arrowtobottom.png"
          alt="arrow-bottom"
          width={20}
          height={20}
        />
      </div>
      {isSelectedModalOpen && options && (
        <ul className="absolute top-20 shadow-basic w-[240px] h-[180px] bg-[white] rounded-md z-[9999] overflow-y-scroll">
          {options.map(({ name, id, classDuration }, idx) => (
            <li
              key={`${id}-${idx}`}
              value={name}
              className="py-2 m-3 border-b-[1px] border-main cursor-pointer text-lg font-semibold hover:text-active z-[99999]"
              onClick={() => onSelectOption(id, name, classDuration)}
            >
              <span className={`${selected.name === name && 'text-main font-bold'}`}>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
