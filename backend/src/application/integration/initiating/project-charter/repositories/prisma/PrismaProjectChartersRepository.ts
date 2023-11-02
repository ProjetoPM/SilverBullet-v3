import { prismaClient } from '@/infra/prisma/client'
import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../IProjectCharters'
import { ProjectCharterMapper } from '../../mappers/project-charter-mapper'

export class PrismaProjectChartersRepository
  implements IProjectChartersRepository
{
  async create(projectCharter: ProjectCharter): Promise<void> {
    const data = await ProjectCharterMapper.toPersistence(projectCharter)

    await prismaClient.projectCharter.create({
      data,
    })
  }
  async update(projectCharter: ProjectCharter): Promise<void> {
    const data = await ProjectCharterMapper.toPersistence(projectCharter)

    await prismaClient.projectCharter
      .update({
        where: { id: projectCharter.id },
        data,
      })
      .catch(() => {
        throw new Error('Error on update project charter')
      })
  }

  async findById(id: string): Promise<ProjectCharter | null> {
    const data = await prismaClient.projectCharter.findUnique({
      where: { id: id },
    })

    if (!data) return null

    return ProjectCharterMapper.toDomain(data)
  }

  async countProjectChartersByProjectId(projectId: string): Promise<number> {
    return await prismaClient.projectCharter.count({
      where: {
        project_id: projectId,
      },
    })
  }

  async deleteAll(): Promise<void> {
    await prismaClient.projectCharter.deleteMany({})
  }
}
