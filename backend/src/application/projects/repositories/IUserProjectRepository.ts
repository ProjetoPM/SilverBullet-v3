import { UserProject } from '../domain/user-project'

export interface IUserProjectsRepository {
  create(project: UserProject): Promise<void>
}
