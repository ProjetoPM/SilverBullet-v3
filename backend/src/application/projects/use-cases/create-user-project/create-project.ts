import { Either, left, right } from '@/core/logic/either'
import { Project } from '../../domain/project'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { ICreateUserProjectsUseCase } from '@/application/user-projects/use-cases/ICreateUserProjectsUseCase'
import InviteStatus from '@/application/user-projects/domain/invite-status.enum'
import { WorkspaceDoesNotExistError } from '../errors/WorkspaceDoesNotExistError'

type CreateProjectRequest = {
  name: string
  description?: string
  workspaceId: string
  currentUserId: string
}

type CreateProjectResponse = Either<WorkspaceDoesNotExistError, Project>

export class CreateProject {
  constructor(
    private projectsRepository: IProjectsRepository,
    private createUserProjects: ICreateUserProjectsUseCase,
  ) {}

  async execute({
    name,
    description,
    workspaceId,
    currentUserId: userId,
  }: CreateProjectRequest): Promise<CreateProjectResponse> {
    const projectOrError = Project.create({
      name,
      description,
      workspaceId,
    })

    if (projectOrError.isLeft()) {
      return left(projectOrError.value)
    }

    const project = projectOrError.value

    await this.projectsRepository.create(project)

    await this.createUserProjects.execute({
      projectId: project.id,
      userId,
      status: InviteStatus.ACTIVE,
    })

    return right(project)
  }
}
