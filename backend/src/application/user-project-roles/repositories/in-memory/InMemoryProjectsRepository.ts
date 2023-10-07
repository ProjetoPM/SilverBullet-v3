import ROLES from '../../domain/roles.schema'
import { UserProjectRole } from '../../domain/user-project-role'
import { IUserProjectRolesRepository } from '../IUserProjectRolesRepository'

export class InMemoryProjectsRepository implements IUserProjectRolesRepository {
  constructor(public userProjectRoles: UserProjectRole[] = []) {}

  async create(project: UserProjectRole): Promise<void> {
    this.userProjectRoles.push(project)
  }

  async findByIdAndRole(
    id: string,
    role: ROLES,
  ): Promise<UserProjectRole | null> {
    const userProject = this.userProjectRoles.find(
      (userProjectRole) =>
        userProjectRole.props.userProjectId === id &&
        userProjectRole.props.role === role,
    )

    if (!userProject) return null

    return userProject
  }
}
