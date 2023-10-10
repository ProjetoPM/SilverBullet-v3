import { prismaClient } from '@/infra/prisma/client'
import { Project } from '../../domain/project'
import { ProjectMapper } from '../../mappers/project-mapper'
import { IProjectsRepository } from '../IProjectsRepository'
import { IUserProjectsRepository } from '../IUserProjectRepository'
import { IUserProjectRolesRepository } from '../IUserProjectRolesRepository'
import { UserProject } from '../../domain/user-project'
import { UserProjectRole } from '../../domain/user-project-role'

export class PrismaProjectsRepository implements IProjectsRepository {
  constructor(
    private userProjectsRepository: IUserProjectsRepository,
    private userProjectRolesRepository: IUserProjectRolesRepository,
  ) {}

  async findById(id: string): Promise<Project | null> {
    const data = await prismaClient.project.findUnique({ where: { id } })

    if (!data) return null

    return ProjectMapper.toDomain(data)
  }

  async create(
    project: Project,
    userProject: UserProject,
    userProjectRoles: UserProjectRole[],
  ): Promise<void> {
    const data = await ProjectMapper.toPersistence(project)

    await prismaClient.project.create({
      data,
    })

    await this.userProjectsRepository.create(userProject)

    await this.userProjectRolesRepository.createMany(userProjectRoles)
  }
}
