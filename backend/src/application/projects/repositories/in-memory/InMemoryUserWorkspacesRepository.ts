import InviteStatuses from '../../domain/invite-statuses.enum'
import { UserWorkspace } from '../../domain/user-workspace'
import { IUserWorkspacesRepository } from '../IWorkspacesRepository'

export class InMemoryUserWorkspacesRepository
  implements IUserWorkspacesRepository
{
  constructor(public userWorkspaces: UserWorkspace[] = []) {}
  async verifyActiveWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<boolean> {
    const data = this.userWorkspaces.find(
      (userWorkspace) =>
        userWorkspace.props.userId == userId &&
        userWorkspace.props.workspaceId == workspaceId &&
        userWorkspace.props.status == InviteStatuses.ACTIVE,
    )

    return !!data
  }
}
