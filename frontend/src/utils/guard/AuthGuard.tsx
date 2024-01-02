import { useAuth } from '@/hooks/useAuth'
import { useToken } from '@/hooks/useToken'
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AG_EXPIRED_TOKEN_ID = 'guard:token-expired'

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isMounted, setMounted] = useState(false)
  const { t } = useTranslation('errors')
  const { isExpired } = useToken()
  const { signOut } = useAuth()

  useUpdateEffect(() => {
    if (isExpired()) {
      toast.error(t('token_expired'), {
        id: AG_EXPIRED_TOKEN_ID,
        duration: Infinity
      })
      signOut()
    }
    setMounted(true)
  }, [isExpired, signOut, t])

  return <>{isMounted && children}</>
}
