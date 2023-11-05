import { Either, left, right } from '@/core/logic/either'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { WeeklyEvaluation } from '../../domain/weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'
import { Types } from '../../domain/types.enum'
import { EvaluationStatuses } from '../../domain/status.enum'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'
import { WeeklyEvaluationNotCreatedError } from './errors/WeeklyEvaluationNotCreatedError'
import { UserDoesNotBelongToWorkspaceError } from './errors/UserDoesNotBelongToWorkspaceError'
import { StartDateGreaterThanEndDateError } from './errors/StartDateGreaterThanEndDateError'

export type CreateWeeklyEvaluationRequest = {
  name: string
  startDate: Date
  endDate: Date
  type: Types
  status: EvaluationStatuses
  workspaceId: string
  userId: string
}

type CreateWeeklyEvaluationResponse = Either<
  | UserDoesNotExistError
  | WorkspaceDoesNotExistError
  | WeeklyEvaluationNotCreatedError
  | UserDoesNotBelongToWorkspaceError
  | StartDateGreaterThanEndDateError,
  WeeklyEvaluation
>

export class CreateWeeklyEvaluation {
  constructor(
    private workspacesRepository: IWorkspacesRepository,
    private weeklyEvaluationsRepository: IWeeklyEvaluationsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    startDate,
    endDate,
    type,
    status,
    workspaceId,
    userId,
  }: CreateWeeklyEvaluationRequest): Promise<CreateWeeklyEvaluationResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const workspace = await this.workspacesRepository.findById(workspaceId)
    if (!workspace) {
      return left(new WorkspaceDoesNotExistError())
    }

    const userBelongsToWorkspace =
      await this.workspacesRepository.verifyUserBelongsToWorkspace(
        userId,
        workspaceId,
      )

    if (!userBelongsToWorkspace) {
      return left(new UserDoesNotBelongToWorkspaceError())
    }

    const isStartDateGreaterThanEndDate =
      startDate.getTime() > endDate.getTime()

    if (isStartDateGreaterThanEndDate) {
      return left(new StartDateGreaterThanEndDateError())
    }

    const weeklyEvaluationOrError = WeeklyEvaluation.create({
      name,
      startDate,
      endDate,
      type,
      status,
      workspaceId,
    })

    if (weeklyEvaluationOrError.isLeft()) {
      return left(weeklyEvaluationOrError.value)
    }

    const weeklyEvaluation = weeklyEvaluationOrError.value

    await this.weeklyEvaluationsRepository.create(weeklyEvaluation)

    return right(weeklyEvaluation)
  }
}
