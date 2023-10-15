import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

let workspaceId: string[] = []

describe('Create workspace (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.workspace.deleteMany({
      where: { id: { in: workspaceId } },
    })
  })

  test('', () => {
    expect(true).toBeTruthy()
  })
})
