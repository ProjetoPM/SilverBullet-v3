import { User } from '@/application/users/domain/user'
import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

type UserWorkspace = {
  userId: string
  workspaceId: string
  status: InviteStatuses
  role: WorkspaceRoles
}

export class InMemoryWorkspacesRepository implements IWorkspacesRepository {
  constructor(
    public workspaces: Workspace[] = [],
    public userWorkspaces: UserWorkspace[] = [],
  ) {}

  async findById(id: string): Promise<Workspace | null> {
    const workspace = this.workspaces.find((workspace) => workspace.id === id)

    if (!workspace) return null

    return workspace
  }

  async create(
    workspace: Workspace,
    user: User,
    status: InviteStatuses,
    role: WorkspaceRoles,
  ): Promise<void> {
    this.workspaces.push(workspace)
    this.userWorkspaces.push({
      workspaceId: workspace.id,
      userId: user.id,
      status,
      role,
    })
  }
}
