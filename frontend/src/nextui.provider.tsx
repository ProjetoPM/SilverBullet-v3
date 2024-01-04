import { NextUIProvider as _NextUIProvider } from '@nextui-org/react'
import { Outlet, useNavigate } from 'react-router-dom'

export const NextUIProvider = () => {
  const navigate = useNavigate()

  return (
    <_NextUIProvider navigate={navigate}>
      <Outlet />
    </_NextUIProvider>
  )
}
