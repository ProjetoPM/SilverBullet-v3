import { User } from '@/application/users/domain/user'
import { prismaClient } from '@/infra/prisma/client'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { Workspace } from '../../domain/workspace'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { WorkspaceMapper } from '../../mappers/workspace-mapper'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { UserWorkspace } from '../../domain/user-workspace.type'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
  async create(
    workspace: Workspace,
    user: User,
    status: InviteStatuses,
    role: WorkspaceRoles,
  ): Promise<void> {
    const data = await WorkspaceMapper.toPersistence(workspace)

    const { metrics, ...workspacePersistence } = data

    await prismaClient.workspace.create({
      data: {
        ...workspacePersistence,
        UserWorkspace: {
          create: {
            user: { connect: { id: user.id } },
            email: user.props.email,
            status,
            role,
          },
        },
      },
    })

    if (!metrics) return

    for (const metric of metrics) {
      await prismaClient.metric.create({
        data: {
          id: metric.id,
          name: metric.name,
          value: metric.value,
          workspace_id: workspace.id,
        },
      })
    }
  }

  async update(workspace: Workspace): Promise<void> {
    const data = await WorkspaceMapper.toPersistence(workspace)

    const { metrics, ...workspacePersistence } = data
    await prismaClient.workspace
      .update({
        where: { id: workspace.id },
        data: {
          ...workspacePersistence,
        },
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

  async checkUserPermission(
    userId: string,
    workspaceId: string,
    roles: WorkspaceRoles[],
  ): Promise<boolean> {
    const data = await prismaClient.userWorkspace.findMany({
      where: {
        user_id: userId,
        workspace_id: workspaceId,
      },
    })

    return !!data.some((item) => roles.includes(item.role as WorkspaceRoles))
  }

  async sendInvite(
    workspaceId: string,
    email: string,
    role: WorkspaceRoles,
    userId?: string | undefined,
  ): Promise<void> {
    await prismaClient.userWorkspace.create({
      data: {
        workspace_id: workspaceId,
        email: email,
        user_id: userId,
        status: InviteStatuses.PENDING,
        role,
      },
    })
  }

  async listInvites(userId: string): Promise<UserWorkspace[]> {
    const data = await prismaClient.userWorkspace.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    })

    return data.map(WorkspaceMapper.toDomainUserWorkspace)
  }
}
