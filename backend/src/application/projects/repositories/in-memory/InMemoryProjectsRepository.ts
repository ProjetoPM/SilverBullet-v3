import { Project } from '../../domain/project'
import { UserProject } from '../../domain/user-project'
import { UserProjectRole } from '../../domain/user-project-role'
import { IProjectsRepository } from '../IProjectsRepository'
import { IUserProjectsRepository } from '../IUserProjectRepository'
import { IUserProjectRolesRepository } from '../IUserProjectRolesRepository'

export class InMemoryProjectsRepository implements IProjectsRepository {
  constructor(
    public projects: Project[] = [],
    private userProjectsRepository: IUserProjectsRepository,
    private userProjectRolesRepository: IUserProjectRolesRepository,
  ) {}

  async create(
    project: Project,
    userProject: UserProject,
    userProjectRoles: UserProjectRole[],
  ): Promise<void> {
    this.projects.push(project)

    this.userProjectsRepository.create(userProject)

    this.userProjectRolesRepository.createMany(userProjectRoles)
  }

  async findById(id: string): Promise<Project | null> {
    const project = this.projects.find((project) => project.id === id)

    if (!project) return null

    return project
  }
}
