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
      className={`${style} h-[60px] rounded-md ${
        size == 'lg' ? 'w-[200px]' : size == 'md' ? 'w-[140px]' : 'w-[100px]'
      } hover:bg-hover disabled:bg-disabled disabled:text-textDisabled`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
