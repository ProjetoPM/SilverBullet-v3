import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5 * 60, // 5 min
      cacheTime: 0, // No cache
      refetchInterval: 500 * 3600 // 30 min
    }
  }
})
