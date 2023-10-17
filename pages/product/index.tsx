import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../components/auth/types/user'
import { Button } from '../../components/common/Button'
import { useGetProducts } from '../../components/product/hooks/useProduct'
import { ProductReturnType, ProductType } from '../../types/productTypes'
import { getStoredUser } from '../../components/util/userStorage'

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
      product
      {/**
       * @Todo: role을 Admin으로 바꿔야함
       */}
      {user && user.role === 'PUBLIC' && (
        <Button style="text-xl" title="Add" onClick={onClickAddBtn} />
      )}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products &&
              products.map((product: ProductReturnType, idx: number) => (
                <Link
                  key={`${product.name}-${idx}`}
                  className="flex flex-col cursor-pointer"
                  href={`/product/${product.id}`}
                >
                  <Image
                    key={product.descImg[0]}
                    src={product.descImg[0]}
                    alt="상품 설명 사진"
                    width={300}
                    height={300}
                    className="rounded-md w-[300px] h-[300px] border-2 border-[gray]"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price.toLocaleString()}원
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
