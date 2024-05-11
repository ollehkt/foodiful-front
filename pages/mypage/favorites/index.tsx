import StrongTitle from '../../../components/common/StrongTitle'
import ProductItem from '../../../components/product/ProductItem'
import { getMyPageLayout } from '../getMyPageLayout'
import { useGetFavoriteProducts } from '../../../components/common/favorite/hooks/useFavorite'

const MyPageFavorites = () => {
  const { data: favoriteProducts } = useGetFavoriteProducts()
  // const {data: favoriteLectures} =

  return (
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="좋아하는 상품" style="border-b-2 border-main pb-2" />
      <div className="w-full my-12 py-2">
        {!favoriteProducts.length ? (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 상품이 없습니다.
          </div>
        ) : (
          <div className="grid justify-center md:justify-start md:grid-cols-3 2xl:md-grid-cols-4 my-12 items-center gap-y-2">
            {favoriteProducts.slice(0, 4).map((product) => (
              <ProductItem key={product.id} product={product} mini={true} />
            ))}
          </div>
        )}
      </div>
      <StrongTitle title="좋아하는 상품" style="border-b-2 border-main pb-2" />
      <div className="w-full my-12 py-2">
        {!favoriteProducts.length ? (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 상품이 없습니다.
          </div>
        ) : (
          <div className="grid justify-center md:justify-start md:grid-cols-3 2xl:md-grid-cols-4 my-12 items-center gap-y-2">
            {favoriteProducts.slice(0, 4).map((product) => (
              <ProductItem key={product.id} product={product} mini={true} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

MyPageFavorites.getLayout = getMyPageLayout

export default MyPageFavorites
