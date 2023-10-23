import { AuthFooter } from './AuthFooter'
import { AuthHeader } from './AuthHeader'

type AuthWrapperProps = {
  children: React.ReactNode
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <>
      <div className="h-full w-full">
        <div className="grid grid-rows-[68px,auto,68px] h-screen">
          <AuthHeader />
          {children}
          <AuthFooter />
        </div>
      </div>
    </>
  )
}
