import { QueryClient } from '@tanstack/react-query'

export const getQueryClient = () => {
  let queryClient
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        // queries: {
        //   refetchOnWindowFocus: false,
        // },
      },
    })
  }
  return queryClient
}
