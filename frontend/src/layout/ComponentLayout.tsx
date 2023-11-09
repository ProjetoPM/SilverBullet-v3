import { Outlet } from 'react-router-dom'
import { AuthWrapper } from './auth/AuthWrapper'
import { Sidebar } from './main/Sidebar'
import { Header } from './main/header/Header'

type ComponentLayoutProps = {
  layout?: 'blank' | 'simple' | 'auth'
}

export const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {layout === 'auth' && (
        <>
          <AuthWrapper>
            <div className="flex justify-center items-center">
              <main className="w-full m-2 max-w-md py-6">
                <Outlet />
              </main>
            </div>
          </AuthWrapper>
        </>
      )}

      {layout === 'simple' && (
        <div className="flex flex-col">
          <Header />
          <main className="h-full w-full max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[245px,1fr] min-h-[calc(100vh-4.25rem)]">
              <div className="hidden lg:flex">
                <Sidebar />
              </div>
              <div className="px-5 pb-10">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}
