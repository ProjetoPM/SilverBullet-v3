import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let usersRepository: IUsersRepository

describe('Create workspace (end-to-end)', async () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.workspace.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to create a workspace', async () => {
    const data: any = {
      name: 'test-workspace',
      description: 'a simple workspace',
    }

    const response = await request(app)
      .post('/api/workspaces/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
  })

  test('should not be able to create a workspace with no authentication', async () => {
    const data: any = {
      name: 'test-workspace',
      description: 'a simple workspace',
    }

    const response = await request(app).post('/api/workspaces/new').send(data)
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
