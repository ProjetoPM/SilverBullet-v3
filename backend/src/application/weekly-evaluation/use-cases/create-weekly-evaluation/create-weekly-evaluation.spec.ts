import { beforeAll, describe, expect, test } from 'vitest'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { User } from '@/application/users/domain/user'

import {
  CreateWeeklyEvaluation,
  CreateWeeklyEvaluationRequest,
} from './create-weekly-evaluation'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { InMemoryWeeklyEvaluationsRepository } from '../../repositories/in-memory/InMemoryWeeklyEvaluationsRepository'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { Types } from '../../domain/types.enum'
import { EvaluationStatuses } from '../../domain/status.enum'
import { StartDateGreaterThanEndDateError } from './errors/StartDateGreaterThanEndDateError'
import { WorkspaceDoesNotExistError } from './errors/WorkspaceDoesNotExistError'
import { UserDoesNotBelongToWorkspaceError } from './errors/UserDoesNotBelongToWorkspaceError'

let weeklyEvaluationsRepository: IWeeklyEvaluationsRepository
let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let createWeeklyEvaluation: CreateWeeklyEvaluation

describe('Create a evaluation', async () => {
  const user = UserFactory.create()
  const userThatDoesNotBelongsToWorkspace = UserFactory.create()
  const workspace = WorkspaceFactory.create()
  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    weeklyEvaluationsRepository = new InMemoryWeeklyEvaluationsRepository()
    workspacesRepository = new InMemoryWorkspacesRepository()
    await usersRepository.create(user)
    await usersRepository.create(userThatDoesNotBelongsToWorkspace)
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    createWeeklyEvaluation = new CreateWeeklyEvaluation(
      workspacesRepository,
      weeklyEvaluationsRepository,
      usersRepository,
    )
  })

  test('should create a evaluation', async () => {
    const data: CreateWeeklyEvaluationRequest = {
      name: 'test-evaluation',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
      userId: user.id,
      workspaceId: workspace.id,
    }

    const response = await createWeeklyEvaluation.execute(data)
    expect(response.isRight()).toBeTruthy()
  })

  test('should not create a evaluation with start date greather than end date', async () => {
    const data: CreateWeeklyEvaluationRequest = {
      name: 'test-evaluation',
      startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      endDate: new Date(),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
      userId: user.id,
      workspaceId: workspace.id,
    }

    const response = await createWeeklyEvaluation.execute(data)
    console.log(response.value)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new StartDateGreaterThanEndDateError())
  })
  test('should not create a evaluation with invalid user id', async () => {
    const data: CreateWeeklyEvaluationRequest = {
      name: 'test-evaluation',
      startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      endDate: new Date(),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
      userId: 'invalid user id',
      workspaceId: workspace.id,
    }

    const response = await createWeeklyEvaluation.execute(data)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new UserDoesNotExistError())
  })

  test('should not create a evaluation with invalid workspace id', async () => {
    const data: CreateWeeklyEvaluationRequest = {
      name: 'test-evaluation',
      startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      endDate: new Date(),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
      userId: user.id,
      workspaceId: 'invalid-workspace',
    }

    const response = await createWeeklyEvaluation.execute(data)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new WorkspaceDoesNotExistError())
  })

  test('should not create a evaluation with user that does not belong to workspace', async () => {
    const data: CreateWeeklyEvaluationRequest = {
      name: 'test-evaluation',
      startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      endDate: new Date(),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
      userId: userThatDoesNotBelongsToWorkspace.id,
      workspaceId: workspace.id,
    }

    const response = await createWeeklyEvaluation.execute(data)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new UserDoesNotBelongToWorkspaceError())
  })
})
