import { useAuth } from '@/hooks/useAuth'
import { useToken } from '@/hooks/useToken'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isMounted, setMounted] = useState(false)
  const { t } = useTranslation('errors')
  const { isExpired } = useToken()
  const { signOut } = useAuth()

  useEffect(() => {
    if (isExpired()) {
      toast.error(t('token_expired'), {
        id: 'guard:token-expired',
        duration: Infinity
      })
      signOut()
    }
    setMounted(true)
  }, [t, isExpired, signOut])

  return <>{isMounted && children}</>
}
