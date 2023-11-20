import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useValidate } from '../auth/hooks/useValidate'

interface PropsType {
  style?: string
  labelStyle?: string
  labelName?: string
  name: string
  type: string
  minLength?: number
  maxLength?: number
  value: string | number
  placeholder: string
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  errorText?: string
  isDisabled?: boolean
  validate?: (value: string) => boolean
}

export const Input = ({
  style,
  labelStyle,
  labelName,
  name,
  type,
  minLength,
  maxLength,
  value,
  onChangeInput,
  placeholder,
  errorText,
  isDisabled,
  validate,
}: PropsType) => {
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
  }, [value, validate])
  return (
    <label className={`${labelStyle}`}>
      {labelName}
      <input
        onBlur={() => {
          setIsBlur(true)
          setIsFocus(false)
        }}
        onFocus={() => {
          setIsBlur(false)
          setIsFocus(true)
        }}
        className={`text-lg ${style} ${isFocus ? 'border-main' : 'border-primary'} `}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        name={name}
        disabled={isDisabled}
        onChange={(e) => onChangeInput(e)}
      />
      {isBlur && !isValid ? (
        <div className="text-[#f00] text-lg absolute right-0 text-center">{errorText}</div>
      ) : null}
    </label>
  )
}
