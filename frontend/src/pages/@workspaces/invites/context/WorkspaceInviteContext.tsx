import { TFunction } from 'i18next'
import { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

type WorkspaceInviteContextProps = {
  t: TFunction
  invites: [WorkspaceInvites[], (invites: WorkspaceInvites[]) => void]
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
  const { t } = useTranslation('workspaces')
  const invites = useState<WorkspaceInvites[]>([])
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
