import { User } from '@/application/users/domain/user'
import { Project } from '../domain/project'
import { ProjectRoles } from '../domain/project-roles.schema'

export interface IProjectsRepository {
  create(project: Project, user: User, roles: ProjectRoles[]): Promise<void>
  findById(id: string): Promise<Project | null>
}
