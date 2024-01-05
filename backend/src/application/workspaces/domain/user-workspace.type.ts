import { InviteStatuses, WorkspaceRoles } from '@prisma/client'

export type UserWorkspace = {
  userId: string | null
  workspaceId: string
  email: string
  status: InviteStatuses
  role: WorkspaceRoles
}
