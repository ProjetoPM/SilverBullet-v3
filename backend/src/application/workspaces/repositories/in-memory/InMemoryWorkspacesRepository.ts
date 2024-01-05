import { User } from '@/application/users/domain/user'
import { Workspace } from '../../domain/workspace'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

type UserWorkspace = {
  userId?: string
  email: string
  workspaceId: string
  status: InviteStatuses
  role: WorkspaceRoles
}

export class InMemoryWorkspacesRepository implements IWorkspacesRepository {
  constructor(
    public workspaces: Workspace[] = [],
    public userWorkspaces: UserWorkspace[] = [],
  ) {}

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
      email: user.props.email,
      status,
      role,
    })
  }

  async update(workspace: Workspace): Promise<void> {
    const index = this.workspaces.findIndex(
      (workspaceItem) => workspaceItem.id === workspace.id,
    )

    this.workspaces[index] = workspace
  }

  async verifyUserBelongsToWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<boolean> {
    return this.userWorkspaces.some(
      (userWorkspace) =>
        userWorkspace.workspaceId === workspaceId &&
        userWorkspace.userId === userId,
    )
  }

  async exists(id: string): Promise<boolean> {
    return this.workspaces.some((workspace) => workspace.id === id)
  }

  async list(): Promise<Workspace[]> {
    return this.workspaces
  }

  async findById(id: string): Promise<Workspace | null> {
    return this.workspaces.find((workspace) => workspace.id === id) || null
  }

  async deleteMany(ids: string[]): Promise<void> {
    this.workspaces = this.workspaces.filter(
      (workspace) => !ids.includes(workspace.id),
    )
  }

  async checkUserPermission(
    userId: string,
    workspaceId: string,
    roles: WorkspaceRoles[],
  ): Promise<boolean> {
    const data = this.userWorkspaces.find(
      (userWorkspace) =>
        userWorkspace.userId === userId &&
        userWorkspace.workspaceId === workspaceId,
    )

    if (!data) return false

    return roles.includes(data.role)
  }

  async sendInvite(
    workspaceId: string,
    email: string,
    role: WorkspaceRoles,
    userId?: string | undefined,
  ): Promise<void> {
    this.userWorkspaces.push({
      workspaceId,
      userId,
      email,
      status: InviteStatuses.PENDING,
      role,
    })
  }
}
