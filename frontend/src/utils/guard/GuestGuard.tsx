import { useToken } from '@/hooks/useToken'
import { frontend } from '@/routes/routes'
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type GuestGuardProps = {
  children: React.ReactNode
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const [isMounted, setMounted] = useState(false)
  const { token } = useToken()
  const navigate = useNavigate()

  useUpdateEffect(() => {
    if (token) {
      navigate(frontend.workspaces.index)
    }
    setMounted(true)
  }, [navigate, token])

  return <>{isMounted && children}</>
}
