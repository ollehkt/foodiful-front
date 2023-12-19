import { atom } from 'jotai'
import { CartReturnType } from '../components/cart/cartTypes'

export const cartProductState = atom<CartReturnType[]>([])
