import { prismaClient } from '@/infra/prisma/client'
import { UserProject } from '../../domain/user-project'
import { UserProjectMapper } from '../../mappers/user-project-mapper'
import { IUserProjectsRepository } from '../IUserProjectRepository'

export class PrismaUserProjectsRepository implements IUserProjectsRepository {
  async create(userProject: UserProject): Promise<string> {
    const data = await UserProjectMapper.toPersistence(userProject)

    const { id } = await prismaClient.userProject.create({
      data,
    })

    return id
  }
}
