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
      className={`rounded-md ${
        size == 'lg'
          ? 'w-[200px] h-[60px]'
          : size == 'md'
          ? 'w-[140px] h-[40px]'
          : 'w-[100px] h-[30px]'
      } hover:bg-active hover:text-[white] disabled:bg-disabled disabled:text-textDisabled ${style}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
