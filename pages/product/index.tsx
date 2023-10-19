import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { Button } from '../../components/common/Button'
import { useGetProducts } from '../../components/product/hooks/useProduct'
import { ProductReturnType, ProductType } from '../../types/productTypes'
import { getStoredUser } from '../../components/util/userStorage'
import ProductList from '../../components/product/ProductList'

export const getStaticProps = async () => {
  return { props: {} }
}
/**
 * TODO: getStaticPaths & getStaticProps로 id에 대한 파일 및 id 경로 만들어줘야함.
 */

function ProductPage() {
  const [user, setUser] = useState<User | null>(null)
  // const [products, setProducts] = useState([])
  const router = useRouter()

  const onClickAddBtn = () => {
    router.push('/product/add')
  }

  useEffect(() => {
    const getUser = getStoredUser()
    setUser(getUser)
  }, [])

  const {
    data: { data: products },
    isFetching,
  } = useGetProducts()
  console.log(products)

  return (
    <div>
      {/**
       * @Todo: role을 Admin으로 바꿔야함
       */}
      {user && user.role === 'PUBLIC' && (
        <Button style="text-xl" title="Add" onClick={onClickAddBtn} />
      )}
      <div className="bg-white">
        
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
