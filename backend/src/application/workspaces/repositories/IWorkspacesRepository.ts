import { Workspace } from '../domain/workspace'
import { User } from '@/application/users/domain/user'
import { WorkspaceRoles } from '../domain/workspace-roles.schema'
import { InviteStatuses } from '../domain/invite-statuses.enum'

export interface IWorkspacesRepository {
  create(
    workspace: Workspace,
    user: User,
    status: InviteStatuses,
    role: WorkspaceRoles,
  ): Promise<void>

  verifyUserBelongsToWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<boolean>
  exists(id: string): Promise<boolean>
}
