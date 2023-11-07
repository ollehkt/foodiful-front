import React, { useEffect, useState } from 'react'

import { useAddProduct } from '../../../components/product/hooks/useProduct'

import ProductForm from '../../../components/product/ProductForm'
import { api } from '../../../components/axios/axiosInstance'
import { ProductType, PromiseProductType } from '../../../types/productTypes'
import useToast from '../../../components/common/hooks/useToast'
import { User } from '../../../components/auth/types/user'
import { getStoredUser } from '../../../components/util/userStorage'

function ProductAddPage() {
  const { fireToast } = useToast()
  const [user, setUser] = useState<User>()
  const addProduct = async (product: ProductType, id?: number) => {
    try {
      const { data } = await api.post<PromiseProductType>(
        '/product',
        {
          ...product,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      if (data)
        fireToast({
          id: '상품 추가 성공',
          type: 'success',
          position: 'bottom',
          message: '상품 등록에 성공했습니다.',
          timer: 2000,
        })
    } catch (error) {
      fireToast({
        id: '상품 추가 실패',
        type: 'failed',
        position: 'bottom',
        message: '상품 등록에 실패했습니다.',
        timer: 2000,
      })
    }
  }

  useEffect(() => {
    const user = getStoredUser()
    if (user) setUser(user)
  }, [])

  return (
    <>
      <ProductForm onSubmit={addProduct} />
    </>
  )
}

export default ProductAddPage
