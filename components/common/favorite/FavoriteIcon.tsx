import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isMobileDisplay } from '../../../store/isMobileDisplay'
import { User } from '../../auth/types/user'
import { getStoredUser } from '../../util/userStorage'
import useToast from '../hooks/useToast'
import {
  useAddFavoriteLecture,
  useAddFavoriteProduct,
  useDeleteFavoriteLecture,
  useDeleteFavoriteProduct,
} from './hooks/useFavorite'

interface PropsType {
  id: number
  isLiked?: boolean
  product?: boolean
  lecture?: boolean
}

const FavoriteIcon = ({ id, isLiked, product, lecture }: PropsType) => {
  const [onHeartAnimation, setOnHeartAnimation] = useState(false)
  const [user, setUser] = useState<User | null>(
    typeof window !== 'undefined' ? getStoredUser() : null
  )
  const router = useRouter()
  const { fireToast } = useToast()
  const isMobile = useAtomValue(isMobileDisplay)
  const { mutate: deleteFavoriteProduct } = useDeleteFavoriteProduct()
  const { mutate: addFavoriteProduct } = useAddFavoriteProduct()
  const { mutate: addFavoriteLecture } = useAddFavoriteLecture()
  const { mutate: deleteFavoriteLecture } = useDeleteFavoriteLecture()

  const onClickHeart = () => {
    if (!user) {
      fireToast({
        id: '로그인 후에 이용 가능',
        type: 'failed',
        message: '로그인 후에 이용 가능합니다',
        position: 'bottom',
        timer: 2000,
      })
      router.push('/auth')
      return
    }
    if (onHeartAnimation) {
      setOnHeartAnimation(false)
      product ? deleteFavoriteProduct(id) : lecture && deleteFavoriteLecture(id)
    } else {
      product ? addFavoriteProduct(id) : lecture && addFavoriteLecture(id)
      setOnHeartAnimation(true)
    }
  }

  useEffect(() => {
    if (isLiked) setOnHeartAnimation(true)
  }, [isLiked])
  return (
    <div
      className={`absolute right-0 cursor-pointer ${onHeartAnimation && 'animate-click'}`}
      onClick={onClickHeart}
    >
      <svg
        width={`${isMobile ? 20 : 28}`}
        height={`${isMobile ? 20 : 28}`}
        viewBox="0 0 18 15"
        fill={`${onHeartAnimation ? '#FF6C6C' : 'none'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.0021 13.878V13.878L8.99492 13.878C8.967 13.8782 8.93934 13.8728 8.9135 13.8623C8.88796 13.8519 8.8647 13.8365 8.84502 13.8172C8.84479 13.817 8.84457 13.8168 8.84434 13.8165L2.37342 7.33728C2.37309 7.33694 2.37275 7.33661 2.37242 7.33627C1.67596 6.63201 1.28532 5.68147 1.28532 4.69095C1.28532 3.70064 1.67579 2.7503 2.37197 2.04608C3.07393 1.34688 4.02435 0.954265 5.01518 0.954265C6.00652 0.954265 6.95741 1.34728 7.65947 2.04717C7.65959 2.04729 7.65971 2.04741 7.65983 2.04753L8.55921 2.94691L8.99851 3.38621L9.4378 2.94691L10.3372 2.04753C10.3374 2.04734 10.3376 2.04714 10.3378 2.04694C10.3378 2.04693 10.3378 2.04692 10.3378 2.04691C11.0398 1.34719 11.9906 0.954265 12.9818 0.954265C13.9726 0.954265 14.9231 1.34686 15.625 2.04604C16.3212 2.75027 16.7117 3.70062 16.7117 4.69095C16.7117 5.68147 16.3211 6.63202 15.6246 7.33629C15.6243 7.33662 15.6239 7.33695 15.6236 7.33728L9.15267 13.8165C9.15245 13.8168 9.15222 13.817 9.152 13.8172C9.13232 13.8365 9.10906 13.8519 9.08352 13.8623C9.05768 13.8728 9.03001 13.8782 9.0021 13.878Z"
          stroke={`${onHeartAnimation ? '#FF6C6C' : '#ababab'}`}
          strokeWidth="1.24252"
        />
      </svg>
    </div>
  )
}

export default FavoriteIcon
