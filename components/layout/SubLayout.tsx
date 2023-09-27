const SubLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[80%] mx-auto">{children}</div>
}

// 페이지에서 sub layout이 필요하다면 페이지에 함수로 호출 해서 사용.
// 부분적으로 필요하다면 Container 사용
export default SubLayout
