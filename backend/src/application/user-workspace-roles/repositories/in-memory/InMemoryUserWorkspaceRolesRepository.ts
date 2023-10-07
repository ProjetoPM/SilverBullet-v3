import ROLES from '../../domain/roles.schema'
import { UserWorkspaceRole } from '../../domain/user-workspace-role'
import { IUserWorkspaceRolesRepository } from '../IUserWorkspaceRolesRepository'

export class InMemoryUserWorkspaceRolesRepository
  implements IUserWorkspaceRolesRepository
{
  constructor(public userWorkspaceRoles: UserWorkspaceRole[] = []) {}

  async create(workspace: UserWorkspaceRole): Promise<void> {
    this.userWorkspaceRoles.push(workspace)
  }

  async findByIdAndRole(
    id: string,
    role: ROLES,
  ): Promise<UserWorkspaceRole | null> {
    const userWorkspace = this.userWorkspaceRoles.find(
      (userWorkspaceRole) =>
        userWorkspaceRole.props.userWorkspaceId === id &&
        userWorkspaceRole.props.role === role,
    )

    if (!userWorkspace) return null

    return userWorkspace
  }
}
