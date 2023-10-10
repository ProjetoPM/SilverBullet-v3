import { Project } from '../domain/project'
import { UserProject } from '../domain/user-project'
import { UserProjectRole } from '../domain/user-project-role'

export interface IProjectsRepository {
  create(
    project: Project,
    userProject: UserProject,
    userProjectRoles: UserProjectRole[],
  ): Promise<void>

  findById(id: string): Promise<Project | null>
}
