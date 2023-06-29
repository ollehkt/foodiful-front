interface PropsType {
  title: string
  style: string
  size?: string
  disabled?: boolean
  onClick: () => void
}

export const Button = ({ title, style, size, disabled, onClick }: PropsType) => {
  return (
    <button
      disabled={disabled}
      title={title}
      className={`${style} h-[40px] ${
        size == 'lg' ? 'w-[200px]' : size == 'md' ? 'w-[140px]' : 'w-[100px]'
      } disabled:bg-disabled disabled:text-textDisabled`}
      onClick={onClick}
    />
  )
}
