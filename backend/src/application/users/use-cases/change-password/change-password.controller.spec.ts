import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let usersRepository: IUsersRepository

describe('Reset password (end-to-end)', async () => {
  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to reset password', async () => {
    const { jwt, user } = UserFactory.createAndAuthenticate()

    await usersRepository.create(user)

    const data: any = {
      password: 'Bacon@1234',
      confirmPassword: 'Bacon@1234',
    }

    const response = await request(app)
      .post(`/api/users/reset-password`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to reset password with an user that does not exist', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .post(`/api/users/reset-password`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
