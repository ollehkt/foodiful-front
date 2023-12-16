import { useAtomValue } from 'jotai'
import React from 'react'
import { cartProductState } from '../../store/cartProducState'

const PurchasePage = () => {
  const cartProduct = useAtomValue(cartProductState)
  console.log(cartProduct)
  return <div>PurchasePage</div>
}

export default PurchasePage
