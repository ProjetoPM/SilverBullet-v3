import { UserProjectRole } from '../../domain/user-project-role'
import { IUserProjectRolesRepository } from '../IUserProjectRolesRepository'

export class InMemoryUserProjectRolesRepository
  implements IUserProjectRolesRepository
{
  constructor(public userProjectRoles: UserProjectRole[] = []) {}

  async create(project: UserProjectRole): Promise<void> {
    this.userProjectRoles.push(project)
  }

  async createMany(userProjectRoles: UserProjectRole[]): Promise<void> {
    await Promise.all(
      userProjectRoles.map((userProjectRole) => {
        this.create(userProjectRole)
      }),
    )
  }
}
