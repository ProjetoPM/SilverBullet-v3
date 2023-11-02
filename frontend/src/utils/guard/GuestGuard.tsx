import { useToken } from '@/hooks/useToken'
import { frontend } from '@/routes/routes'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type GuestGuardProps = {
  children: React.ReactNode
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const isMounted = useRef(false)
  const { token } = useToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (isMounted.current) {
      return
    }
    isMounted.current = true

    if (token) {
      navigate(frontend.workspaces.index)
    }
  }, [token, navigate])

  return <>{children}</>
}
