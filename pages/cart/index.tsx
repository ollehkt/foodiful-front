import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import CartList from '../../components/cart/CartList'
import { useGetCartList } from '../../components/cart/hooks/useCart'
import Container from '../../components/common/Container'
import useToast from '../../components/common/hooks/useToast'
import StrongTitle from '../../components/common/StrongTitle'
import { getStoredUser } from '../../components/util/userStorage'

const CartPage = () => {
  const { fireToast } = useToast()
  const router = useRouter()

  const { data: cartLists, isFetching } = useGetCartList()
  useEffect(() => {
    const user = getStoredUser()
    if (!user) {
      fireToast({
        id: '장바구니 접속 실패',
        type: 'failed',
        message: '로그인 후에 이용해주세요.',
        timer: 1500,
        position: 'bottom',
      })
      router.push('/auth')
    }
  }, [])

  return (
    <Container>
      <div className="mt-[40px]">
        <StrongTitle title="장바구니" style="border-b-2 border-main pb-2" />
        {cartLists.length > 0 ? (
          <CartList cartLists={cartLists} />
        ) : (
          <div className="flex justify-center text-textDisabled text-3xl font-bold mt-[60px]">
            장바구니 내역이 없습니다.
            <Link href="/product" />
          </div>
        )}
      </div>
    </Container>
  )
}
export default CartPage
