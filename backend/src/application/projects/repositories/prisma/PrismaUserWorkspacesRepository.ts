import { prismaClient } from '@/infra/prisma/client'
import InviteStatuses from '../../domain/invite-statuses.enum'
import { IUserWorkspacesRepository } from '../IUserWorkspacesRepository'

export class PrismaProjectsRepository implements IUserWorkspacesRepository {
  constructor() {}

  async verifyActiveWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<boolean> {
    const data = await prismaClient.userWorkspace.findFirst({
      where: {
        user_id: userId,
        workspace_id: workspaceId,
        status: InviteStatuses.ACTIVE,
      },
    })

    return !!data
  }
}
