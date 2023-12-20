import { ProductReturnType } from '../product/types/productTypes'
import ScrollImageItem from './ScrollImageItem'

const arr = ['/photo0.jpeg']

const ScrollImageLists = ({ products }: { products: ProductReturnType[] }) => {
  return (
    <div className="my-[80px] grid xl:grid-cols-4 sm:grid-cols-2 gap-8">
      {products &&
        products.map(({ categories, name, descImg, price, discount, id }: ProductReturnType) => (
          <ScrollImageItem
            key={`${id}-${descImg}`}
            id={id}
            name={name}
            src={descImg[0]}
            price={price}
            discount={discount}
            categories={categories as string[]}
          />
        ))}
    </div>
  )
}

export default ScrollImageLists
