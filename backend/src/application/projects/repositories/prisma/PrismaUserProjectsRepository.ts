import { prismaClient } from '@/infra/prisma/client'
import { UserProject } from '../../domain/user-project'
import { UserProjectMapper } from '../../mappers/user-project-mapper'
import { IUserProjectsRepository } from '../IUserProjectRepository'

export class PrismaUserProjectsRepository implements IUserProjectsRepository {
  async create(userProject: UserProject): Promise<void> {
    const data = await UserProjectMapper.toPersistence(userProject)

    await prismaClient.userProject.create({
      data,
    })
  }
}
