import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5 min
      refetchInterval: 25 * 1000 * 60, // 15 min
      gcTime: 0
    }
  }
})
