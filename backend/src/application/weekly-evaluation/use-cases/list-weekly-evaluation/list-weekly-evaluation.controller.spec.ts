import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IWeeklyEvaluationsRepository } from '../../repositories/IWeeklyEvaluationsRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { PrismaWeeklyEvaluationsRepository } from '../../repositories/prisma/PrismaWeeklyEvaluationsRepository'
import { WeeklyEvaluationFactory } from '@/tests/factories/WeeklyEvaluationFactory'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'

let weeklyEvaluationIds: string[] = []
let usersRepository: IUsersRepository
let workspacesRepository: IWorkspacesRepository
let weeklyEvaluationsRepository: IWeeklyEvaluationsRepository


describe('List weekly evaluations (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const workspace = WorkspaceFactory.create()
  
  const weeklyEvaluations = [
    WeeklyEvaluationFactory.create({workspaceId: workspace.id}),
    WeeklyEvaluationFactory.create({workspaceId: workspace.id}),
    WeeklyEvaluationFactory.create({workspaceId: workspace.id}),
  ]
  
  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspacesRepository = new PrismaWorkspacesRepository()
    weeklyEvaluationsRepository = new PrismaWeeklyEvaluationsRepository()
    await usersRepository.create(user)
    await workspacesRepository.create(workspace, user, InviteStatuses.ACTIVE, WorkspaceRoles.ADMIN)
    
    for (const weeklyEvaluation of weeklyEvaluations) {
      await weeklyEvaluationsRepository.create(
        weeklyEvaluation,
        )
        weeklyEvaluationIds.push(workspace.id)
      }
    })
    
    afterAll(async () => {
      await prismaClient.workspace.delete({
        where: {
          id: workspace.id,
        }
      })
      
      await prismaClient.weeklyEvaluation.deleteMany({
        where: { id: { in: weeklyEvaluationIds } },
      })
      await prismaClient.user.deleteMany({
        where: { name: { contains: 'test' } },
      })
    })
    
    test('should be able to list weekly evaluations', async () => {
      const response = await request(app)
      .get('/api/weekly-evaluations')
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })
})
