import { Either, left, right } from '@/core/logic/either'
import { ProjectNotFoundError } from './errors/ProjectNotFoundError'
import { Project } from '../../domain/project'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

type GetProjectRequest = {
  projectId: string
}

type GetProjectResponse = Either<ProjectNotFoundError, Project>

export class GetProject {
  constructor(private projectRepository: IProjectsRepository) {}

  async execute({ projectId }: GetProjectRequest): Promise<GetProjectResponse> {
    const project = await this.projectRepository.findById(projectId)

    if (!project) {
      return left(new ProjectNotFoundError())
    }

    return right(project)
  }
}
