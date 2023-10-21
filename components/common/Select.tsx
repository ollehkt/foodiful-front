import { useAtom } from 'jotai'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useToast from './hooks/useToast'

interface PropsType<T> {
  options: T[]
  selected: T
  setSelected: Dispatch<SetStateAction<T>>
  isSelectedModalOpen: boolean
  setIsSelectedModalOpen: Dispatch<SetStateAction<boolean>>
}

const Select = <T extends string | number>({
  options,
  selected,
  setSelected,
  isSelectedModalOpen,
  setIsSelectedModalOpen,
}: PropsType<T>) => {
  const onSelectOption = (option: T) => {
    setSelected(option)
  }

  const { fireToast } = useToast()
  return (
    <div className={`w-[200px] h-[36px]  mt-[10px] border rounded-md z-[9999]`}>
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
          setIsSelectedModalOpen((prev: boolean) => !prev)
        }}
      >
        <div className="">{!selected ? '선택하기' : selected}</div>
        <Image
          className="relative"
          src="/arrowtobottom.png"
          alt="arrow-bottom"
          width={20}
          height={20}
        />
      </div>
      {isSelectedModalOpen && options && (
        <ul
          className={`absolute top-20 shadow-basic w-[240px] ${
            options.length < 2 ? 'h-[120px]' : 'h-[180px]'
          }  bg-[white] rounded-md z-[9999] overflow-y-scroll`}
        >
          {options.map((option: T, idx) => (
            <li
              key={`${option}-${idx}`}
              value={option}
              className="py-2 m-3 border-b-[1px] border-main cursor-pointer text-lg font-semibold hover:text-active z-[99999]"
              onClick={() => onSelectOption(option)}
            >
              <span className={`${selected === option && 'text-main font-bold'}`}>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
