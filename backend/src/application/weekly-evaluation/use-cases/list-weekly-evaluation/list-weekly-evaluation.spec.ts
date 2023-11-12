import { beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { ListWeeklyEvaluation } from './list-weekly-evaluation'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { InMemoryWeeklyEvaluationsRepository } from '../../repositories/in-memory/InMemoryWeeklyEvaluationsRepository'
import { WeeklyEvaluationFactory } from '@/tests/factories/WeeklyEvaluationFactory'


let weeklyEvaluationsRepository: IWeeklyEvaluationsRepository
let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let listWeeklyEvaluation: ListWeeklyEvaluation

describe('List weekly evaluations', async () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    workspacesRepository = new InMemoryWorkspacesRepository()
    weeklyEvaluationsRepository = new InMemoryWeeklyEvaluationsRepository()
    listWeeklyEvaluation = new ListWeeklyEvaluation(weeklyEvaluationsRepository)
  })

  test('should get empty array when there is no weekly evaluations', async () => {
    const response = await listWeeklyEvaluation.execute({workspaceId: workspace.id})
    expect(response.length).toBe(0)
  })

  test('should be able to list weekly evaluations', async () => {
    const weeklyEvaluation1 =  WeeklyEvaluationFactory.create({
      name: 'Weekly Evaluation 1',
      workspaceId: workspace.id,
    })

    const weeklyEvaluation2 =  WeeklyEvaluationFactory.create({
      name: 'Weekly Evaluation 2',
      workspaceId: workspace.id,
    })

    await weeklyEvaluationsRepository.create(weeklyEvaluation1)
    await weeklyEvaluationsRepository.create(weeklyEvaluation2)

    const response = await listWeeklyEvaluation.execute({workspaceId: workspace.id})
    expect(response.length === 2).toBeTruthy()
  })
})
