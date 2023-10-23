import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { WorkspaceRoles } from '../../domain/workspace-roles.schema'
import { IWorkspacesRepository } from '../../repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '../../repositories/prisma/PrismaWorkspacesRepository'

let usersRepository: IUsersRepository
let workspaceRepository: IWorkspacesRepository

describe('Delete category (end-to-end)', async () => {
  beforeAll(async () => {
    workspaceRepository = new PrismaWorkspacesRepository()
    usersRepository = new PrismaUsersRepository()
  })

  test('should be able to delete an existing category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const user = UserFactory.create()
    const workspace = WorkspaceFactory.create()

    await usersRepository.create(user)
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await request(app)
      .del(`/api/workspaces/?ids=${workspace.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should be able to delete more than one category', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const user = UserFactory.create()
    await usersRepository.create(user)

    const workspace1 = WorkspaceFactory.create()
    const workspace2 = WorkspaceFactory.create()

    await workspaceRepository.create(
      workspace1,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    await workspaceRepository.create(
      workspace2,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const response = await request(app)
      .del(`/api/workspaces/?ids=${workspace1.id}&ids=${workspace2.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test("should not be able to delete a category that doesn't exist", async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .del(`/api/workspaces/?ids=invalid-category-id`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
