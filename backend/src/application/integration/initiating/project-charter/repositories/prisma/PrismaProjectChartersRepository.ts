import { prismaClient } from '@/infra/prisma/client'
import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../IProjectCharters'
import { ProjectCharterMapper } from '../../mappers/project-charter-mapper'

export class PrismaStakeholdersRepository
  implements IProjectChartersRepository
{
  async create(projectCharter: ProjectCharter): Promise<void> {
    const data = await ProjectCharterMapper.toPersistence(projectCharter)

    await prismaClient.projectCharter.create({
      data,
    })
  }
}
