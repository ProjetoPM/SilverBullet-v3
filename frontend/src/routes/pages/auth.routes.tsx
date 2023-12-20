import { ComponentLayout } from '@/layout/ComponentLayout'
import { GuestGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const SignInPage = lazy(() =>
  import('@/pages/auth/sign-in/sign-in').then((m) => ({
    default: m.SignInPage
  }))
)
const SignUpPage = lazy(() =>
  import('@/pages/auth/sign-up/sign-up').then((m) => ({
    default: m.SignUpPage
  }))
)

export const AuthRoutes: RouteObject = {
  path: '/',
  element: (
    <GuestGuard>
      <ComponentLayout layout="auth" />
    </GuestGuard>
  ),
  children: [
    {
      path: '/',
      element: <SignInPage />
    },
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
