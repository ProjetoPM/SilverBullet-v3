import { Either, left, right } from '@/core/logic/either'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../../repositories/IProjectCharters'

type CreateProjectCharterRequest = {
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
  signed: boolean
  projectId: string
  userId: string
}

type CreateProjectCharterResponse = Either<
  UserDoesNotExistError,
  ProjectCharter
>

export class CreateProjectCharter {
  constructor(
    private projectCharterRepository: IProjectChartersRepository,
    private userRepository: IUsersRepository,
  ) {}

  async execute(
    data: CreateProjectCharterRequest,
  ): Promise<CreateProjectCharterResponse> {
    const { userId } = data
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const projectCharterOrError = ProjectCharter.create(data)

    if (projectCharterOrError.isLeft()) {
      return left(projectCharterOrError.value)
    }

    const projectCharter = projectCharterOrError.value

    await this.projectCharterRepository.create(projectCharter)

    return right(projectCharter)
  }
}
