import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5 * 60, // 5 min
      refetchInterval: 250 * 3600 // 15 min
    }
  }
})
