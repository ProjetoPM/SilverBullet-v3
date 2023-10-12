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
  findById(id: string): Promise<Project | null>
}
