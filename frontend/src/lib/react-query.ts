import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 1 * 60, // 1 min
      cacheTime: 500 * 3600, // 30 min
      refetchInterval: 500 * 3600 // 30 min,
    }
  }
})
