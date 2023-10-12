import { Workspace } from '@/application/workspaces/domain/workspace'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'

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
}
