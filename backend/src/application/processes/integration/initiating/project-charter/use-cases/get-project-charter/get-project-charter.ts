import { Either, left, right } from '@/core/logic/either'
import { ProjectCharterNotFoundError } from './errors/ProjectCharterNotFoundError'
import { IProjectChartersRepository } from '../../repositories/IProjectChartersRepository'
import { ProjectCharter } from '../../domain/project-charter'

type GetProjectCharterRequest = {
  projectCharterId: string
}

type GetProjectCharterResponse = Either<
  ProjectCharterNotFoundError,
  ProjectCharter
>

export class GetProjectCharter {
  constructor(private projectCharterRepository: IProjectChartersRepository) {}

  async execute({
    projectCharterId,
  }: GetProjectCharterRequest): Promise<GetProjectCharterResponse> {
    const projectCharter =
      await this.projectCharterRepository.findById(projectCharterId)

    if (!projectCharter) {
      return left(new ProjectCharterNotFoundError())
    }

    return right(projectCharter)
  }
}
