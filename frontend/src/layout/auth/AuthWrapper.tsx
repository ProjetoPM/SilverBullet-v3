import { AuthFooter } from './AuthFooter'
import { AuthHeader } from './AuthHeader'

type AuthWrapperProps = {
  children: React.ReactNode
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <div className="container grid h-screen grid-rows-[64px_1fr_64px] w-full">
      <AuthHeader />
      {children}
      <AuthFooter />
    </div>
  )
}

export default AuthWrapper
