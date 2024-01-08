import { useMutation } from '@tanstack/react-query'
import { api } from '../../axios/axiosInstance'
import useToast from '../../common/hooks/useToast'
import { getStoredUser } from '../../util/userStorage'
import { OrderPostType } from '../types/orderFormTypes'
import { OrderProductTypes } from '../types/orderProductTypes'

/**
  orderForm
    deliverAddress:"부산 수영구 광안로 12"
    deliverName:"전민지"
    deliverPhone:"01054710182"
    deliverPostalCode:"48298"
    deliverSpecificAddress:"105-501"
    requirement:"잘 부탁드려요~!"
    totalPrice:208000
  orderProduct
    product: {}
    quantity: 1
    additionalCount: 1
 */

const postOrder = ({
  orderForm,
  orderProduct,
}: {
  orderForm: OrderPostType
  orderProduct: OrderProductTypes[]
}) => {
  const user = getStoredUser()
  return api.post(
    '/order',
    {
      orderForm: { ...orderForm, quantity: orderProduct.length },
      orderProduct,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )
}

export const usePostOrder = () => {
  const { fireToast } = useToast()
  const { mutate } = useMutation({
    mutationFn: ({
      orderForm,
      orderProduct,
    }: {
      orderForm: OrderPostType
      orderProduct: OrderProductTypes[]
    }) => postOrder({ orderForm, orderProduct }),
    onSuccess: () => {},
  })
  return { mutate }
}
