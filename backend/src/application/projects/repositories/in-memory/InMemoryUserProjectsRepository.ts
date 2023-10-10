import { UserProject } from '../../domain/user-project'
import { IUserProjectsRepository } from '../IUserProjectRepository'

export class InMemoryUserProjectsRepository implements IUserProjectsRepository {
  constructor(public userProjects: UserProject[] = []) {}

  async create(project: UserProject): Promise<void> {
    this.userProjects.push(project)
  }
}
