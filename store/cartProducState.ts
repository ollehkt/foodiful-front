import { atom } from 'jotai'

export const cartProductState = atom<{ cartId: number; productId: number }[]>([])
