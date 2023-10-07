import { prismaClient } from '@/infra/prisma/client'
import { UserWorkspace } from '../../domain/user-workspace'
import { UserWorkspaceMapper } from '../../mappers/user-workspace-mapper'
import { IUserWorkspacesRepository } from '../IUserWorkspaceRepository'

export class PrismaUserWorkspacesRepository
  implements IUserWorkspacesRepository
{
  async create(userWorkspace: UserWorkspace): Promise<void> {
    const data = await UserWorkspaceMapper.toPersistence(userWorkspace)

    await prismaClient.userWorkspace.create({
      data,
    })
  }
}
