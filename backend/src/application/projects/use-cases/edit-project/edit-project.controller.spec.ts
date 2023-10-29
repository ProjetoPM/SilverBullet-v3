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
import { PrismaProjectsRepository } from '../../repositories/prisma/PrismaProjectsRepository'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { ProjectRoles } from '../../domain/project-roles.schema'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'

let usersRepository: IUsersRepository
let projectRepository: IProjectsRepository
let workspaceRepository: IWorkspacesRepository

describe('Edit project (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const workspace = WorkspaceFactory.create()
  const project = ProjectFactory.create({ workspaceId: workspace.id })

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    projectRepository = new PrismaProjectsRepository()
    workspaceRepository = new PrismaWorkspacesRepository()

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
    await prismaClient.workspace.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.project.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to edit a project', async () => {
    const data: any = {
      name: 'test-project-edited',
      description: 'test-project-edited',
    }

    const response = await request(app)
      .put(`/api/projects/${project.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .set({ 'current-workspace-id': workspace.id })
      .send(data)

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to edit a project with no authentication', async () => {
    const data: any = {
      name: 'test-project',
      description: 'test-project',
    }

    const response = await request(app)
      .put(`/api/projects/${project.id}/edit`)
      .send(data)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
