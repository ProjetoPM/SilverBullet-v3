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
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { PrismaProjectsRepository } from '../../repositories/prisma/PrismaProjectsRepository'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'

let projectIds: string[] = []
let usersRepository: IUsersRepository
let workspacesRepository: IWorkspacesRepository
let projectsRepository: IProjectsRepository

describe('List projects (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const workspace = WorkspaceFactory.create()

  const projects = [
    ProjectFactory.create({ name: 'project1', workspaceId: workspace.id }),
    ProjectFactory.create({ name: 'project2', workspaceId: workspace.id }),
    ProjectFactory.create({ name: 'project3', workspaceId: workspace.id }),
  ]

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    workspacesRepository = new PrismaWorkspacesRepository()
    projectsRepository = new PrismaProjectsRepository()
    await usersRepository.create(user)

    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )

    for (const project of projects) {
      await projectsRepository.create(project, user, InviteStatuses.ACTIVE, [
        ProjectRoles.ADMIN,
      ])
      projectIds.push(project.id)
    }
  })

  afterAll(async () => {
    await prismaClient.workspace.delete({
      where: {
        id: workspace.id,
      },
    })

    await prismaClient.project.deleteMany({
      where: { id: { in: projectIds } },
    })
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to list projects', async () => {
    const response = await request(app)
      .get(`/api/projects`)
      .set({ 'current-workspace-id': workspace.id })
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.dto.length > 0).toBeTruthy()
  })

  test('should not be able to list projects without authorization', async () => {
    const response = await request(app)
    .get(
      `/api/projects/${workspace.id}/workspaces`,
    )
    .set({ 'current-workspace-id': workspace.id })


    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
