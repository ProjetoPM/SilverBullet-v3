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

let workspaceRepository: IWorkspacesRepository
let usersRepository: IUsersRepository

describe('Get a workspace (end-to-end)', () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspaceRepository = new PrismaWorkspacesRepository()

    await usersRepository.create(user)
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
  })

  afterAll(async () => {
    await prismaClient.workspace.delete({
      where: { id: workspace.id },
    })
  })

  test('should be able to get a workspace', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/workspaces/${workspace.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto).toStrictEqual(workspace.toResponseBody())
  })

  test('should not be able to get a non existing workspace', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/workspaces/invalid-id`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a workspace with no authentication', async () => {
    const response = await request(app)
      .get(`/api/workspaces/${workspace.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
