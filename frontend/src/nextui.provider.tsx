import { NextUIProvider as _NextUIProvider } from '@nextui-org/react'
import { Outlet } from 'react-router-dom'

export const NextUIProvider = () => {
  // FIXME
  // const navigate = useNavigate()

  return (
    <_NextUIProvider>
      <Outlet />
    </_NextUIProvider>
  )
}
