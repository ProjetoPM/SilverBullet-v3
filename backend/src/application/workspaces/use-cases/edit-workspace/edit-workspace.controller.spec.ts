import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '../../repositories/prisma/PrismaWorkspacesRepository'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'

let usersRepository: IUsersRepository
let workspaceRepository: IWorkspacesRepository

describe('Edit workspace (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const workspace = WorkspaceFactory.create()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspaceRepository = new PrismaWorkspacesRepository()
  })

  afterAll(async () => {
    await prismaClient.workspace.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to edit a workspace', async () => {
    await usersRepository.create(user)
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const data: any = {
      name: 'test-workspace-edited',
      description: 'test-workspace-edited',
    }

    const response = await request(app)
      .put(`/api/workspaces/${workspace.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

      console.log(response);
      
    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to edit a workspace with no authentication', async () => {
    const data: any = {
      name: 'test-workspace',
      description: 'test-workspace',
    }

    const response = await request(app)
      .put(`/api/workspaces/${workspace.id}/edit`)
      .send(data)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
