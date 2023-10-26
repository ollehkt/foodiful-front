import React from 'react'

import { useAddProduct } from '../../../components/product/hooks/useProduct'

import ProductForm from '../../../components/product/ProductForm'
import { api } from '../../../components/axios/axiosInstance'
import { ProductType } from '../../../types/productTypes'
import useToast from '../../../components/common/hooks/useToast'

function ProductAddPage() {
  const { fireToast } = useToast()
  const addProduct = async (product: ProductType, id?: number) => {
    try {
      const {
        data: { data },
      } = await api.post('/product', {
        ...product,
      })
      console.log(data)
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

  // const { getUser } = useUser()
  // const router = useRouter()

  // const setPresignedUrl = async () => {
  //   if (files) {
  //     const urls = await getPresignedUrlByFiles(files, 'product')
  //     if (urls) setProduct({ ...product, descImg: [...product.descImg, ...urls] })
  //   }
  // }

  // const { addProductMutate, isLoading: isAddProductLoading } = useAddProduct()

  // const [product, setProduct] = useState<ProductType>({
  //   name: '',
  //   subTitle: '',
  //   description: '',
  //   price: 0,
  //   discount: 0,
  //   quantity: 0,
  //   descImg: [],
  //   categories: [],
  //   deliver: deliverState,
  // })

  // const onSelectCategory = (clickedTitle: string) => {
  //   const updateOption = category.map((category) =>
  //     category.title === clickedTitle
  //       ? { ...category, isClicked: category.isClicked ? false : true }
  //       : category
  //   )
  //   setCategory(updateOption)
  // }

  // useEffect(() => {
  //   setProduct({
  //     ...product,
  //     categories: category
  //       .filter((category) => {
  //         return category.isClicked === true
  //       })
  //       .map((category) => category.title),
  //   })
  // }, [category])

  // useEffect(() => {
  //   const storedUser = getStoredUser()
  //   ;(async () => {
  //     const fetchedUserData = await getUser(storedUser)
  //     if (fetchedUserData && fetchedUserData.role !== 'ADMIN') {
  //       alert('접근 불가능 합니다.')
  //       router.push('/')
  //     }
  //   })()
  // }, [])

  // const onChangeProductOption = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.target
  //   setProduct({ ...product, [name]: value })
  // }

  // console.log(imagesSrc)
  // useEffect(() => {
  //   const getPresignedUrls = async () => {
  //     if (files) {
  //       const urls = await getPresignedUrlByFiles(files, 'product')
  //       if (urls) setProduct({ ...product, descImg: [...product.descImg, ...urls] })
  //     }
  //   }
  //   getPresignedUrls()
  // }, [files])

  return (
    <>
      <ProductForm onSubmit={addProduct} />
    </>
  )
}

export default ProductAddPage
