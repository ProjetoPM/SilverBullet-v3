import { prismaClient } from '@/infra/prisma/client'
import { Project } from '../../domain/project'
import { ProjectMapper } from '../../mappers/project-mapper'
import { IProjectsRepository } from '../IProjectsRepository'

export class PrismaProjectsRepository implements IProjectsRepository {
  findById(id: string): Promise<Project | null> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(id: string): Promise<Project | null> {
    const project = await prismaClient.project.findUnique({
      where: {
        id,
      },
    })

    if (!project) {
      return null
    }

    return ProjectMapper.toDomain(project)
  }

  async exists(id: string): Promise<boolean> {
    const projectExists = await prismaClient.project.findUnique({
      where: {
        id,
      },
    })

    return !!projectExists
  }

  async create(project: Project): Promise<void> {
    const data = await ProjectMapper.toPersistence(project)

    await prismaClient.project.create({
      data,
    })
  }
}
