import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { isTokenExpired } from '../parse-jwt'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isMounted = useRef(false)
  const { t } = useTranslation('errors')
  const token = localStorage.getItem('token')
  const { signOut } = useAuth()

  useEffect(() => {
    if (isMounted.current) {
      return
    }
    isMounted.current = true

    if (!token) {
      signOut()
    }

    if (isTokenExpired(token)) {
      toast.error(t('token_expired'))
      signOut()
    }
  }, [t, token, signOut])

  return <>{children}</>
}
