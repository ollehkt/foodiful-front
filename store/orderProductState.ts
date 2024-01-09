import { atom } from 'jotai'
import { OrderProductTypes } from '../components/order/types/orderProductTypes'

export const orderProductState = atom<OrderProductTypes[]>([])
