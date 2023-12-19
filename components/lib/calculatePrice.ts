export const calculatePrice = (price: number, discount: number) => {
  return price - price * (discount / 100)
}
