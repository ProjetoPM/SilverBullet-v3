import { prismaClient } from '@/infra/prisma/client'
import { UserProjectRole } from '../../domain/user-project-role'
import { UserProjectRoleMapper } from '../../mappers/user-project-role-mapper'
import { IUserProjectRolesRepository } from '../IUserProjectRolesRepository'

export class PrismaUserProjectRolesRepository
  implements IUserProjectRolesRepository
{
  async create(userProjectRole: UserProjectRole): Promise<void> {
    const data = await UserProjectRoleMapper.toPersistence(userProjectRole)

    await prismaClient.userProjectRole.create({
      data,
    })
  }

  async createMany(userProjectRoles: UserProjectRole[]): Promise<void> {
    await Promise.all(
      userProjectRoles.map((role) => {
        this.create(role)
      }),
    )
  }
}
