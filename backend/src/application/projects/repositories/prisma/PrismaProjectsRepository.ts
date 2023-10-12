import { prismaClient } from '@/infra/prisma/client'
import { Project } from '../../domain/project'
import { ProjectMapper } from '../../mappers/project-mapper'
import { IProjectsRepository } from '../IProjectsRepository'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { User } from '@/application/users/domain/user'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

export class PrismaProjectsRepository implements IProjectsRepository {
  async findById(id: string): Promise<Project | null> {
    const data = await prismaClient.project.findUnique({ where: { id } })

    if (!data) return null

    return ProjectMapper.toDomain(data)
  }

  async create(
    project: Project,
    user: User,
    status: InviteStatuses,
    roles: ProjectRoles[],
  ): Promise<void> {
    const persistenceProject = await ProjectMapper.toPersistence(project)

    await prismaClient.project.create({
      data: {
        ...persistenceProject,
        UserProject: {
          create: {
            user_id: user.id,
            status,
          },
        },
        UserProjectRole: {
          create: roles.map((role) => ({
            user_id: user.id,
            role,
          })),
        },
      },
    })
  }
}
