import { ChangeEvent } from 'react'

interface PropsType {
  style?: string
  name?: string
  type: string
  minLength?: number
  maxLength?: number
  value: string | number
  placeholder: string
  setValue: (value: string | number) => void
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
}: PropsType) => {
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <label>
      {name}
      <input
        className={`${style} my-[20px] py-[4px] pl-[8px] border-2 border-main rounded-lg text-2xl`}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={(e) => changeInputHandler(e)}
      />
    </label>
  )
}
