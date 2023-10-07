import { UserProject } from '../../domain/user-project'
import { IUserProjectsRepository } from '../IUserProjectRepository'

export class InMemoryProjectsRepository implements IUserProjectsRepository {
  constructor(public userProjects: UserProject[] = []) {}

  async save(userProject: UserProject): Promise<void> {
    const projectIndex = this.userProjects.findIndex(
      (userProject) => userProject.id === userProject.id,
    )
    this.userProjects[projectIndex] = userProject
  }

  async create(project: UserProject): Promise<string | null> {
    this.userProjects.push(project)

    const dbProject = this.userProjects.pop()

    if (!dbProject) return null

    return dbProject.id
  }

  async findById(id: string): Promise<UserProject | null> {
    const userProject = this.userProjects.find(
      (userProject) => userProject.id === id,
    )

    if (!userProject) return null

    return userProject
  }
}
