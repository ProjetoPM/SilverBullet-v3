import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Error404 = lazy(() =>
  import('@/layout/errors/Error404').then((m) => ({
    default: m.Error404
  }))
)

export const ErrorRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '*',
      element: <Error404 />
    }
  ]
}
