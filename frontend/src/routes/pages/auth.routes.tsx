import { ComponentLayout } from '@/layout/ComponentLayout'
import { GuestGuard } from '@/utils/guard'
import { frontend } from '@routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const SignInPage = lazy(() => import('@/pages/auth/sign-in/sign-in'))
const SignUpPage = lazy(() => import('@/pages/auth/sign-up/sign-up'))

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
