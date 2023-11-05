import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { EvaluationStatuses } from '../../domain/status.enum'
import { Types } from '../../domain/types.enum'

let usersRepository: IUsersRepository
let workspacesRepository: IWorkspacesRepository

const ROUTE_ENTITY = 'weekly-evaluations'

describe('Create evaluation (end-to-end)', async () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspacesRepository = new PrismaWorkspacesRepository()
    await usersRepository.create(user)
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.workspace.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.weeklyEvaluation.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to create a evaluation', async () => {
    const data: any = {
      name: 'test-workspace',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
    }

    const response = await request(app)
      .post(`/api/${ROUTE_ENTITY}/new`)
      .auth(jwt.token, { type: 'bearer' })
      .set({ 'current-workspace-id': workspace.id })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
  })

  test('should not be able to create a evaluation with no authentication', async () => {
    const data: any = {
      name: 'test-evaluation',
      startDate: new Date().toISOString(),
      endDate: new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 3,
      ).toISOString(),
      type: Types.INDIVIDUAL,
      status: EvaluationStatuses.OPEN,
    }

    const response = await request(app)
      .post(`/api/${ROUTE_ENTITY}/new`)
      .set({ 'current-workspace-id': workspace.id })
      .send(data)
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
