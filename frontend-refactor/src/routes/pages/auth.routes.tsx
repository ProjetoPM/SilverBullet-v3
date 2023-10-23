import { ComponentLayout } from '@/layout/ComponentLayout'
import { SignInPage } from '@/pages/auth/sign-in/sign-in'
import { SignUpPage } from '@/pages/auth/sign-up/sign-up'
import { GuestGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { RouteObject } from 'react-router-dom'

export const AuthRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <ComponentLayout layout="auth" />
        </GuestGuard>
      ),
      children: [
        {
          path: frontend.auth.sign_in.index,
          element: <SignInPage />
        },
        {
          path: frontend.auth.sign_up.index,
          element: <SignUpPage />
        }
      ]
    }
  ]
}
