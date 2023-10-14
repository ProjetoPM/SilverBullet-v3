import { prismaClient } from '@/infra/prisma/client'
import { Workspace } from '../../domain/workspace'
import { WorkspaceMapper } from '../../mappers/workspace-mapper'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { User } from '@/application/users/domain/user'
import { InviteStatuses } from '../../domain/invite-statuses.enum'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
  async create(
    workspace: Workspace,
    user: User,
    status: InviteStatuses,
    role: WorkspaceRoles,
  ): Promise<void> {
    const persistenceWorkspace = await WorkspaceMapper.toPersistence(workspace)

    await prismaClient.workspace.create({
      data: {
        ...persistenceWorkspace,
        UserWorkspace: {
          create: {
            user_id: user.id,
            status,
            role,
          },
        },
      },
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
}
