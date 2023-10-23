import request from 'supertest'

import { prismaClient } from '@/infra/prisma/client'
import { app } from '@infra/http/app'
import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Authenticate User (end-to-end)', () => {
  beforeAll(async () => {
    await prismaClient.user.create({
      data: {
        id: uuid(),
        name: 'test',
        email: 'test@test-test.com',
        password: await hash('test1234567', 8),
      },
    })
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { email: { contains: 'test' } },
    })
  })

  test('should be able to authenticate', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'test@test-test.com',
      password: 'test1234567',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
