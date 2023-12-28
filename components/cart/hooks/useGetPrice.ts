import { CartReturnType } from '../cartTypes'

export const useGetPrice = () => {
  const getDiscountPrice = (price: number, discount: number) => {
    return price - price * (discount / 100)
  }

  const getTotalPrice = (selectedProduct: CartReturnType[]) => {
    return selectedProduct
      .map((selected) => {
        if (selected.product.discount)
          return (
            getDiscountPrice(selected.product.price, selected.product.discount) *
              selected.quantity +
            selected.additionalCount * 5000
          )
        else return selected.product.price * selected.quantity + selected.additionalCount * 5000
      })
      .reduce((acc, cur) => acc + cur, 0)
  }
  return { getDiscountPrice, getTotalPrice }
}
