import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { InviteStatuses } from '../../domain/invite-statuses.enum'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { PrismaProjectsRepository } from '../../repositories/prisma/PrismaProjectsRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { ProjectRoles } from '../../domain/project-roles.schema'

let projectRepository: IProjectsRepository
let workspaceRepository: IWorkspacesRepository
let usersRepository: IUsersRepository

describe('Get a project (end-to-end)', () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()
  const project = ProjectFactory.create({ workspaceId: workspace.id })

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspaceRepository = new PrismaWorkspacesRepository()
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

  test('should be able to get a project', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/projects/${project.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto).toStrictEqual(project.toResponseBody())
  })

  test('should not be able to get a non existing project', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/projects/invalid-id`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a project with no authentication', async () => {
    const response = await request(app)
      .get(`/api/projects/${project.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
