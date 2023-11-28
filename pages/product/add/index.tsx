import React, { useEffect, useState } from 'react'
import { useAddProduct } from '../../../components/product/hooks/useProduct'
import ProductForm from '../../../components/product/ProductForm'
import { User } from '../../../components/auth/types/user'
import { getStoredUser } from '../../../components/util/userStorage'

function ProductAddPage() {
  const [user, setUser] = useState<User>()
  const { addProductMutate } = useAddProduct()

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) setUser(storedUser)
  }, [])

  return (
    <>
      <ProductForm onSubmitAdd={addProductMutate} />
    </>
  )
}

export default ProductAddPage
