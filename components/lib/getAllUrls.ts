const urlPaths = [
  { path: 'introduce', urls: ['foodiful', 'admin'] },
  { path: 'product', urls: ['dasik', 'windtteok', 'ricegangjeong', 'gotgam', 'hodu'] },
  { path: 'class', urls: ['ricegangjeong', 'dasik', 'hodu', 'gotgam'] },
]

const getAllUrls = (path: string): { path: string; urls: string[] } => {
  return urlPaths.filter((data) => data.path === path)[0]
}

export default getAllUrls
