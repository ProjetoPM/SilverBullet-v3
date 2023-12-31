import '@smastrom/react-rating/style.css'
import './i18n'
import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Loading } from './components/Loading'
import { ThemeProvider } from './contexts/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'
import { ToastSonner } from './components/Toast/Sonner'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<Loading />}>
        <ThemeProvider defaultTheme="dark">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <ToastSonner />
        </ThemeProvider>
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
)
