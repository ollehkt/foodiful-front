export const ProductSkeleton = ({ count }: { count: number }) => {
  const arr = new Array(count).fill(0)
  return (
    <>
      {arr &&
        arr.map((_, idx) => (
          <div
            key={idx}
            className="my-[40px] mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4"
          >
            <div className="w-[250px]">
              <div className="xs:h-[200px] xs:w-[200px] w-[250px] h-[250px] rounded-md bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="mt-4 h-2 w-56 rounded-lg bg-gray-200 dark:bg-gray-700"></h1>
              <p className="mt-4 h-2 w-24 rounded-lg bg-gray-200 dark:bg-gray-700"></p>
            </div>
          </div>
        ))}
    </>
  )
}
