import { usePathname } from 'next/navigation'

export const useGetUrlParams = () => {
  const pathName = usePathname()
  return pathName
}
