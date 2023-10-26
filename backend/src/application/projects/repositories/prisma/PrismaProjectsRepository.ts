import { prismaClient } from '@/infra/prisma/client'
import { Project } from '../../domain/project'
import { ProjectMapper } from '../../mappers/project-mapper'
import { IProjectsRepository } from '../IProjectsRepository'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { User } from '@/application/users/domain/user'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

export class PrismaProjectsRepository implements IProjectsRepository {
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

  async update(project: Project): Promise<void> {
    const data = await ProjectMapper.toPersistence(project)

    await prismaClient.project
      .update({
        where: { id: project.id },
        data,
      })
      .catch(() => {
        throw new Error('Error on update project')
      })
  }

  async findByName(name: string): Promise<Project | null> {
    const data = await prismaClient.project.findFirst({ where: { name } })

    if (!data) return null

    return ProjectMapper.toDomain(data)
  }
  async findById(id: string): Promise<Project | null> {
    const data = await prismaClient.project.findUnique({ where: { id } })

    if (!data) return null

    return ProjectMapper.toDomain(data)
  }

  async existsByNameAndId(
    name: string,
    workspaceId: string,
    id: string,
  ): Promise<boolean> {
    const data = await prismaClient.project.findFirst({
      where: {
        name,
        workspace_id: workspaceId,
        NOT: {
          id,
        },
      },
    })

    return !!data
  }
}
