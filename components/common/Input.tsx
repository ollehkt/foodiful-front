import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useValidate } from '../auth/hooks/useValidate'

interface PropsType {
  style?: string
  name?: string
  type: string
  minLength?: number
  maxLength?: number
  value: string | number
  placeholder: string
  setValue: (value: number | string) => void
  errorText?: string
  isPhoneInputDisabled?: boolean
  validate?: (value: string) => boolean
}

export const Input = ({
  style,
  name,
  type,
  minLength,
  maxLength,
  value,
  setValue,
  placeholder,
  errorText,
  isPhoneInputDisabled,
  validate,
}: PropsType) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const [isValid, setIsValid] = useState(false)
  const [isBlur, setIsBlur] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    if (minLength && maxLength) {
      if (String(value).length >= minLength && String(value).length <= maxLength) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }
  }, [minLength, maxLength, value])

  useEffect(() => {
    if (validate && validate(value as string)) setIsValid(true)
    else if (validate && !validate(value as string)) {
      setIsValid(false)
    }
  }, [value])
  return (
    <label className={`my-[30px] relative text-2xl ${isFocus ? 'text-main' : 'text-[#d596f0]'}`}>
      {name}
      <input
        onBlur={() => {
          setIsBlur(true)
          setIsFocus(false)
        }}
        onFocus={() => {
          setIsBlur(false)
          setIsFocus(true)
        }}
        className={`${style}  outline-none py-[4px] pl-[8px] border-b-2 ${
          isFocus ? 'border-main' : 'border-[#d596f0]'
        } text-2xl`}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        disabled={isPhoneInputDisabled}
        onChange={(e) => onChangeInput(e)}
      />
      {isBlur && !isValid ? (
        <div className="text-[#f00] text-lg absolute right-0">{errorText}</div>
      ) : null}
    </label>
  )
}
