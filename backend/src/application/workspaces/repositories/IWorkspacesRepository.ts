import { Workspace } from '../domain/workspace'
import { User } from '@/application/users/domain/user'
import { Roles } from '../domain/workspace-roles.schema'
import { InviteStatuses } from '../domain/invite-statuses.enum'

export interface IWorkspacesRepository {
  create(
    workspace: Workspace,
    user: User,
    status: InviteStatuses,
    role: Roles,
  ): Promise<void>
}
