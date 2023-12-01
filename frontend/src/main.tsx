import '@smastrom/react-rating/style.css'
import './i18n'
import './index.css'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RouterProvider } from 'react-router-dom'
import { Loading } from './components/Loading'
import { ToasterContainer } from './components/toast/Toaster'
import { ThemeProvider } from './contexts/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export const App = () => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <Suspense fallback={<Loading />}>
          <ThemeProvider defaultTheme="dark">
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </Suspense>
      </HelmetProvider>
      <ToasterContainer />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
