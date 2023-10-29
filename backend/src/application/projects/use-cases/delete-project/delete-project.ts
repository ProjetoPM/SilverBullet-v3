import { Either, left, right } from '@/core/logic/either'
import { ProjectNotFoundError } from './errors/ProjectNotFoundError'
import { OneOrMoreProjectNotFoundError } from './errors/OneOrMoreProjectNotFoundError'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

type DeleteProjectRequest = {
  ids: string[]
}

type DeleteProjectResponse = Either<
  OneOrMoreProjectNotFoundError | ProjectNotFoundError,
  null
>

export class DeleteProject {
  constructor(private projectRepository: IProjectsRepository) {}

  async execute({
    ids: projectId,
  }: DeleteProjectRequest): Promise<DeleteProjectResponse> {
    const projectOrProjects = Array.isArray(projectId) ? projectId : [projectId]

    if (projectOrProjects.length === 0) {
      return left(new OneOrMoreProjectNotFoundError())
    }

    const projectPromises = projectOrProjects
      .filter((projectId) => projectId)
      .map((projectId) => this.projectRepository.findById(projectId))

    const projects = await Promise.all(projectPromises)

    if (projects.some((project) => project === null)) {
      return left(
        projects.length > 1
          ? new OneOrMoreProjectNotFoundError()
          : new ProjectNotFoundError(),
      )
    }

    await this.projectRepository.deleteMany(projectOrProjects)

    return right(null)
  }
}
