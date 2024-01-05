import { ComponentLayout } from '@/layout/ComponentLayout'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Error404 = lazy(() => import('@/layout/errors/Error404'))

export const ErrorRoutes: RouteObject = {
  path: '/',
  element: <ComponentLayout layout="blank" />,
  children: [
    {
      path: '*',
      element: <Error404 />
    }
  ]
}
