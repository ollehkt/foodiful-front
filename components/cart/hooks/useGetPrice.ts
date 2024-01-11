import { PostOrderProductTypes } from '../../order/types/postOrderProductTypes'
import { CartReturnType } from '../cartTypes'

export const useGetPrice = () => {
  const getDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100)
  }

  const getTotalPrice = (selectedProduct: CartReturnType[] | PostOrderProductTypes[]) => {
    return selectedProduct
      .map((selected) => {
        if (selected.product.discount)
          return (
            getDiscountedPrice(selected.product.price, selected.product.discount) *
              selected.quantity +
            selected.additionalCount * 5000
          )
        else return selected.product.price * selected.quantity + selected.additionalCount * 5000
      })
      .reduce((acc, cur) => acc + cur, 0)
  }
  return { getDiscountedPrice, getTotalPrice }
}
