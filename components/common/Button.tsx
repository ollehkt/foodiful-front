interface PropsType {
  title: string
  style?: string
  size?: string
  disabled?: boolean
  onClick?: () => void
  onClickWithEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({ title, style, size, disabled, onClick, onClickWithEvent }: PropsType) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClickWithEvent) onClickWithEvent(event)
    else onClick && onClick()
  }
  return (
    <button
      disabled={disabled}
      className={`rounded-md ${
        size === 'lg'
          ? 'w-[200px] h-[60px]'
          : size === 'md'
          ? 'w-[140px] h-[40px]'
          : size === 'sm'
          ? 'w-10'
          : 'w-[100px] h-[30px]'
      } hover:bg-active hover:text-white disabled:bg-disabled disabled:text-textDisabled ${style}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
