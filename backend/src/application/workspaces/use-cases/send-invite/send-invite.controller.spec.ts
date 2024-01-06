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

describe('Send Invite (end-to-end)', () => {
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

  test('should be able to send an invite to a nonexistent user', async () => {
    await usersRepository.create(user)
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    const data = {
      data: [
        {
          email: 'teste1@gmail.com',
          role: WorkspaceRoles.USER,
        },
      ],
    }

    const response = await request(app)
      .post(`/api/invites/workspace`)
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    console.log(response.body)

    expect(response.status).toBe(StatusCodes.OK)
  })
  test('should be able to send an invite to an existing user', async () => {
    const anotherUser = UserFactory.create({ email: 'test@example.com' })
    await usersRepository.create(anotherUser)

    const data = {
      data: [
        {
          email: 'test@example.com',
          role: WorkspaceRoles.USER,
        },
      ],
    }

    const response = await request(app)
      .post(`/api/invites/workspace`)
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    console.log(response.body)

    expect(response.status).toBe(StatusCodes.OK)
  })
})
