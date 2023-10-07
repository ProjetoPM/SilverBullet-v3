import { UserWorkspace } from '../../domain/user-workspace'
import { IUserWorkspacesRepository } from '../IUserWorkspaceRepository'

export class InMemoryUserWorkspacesRepository
  implements IUserWorkspacesRepository
{
  constructor(public userWorkspaces: UserWorkspace[] = []) {}

  async create(workspace: UserWorkspace): Promise<void> {
    this.userWorkspaces.push(workspace)
  }
}
