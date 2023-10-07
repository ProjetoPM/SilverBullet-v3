import { prismaClient } from '@/infra/prisma/client'
import { UserProjectRole } from '../../domain/user-project-role'
import { IUserProjectRolesRepository } from '../IUserProjectRolesRepository'
import { UserProjectRoleMapper } from '../../mappers/user-project-role-mapper'

export class PrismaUserProjectRolesRepository
  implements IUserProjectRolesRepository
{
  async create(userProjectRole: UserProjectRole): Promise<void> {
    const data = await UserProjectRoleMapper.toPersistence(userProjectRole)

    await prismaClient.userProjectRole.create({
      data,
    })
  }
}
