import { UserProjectRole } from '../domain/user-project-role'

export interface IUserProjectRolesRepository {
  create(project: UserProjectRole): Promise<void>
}
