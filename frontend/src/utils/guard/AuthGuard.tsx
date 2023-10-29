import { frontend } from '@/routes/routes'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isMounted = useRef(false)
  const { t } = useTranslation('errors')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (isMounted.current) {
      return
    }
    isMounted.current = true

    if (!token) {
      navigate(frontend.auth.sign_in.index)
    }
  }, [token, navigate, t])

  return <>{children}</>
}
