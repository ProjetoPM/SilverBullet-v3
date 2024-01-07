import { usePageLayout } from '@/layout/PageLayoutProvider'
import { createContext, useState } from 'react'
import { InviteContextProps, Invites } from './@types'

export const InviteContext = createContext<InviteContextProps | null>(null)

type InviteProviderProps<R> = Pick<InviteContextProps<R>, 'roles'> & {
  children: React.ReactNode
}

export const InvitesProvider = <R,>({
  roles,
  children
}: InviteProviderProps<R>) => {
  const { t } = usePageLayout()
  const invites = useState<Set<Invites>>(new Set())
  const input = useState('')

  return (
    <>
      <InviteContext.Provider
        value={{
          t,
          invites,
          roles: roles as InviteContextProps['roles'],
          input
        }}
      >
        {children}
      </InviteContext.Provider>
    </>
  )
}
