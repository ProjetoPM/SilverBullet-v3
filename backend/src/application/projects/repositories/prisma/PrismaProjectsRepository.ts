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

  async listUserProjectsByWorkspaceId(
    workspaceId: string,
    userId: string,
  ): Promise<Project[]> {
    const userProjectIds = await prismaClient.userProject
      .findMany({
        where: {
          user_id: userId,
          status: 'ACTIVE',
        },
        select: {
          project_id: true,
        },
      })
      .then((userProjects) =>
        userProjects.map((userProject) => userProject.project_id),
      )

    const projects = await prismaClient.project.findMany({
      where: {
        id: {
          in: userProjectIds,
        },
        workspace_id: workspaceId,
      },
    })

    return projects.map(ProjectMapper.toDomain)
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

  async verifyUserBelongsToProject(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const data = await prismaClient.userProject.findFirst({
      where: {
        project_id: projectId,
        user_id: userId,
      },
    })

    return !!data
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.project.deleteMany({ where: { id: { in: ids } } })
  }

  async checkUserPermission(
    userId: string,
    projectId: string,
    roles: ProjectRoles[],
  ): Promise<boolean> {
    const data = await prismaClient.userProjectRole.findMany({
      where: {
        user_id: userId,
        project_id: projectId,
        role: { in: roles },
      },
    })

    return !!data.some((item) => roles.includes(item.role as ProjectRoles))
  }
}
