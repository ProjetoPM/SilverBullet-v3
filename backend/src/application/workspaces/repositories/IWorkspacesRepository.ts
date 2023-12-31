import { Workspace } from '../domain/workspace'
import { User } from '@/application/users/domain/user'
import { WorkspaceRoles } from '../domain/workspace-roles.schema'
import { InviteStatuses } from '../domain/invite-statuses.enum'
import { UserWorkspace } from '../domain/user-workspace.type'

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

  update(workspace: Workspace): Promise<void>
  exists(id: string): Promise<boolean>
  list(): Promise<Workspace[]>
  findById(id: string): Promise<Workspace | null>
  deleteMany(ids: string[]): Promise<void>
  sendInvite(
    workspaceId: string,
    email: string,
    role: WorkspaceRoles,
    userId?: string | null,
  ): Promise<void>
  checkUserPermission(
    userId: string,
    workspaceId: string,
    roles: WorkspaceRoles[],
  ): Promise<boolean>
  listInvites(userId: string): Promise<UserWorkspace[]>
}
