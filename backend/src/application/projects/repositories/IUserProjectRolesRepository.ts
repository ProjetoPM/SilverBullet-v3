import { UserProjectRole } from '../domain/user-project-role'

export interface IUserProjectRolesRepository {
  createMany(userProjectRoles: UserProjectRole[]): Promise<void>
  create(project: UserProjectRole): Promise<void>
}
