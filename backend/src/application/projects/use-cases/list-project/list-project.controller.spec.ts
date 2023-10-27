import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '../../repositories/prisma/PrismaWorkspacesRepository'

let workspaceIds: string[] = []
let usersRepository: IUsersRepository
let workspacesRepository: IWorkspacesRepository

describe('List workspaces (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  const workspaces = [
    WorkspaceFactory.create(),
    WorkspaceFactory.create(),
    WorkspaceFactory.create(),
  ]

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspacesRepository = new PrismaWorkspacesRepository()
    await usersRepository.create(user)

    for (const workspace of workspaces) {
      await workspacesRepository.create(
        workspace,
        user,
        InviteStatuses.ACTIVE,
        WorkspaceRoles.ADMIN,
      )
      workspaceIds.push(workspace.id)
    }
  })

  afterAll(async () => {
    await prismaClient.workspace.deleteMany({
      where: { id: { in: workspaceIds } },
    })
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to list workspaces', async () => {
    const response = await request(app)
      .get('/api/workspaces')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })
})
