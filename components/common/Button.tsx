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
          ? 'w-[200px] h-[60px] text-2xl'
          : size === 'md'
          ? 'w-[140px] h-[40px] text-2xl'
          : size === 'sm'
          ? 'w-10'
          : 'w-[100px] py-1 text-lg'
      } hover:bg-active hover:text-white disabled:bg-disabled disabled:text-textDisabled ${style} break-keep`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
