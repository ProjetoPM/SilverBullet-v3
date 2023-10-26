import { User } from '@/application/users/domain/user'
import { Project } from '../domain/project'
import { ProjectRoles } from '../domain/project-roles.schema'
import { InviteStatuses } from '../domain/invite-statuses.enum'

export interface IProjectsRepository {
  create(
    project: Project,
    user: User,
    status: InviteStatuses,
    roles: ProjectRoles[],
  ): Promise<void>
  update(project: Project): Promise<void>
  findById(id: string): Promise<Project | null>
  findByName(name: string): Promise<Project | null>
  existsByNameAndId(
    name: string,
    workspaceId: string,
    projectId: string,
  ): Promise<boolean>
}
