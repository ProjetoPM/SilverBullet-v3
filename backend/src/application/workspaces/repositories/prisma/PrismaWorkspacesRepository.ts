import { User } from '@/application/users/domain/user'
import { prismaClient } from '@/infra/prisma/client'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { Workspace } from '../../domain/workspace'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { WorkspaceMapper } from '../../mappers/workspace-mapper'
import { IWorkspacesRepository } from '../IWorkspacesRepository'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
  async create(
    workspace: Workspace,
    user: User,
    status: InviteStatuses,
    role: WorkspaceRoles,
  ): Promise<void> {
    const data = await WorkspaceMapper.toPersistence(workspace)

    await prismaClient.workspace.create({
      data: {
        ...data,
        UserWorkspace: {
          create: {
            user: { connect: { id: user.id } },
            status,
            role,
          },
        },
      },
    })
  }

  async update(workspace: Workspace): Promise<void> {
    const data = await WorkspaceMapper.toPersistence(workspace)

    await prismaClient.workspace
      .update({
        where: { id: workspace.id },
        data,
      })
      .catch(() => {
        throw new Error('Error on update workspace')
      })
  }

  async verifyUserBelongsToWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<boolean> {
    const data = await prismaClient.userWorkspace.findFirst({
      where: {
        user_id: userId,
        workspace_id: workspaceId,
      },
    })

    return !!data
  }

  async exists(id: string): Promise<boolean> {
    const data = await prismaClient.workspace.findUnique({ where: { id } })
    return !!data
  }

  async list(): Promise<Workspace[]> {
    const data = await prismaClient.workspace.findMany({
      orderBy: { created_at: 'desc' },
    })
    return data.map(WorkspaceMapper.toDomain)
  }

  async findById(id: string): Promise<Workspace | null> {
    const data = await prismaClient.workspace.findUnique({ where: { id } })
    return data ? WorkspaceMapper.toDomain(data) : null
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.workspace.deleteMany({ where: { id: { in: ids } } })
  }
}
