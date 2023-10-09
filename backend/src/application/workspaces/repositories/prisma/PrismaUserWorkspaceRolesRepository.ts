import { prismaClient } from '@/infra/prisma/client'
import { UserWorkspaceRole } from '../../domain/user-workspace-role'
import { IUserWorkspaceRolesRepository } from '../IUserWorkspaceRolesRepository'
import { UserWorkspaceRoleMapper } from '../../mappers/user-workspace-role-mapper'

export class PrismaUserWorkspaceRolesRepository
  implements IUserWorkspaceRolesRepository
{
  async create(userWorkspaceRole: UserWorkspaceRole): Promise<void> {
    const data = await UserWorkspaceRoleMapper.toPersistence(userWorkspaceRole)

    await prismaClient.userWorkspaceRole.create({
      data,
    })
  }
}
