import { Either, left, right } from '@/core/logic/either'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { ProjectCharter } from '../../domain/project-charter'
import { IProjectChartersRepository } from '../../repositories/IProjectChartersRepository'
import { DuplicatedProjectCharterError } from './errors/DuplicatedProjectCharterError'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { ProjectDoesNotExistError } from './errors/ProjectDoesNotExistError'
import { UserDoesNotBelongToProjectError } from './errors/UserDoesNotBelongToProjectError'

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
  projectId: string
  userId: string
}

type CreateProjectCharterResponse = Either<
  | UserDoesNotExistError
  | DuplicatedProjectCharterError
  | UserDoesNotBelongToProjectError
  | ProjectDoesNotExistError,
  ProjectCharter
>

export class CreateProjectCharter {
  constructor(
    private projectRepository: IProjectsRepository,
    private projectCharterRepository: IProjectChartersRepository,
    private userRepository: IUsersRepository,
  ) {}

  async execute(
    data: CreateProjectCharterRequest,
  ): Promise<CreateProjectCharterResponse> {
    const { userId, projectId } = data

    const user = await this.userRepository.findById(userId)
    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const project = await this.projectRepository.findById(projectId)
    if (!project) {
      return left(new ProjectDoesNotExistError())
    }

    const userBelongsToProject =
      await this.projectRepository.verifyUserBelongsToProject(userId, projectId)
    if (!userBelongsToProject) {
      return left(new UserDoesNotBelongToProjectError())
    }

    const countProjectCharters =
      await this.projectCharterRepository.countProjectChartersByProjectId(
        projectId,
      )

    if (countProjectCharters > 0) {
      return left(new DuplicatedProjectCharterError())
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
