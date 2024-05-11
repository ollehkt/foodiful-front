import { useGetFavoriteLectures } from '../../../../components/common/favorite/hooks/useFavorite'
import LectureItem from '../../../../components/lecture/LectureItem'
import { getMyPageLayout } from '../../getMyPageLayout'
import StrongTitle from '../../../../components/common/StrongTitle'

const MyPageFavoriteLectures = () => {
  const { data: favoriteLectures } = useGetFavoriteLectures()

  return (
    <section className="grow flex-col items-center px-5">
      <StrongTitle title="좋아하는 클래스" style="border-b-2 border-main pb-2" />
      <div className="w-full my-12 py-2">
        {!favoriteLectures.length ? (
          <div className="flex justify-center my-[50px] text-main text-xl font-bold">
            좋아요 누른 클래스가 없습니다.
          </div>
        ) : (
          <div className="grid justify-center md:justify-start md:grid-cols-3 2xl:md-grid-cols-4 my-12 items-center gap-y-2">
            {favoriteLectures.slice(0, 4).map((lecture) => (
              <LectureItem key={lecture.id} lecture={lecture} mini />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

MyPageFavoriteLectures.getLayout = getMyPageLayout

export default MyPageFavoriteLectures
