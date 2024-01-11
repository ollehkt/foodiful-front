import { atom } from 'jotai'
import { PostOrderProductTypes } from '../components/order/types/postOrderProductTypes'

export const postOrderProductState = atom<PostOrderProductTypes[]>([])
