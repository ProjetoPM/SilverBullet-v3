import { useAuth } from '@/hooks/useAuth'
import { useToken } from '@/hooks/useToken'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { t } = useTranslation('errors')
  const { isExpired } = useToken()
  const { signOut } = useAuth()

  useEffect(() => {
    if (isExpired()) {
      toast.error(t('token_expired'), {
        id: 'token_expired',
        duration: Infinity
      })
      signOut()
    }
  }, [t, isExpired, signOut])

  return <>{children}</>
}
