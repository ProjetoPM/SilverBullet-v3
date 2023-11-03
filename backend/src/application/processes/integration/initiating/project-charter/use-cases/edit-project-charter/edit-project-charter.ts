import { Either, left, right } from '@/core/logic/either'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../../repositories/IProjectChartersRepository'
import { UserDoesNotBelongToProjectError } from './errors/UserDoesNotBelongToProjectError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { ProjectCharterDoesNotExistError } from './errors/ProjectCharterDoesNotExistError'
import { ProjectCharterAlreadySignedError } from './errors/ProjectCharterAlreadySignedError'

export type EditProjectCharterRequest = {
  projectName: string
  highLevelProjectDescription: string
  startDate: Date
  endDate: Date
  projectPurpose: string
  measurableProjectObjectives: string
  keyBenefits: string
  highLevelRequirements: string
  boundaries: string
  overallProjectRisk: string
  summaryMilestoneSchedule: string
  preApprovedFinancialResources: string
  projectApprovalRequirements: string
  successCriteria: string
  projectExitCriteria: string
  userId: string
  projectCharterId: string
}

type EditProjectCharterResponse = Either<
  | UserDoesNotExistError
  | UserDoesNotBelongToProjectError
  | ProjectCharterAlreadySignedError,
  ProjectCharter
>

export class EditProjectCharter {
  constructor(
    private projectRepository: IProjectsRepository,
    private projectCharterRepository: IProjectChartersRepository,
    private userRepository: IUsersRepository,
  ) {}

  async execute(
    data: EditProjectCharterRequest,
  ): Promise<EditProjectCharterResponse> {
    const { userId, projectCharterId } = data

    const user = await this.userRepository.findById(userId)
    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const projectCharterExists =
      await this.projectCharterRepository.findById(projectCharterId)
    if (!projectCharterExists) {
      return left(new ProjectCharterDoesNotExistError())
    }
    const { projectId, signed } = projectCharterExists.props

    if (signed === true) {
      return left(new ProjectCharterAlreadySignedError())
    }

    const userBelongsToProject =
      await this.projectRepository.verifyUserBelongsToProject(userId, projectId)
    if (!userBelongsToProject) {
      return left(new UserDoesNotBelongToProjectError())
    }

    const projectCharterOrError = ProjectCharter.create(
      { ...data, projectId },
      projectCharterId,
    )

    if (projectCharterOrError.isLeft()) {
      return left(projectCharterOrError.value)
    }

    const projectCharter = projectCharterOrError.value

    await this.projectCharterRepository.update(projectCharter)

    return right(projectCharter)
  }
}
