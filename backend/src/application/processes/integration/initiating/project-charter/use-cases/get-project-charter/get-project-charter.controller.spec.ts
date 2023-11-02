import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { IProjectChartersRepository } from '../../repositories/IProjectChartersRepository'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { PrismaProjectChartersRepository } from '../../repositories/prisma/PrismaProjectChartersRepository'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { ProjectRoles } from '@/application/projects/domain/project-roles.schema'

let projectCharterRepository: IProjectChartersRepository
let projectRepository: IProjectsRepository
let workspaceRepository: IWorkspacesRepository
let usersRepository: IUsersRepository

describe('Get a project charter (end-to-end)', () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()
  const project = ProjectFactory.create({ workspaceId: workspace.id })

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspaceRepository = new PrismaWorkspacesRepository()
    projectCharterRepository = new PrismaProjectChartersRepository()
    projectRepository = new PrismaProjectsRepository()

    await usersRepository.create(user)
    await workspaceRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    await projectRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])
  })

  afterAll(async () => {
    await prismaClient.workspace.delete({
      where: { id: workspace.id },
    })
  })

  test('should be able to get a project charter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/project-charters/${project.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto).toStrictEqual(project.toResponseBody())
  })

  test('should not be able to get a non existing project charter', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/project-charters/invalid-id`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a project charter with no authentication', async () => {
    const response = await request(app)
      .get(`/api/project-charters/${project.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
