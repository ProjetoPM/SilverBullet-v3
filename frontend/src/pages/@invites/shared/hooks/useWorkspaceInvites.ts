import { useContext } from 'react'
import { InviteContextProps } from '../provider/@types'
import { InviteContext } from '../provider/InvitesProvider'

export type WorkspaceRoles = 'ADMIN' | 'USER'

export const useWorkspaceInvites = () => {
  const context = useContext(
    InviteContext
  ) as InviteContextProps<WorkspaceRoles>

  if (!context) {
    throw new Error('useInvites must be used within a InviteProvider')
  }

  return context
}
