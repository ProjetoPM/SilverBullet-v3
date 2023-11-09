import { beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { ListAvailableWeeklyEvaluation } from './list-available-evaluation'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { InMemoryWeeklyEvaluationsRepository } from '../../repositories/in-memory/InMemoryWeeklyEvaluationsRepository'
import { WeeklyEvaluationFactory } from '@/tests/factories/WeeklyEvaluationFactory'


let weeklyEvaluationsRepository: IWeeklyEvaluationsRepository
let workspacesRepository: IWorkspacesRepository
let usersRepository: IUsersRepository
let listAvailableWeeklyEvaluation: ListAvailableWeeklyEvaluation

describe('List weekly evaluations', async () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    workspacesRepository = new InMemoryWorkspacesRepository()
    weeklyEvaluationsRepository = new InMemoryWeeklyEvaluationsRepository()
    listAvailableWeeklyEvaluation = new ListAvailableWeeklyEvaluation(weeklyEvaluationsRepository)
  })

  test('should get empty array when there is no weekly evaluations', async () => {
    const response = await listAvailableWeeklyEvaluation.execute({workspaceId: workspace.id})
    expect(response.length).toBe(0)
  })

  test('should be able to list available evaluations', async () => {
    const weeklyEvaluation1 =  WeeklyEvaluationFactory.create({
      name: 'Weekly Evaluation 1',
      workspaceId: workspace.id,
      endDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 10)
    })
    
    const weeklyEvaluation2 =  WeeklyEvaluationFactory.create({
      name: 'Weekly Evaluation 2',
      workspaceId: workspace.id,
      startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 10),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    })

    await weeklyEvaluationsRepository.create(weeklyEvaluation1)
    await weeklyEvaluationsRepository.create(weeklyEvaluation2)

    const response = await listAvailableWeeklyEvaluation.execute({workspaceId: workspace.id})
    expect(response.length === 1).toBeTruthy()
  })
})
