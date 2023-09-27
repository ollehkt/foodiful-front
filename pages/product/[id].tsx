'use client'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CustomSlider from '../../components/common/SubSlider'
import {
  getProductById,
  getProducts,
  useGetProductById,
} from '../../components/product/hooks/useProduct'
import { ProductReturnType, ProductType } from '../../components/util/types/productTypes'

function ProductDetailPage({ product }: { product: ProductType }) {
  const router = useRouter()
  console.log(product)
  /**
 *   name: string
  description: string
  price: number
  discount: number
  descImg: string[]
  categories: CategoryType[] | string[]
  deliver: boolean
 */

  return (
    <div className="mt-8 flex flex-col items-center xl:w-[1080px] mx-auto">
      <div className="font-bold text-2xl">상품 상세</div>
      <div className="flex border-[1px] border-gray900/20 rounded-md w-full">
        <CustomSlider items={product.descImg} btn slidePx={100} btnSize={20} />

        <div className="ml-[20px] w-full">
          <div className="font-semibold text-xl">{product.name}</div>
        </div>
      </div>
      <div onClick={() => router.back()}>뒤로</div>
      {/* <div>{product.name}</div> */}
    </div>
  )
}

/**
 * @Todo: 어차피 만들어져있는 상품이니 getStaticPath 및 getStaticProps 만들어보기
 */

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const productId = params.id
  const { data: product } = await getProductById(productId)
  return {
    props: { product },
  }
}

// export const getStaticPaths = async () => {
//   const products = await getProducts()
//   const paths = products.map((product: ProductReturnType) => ({
//     params: {
//       id: product.id.toString(),
//     },
//   }))
//   return { paths, fallback: false }
// }

export default ProductDetailPage
