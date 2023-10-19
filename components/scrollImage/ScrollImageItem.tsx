import Image from 'next/image'
import Link from 'next/link'

interface PropsType {
  src: string
  name: string
  categories: string[]
  price: number
  discount: number
  id: number
}

const ScrollImageItem = ({ src, name, categories, price, discount, id }: PropsType) => {
  return (
    <Link
      href={`/product/${id}`}
      className="flex-col border-[white] shadow-md rounded-md cursor-pointer overflow-hidden"
    >
      <div className="my-[10px] h-[250px] relative hover:scale-105">
        <Image
          src={src}
          alt="image"
          layout="fill"
          objectFit="contain" /**cover 쓸지 contain 쓸지 or 사진 사이즈를 지정해서 사진이 깨지지 않게 할지? */
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg">{name}</div>
          <div>
            {categories.map((category, idx) => (
              <span className="text-[14px] border rounded-md p-1 mx-1" key={`${category}-${idx}`}>
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="text-md line-through">{price.toLocaleString()}</div>
        <div className="text-md">{(price - Math.floor(price / discount)).toLocaleString()}</div>
      </div>
    </Link>
  )
}

export default ScrollImageItem
