import { UserWorkspaceRole } from '../../domain/user-workspace-role'
import { IUserWorkspaceRolesRepository } from '../IUserWorkspaceRolesRepository'

export class InMemoryUserWorkspaceRolesRepository
  implements IUserWorkspaceRolesRepository
{
  constructor(public userWorkspaceRoles: UserWorkspaceRole[] = []) {}

  async create(workspace: UserWorkspaceRole): Promise<void> {
    this.userWorkspaceRoles.push(workspace)
  }
}
