import { usePageLayout } from '@/layout/PageLayoutProvider'
import { TFunction } from 'i18next'
import { createContext, useContext, useState } from 'react'

type WorkspaceInviteContextProps = {
  t: TFunction
  invites: [Set<WorkspaceInvites>, (invites: Set<WorkspaceInvites>) => void]
  roles: [Set<WorkspaceRoles>, (role: Set<WorkspaceRoles>) => void]
  input: [string, (input: string) => void]
}

const WorkspaceInviteContext =
  createContext<WorkspaceInviteContextProps | null>(null)

export type WorkspaceRoles = 'STUDENT' | 'ADMIN'

export type WorkspaceInvites = {
  email: string
  role: string
}

type WorkspaceInviteProviderProps = {
  children: React.ReactNode
}

export const WorkspaceInviteProvider = ({
  children
}: WorkspaceInviteProviderProps) => {
  const { t } = usePageLayout()
  const invites = useState<Set<WorkspaceInvites>>(new Set())
  const roles = useState<Set<WorkspaceRoles>>(new Set(['STUDENT']))
  const input = useState('')

  return (
    <>
      <WorkspaceInviteContext.Provider value={{ t, invites, roles, input }}>
        {children}
      </WorkspaceInviteContext.Provider>
    </>
  )
}

export const useWorkspaceInvites = () => {
  const context = useContext(WorkspaceInviteContext)

  if (!context) {
    throw new Error(
      'useWorkspaceInvites must be used within a WorkspaceInviteProvider'
    )
  }

  return context
}
