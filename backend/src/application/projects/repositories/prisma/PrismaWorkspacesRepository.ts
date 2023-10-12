import { prismaClient } from '@/infra/prisma/client'
import { IWorkspacesRepository } from '../IWorkspacesRepository'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
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
    const data = await prismaClient.project.findUnique({ where: { id } })

    return !!data
  }
}
