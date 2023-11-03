import { ProjectRoles } from '@/application/projects/domain/project-roles.schema'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { PrismaProjectsRepository } from '@/application/projects/repositories/prisma/PrismaProjectsRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { PrismaWorkspacesRepository } from '@/application/workspaces/repositories/prisma/PrismaWorkspacesRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { ProjectCharterFactory } from '@/tests/factories/ProjectCharterFactory'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let usersRepository: IUsersRepository
let workspaceRepository: IWorkspacesRepository
let projectRepository: IProjectsRepository

describe('Create project charter (end-to-end)', async () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const workspace = WorkspaceFactory.create()
  const project = ProjectFactory.create({ workspaceId: workspace.id })
  const projectCharter = ProjectCharterFactory.create({ projectId: project.id })

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
    await prismaClient.workspace.deleteMany({
      where: { name: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } },
    })
  })

  test('should be able to create a project charter', async () => {
    const data: any = {
      projectName: 'test-projectName',
      highLevelProjectDescription: 'test-highLevelProjectDescription',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90),
      projectPurpose: 'test-projectPurpose',
      measurableProjectObjectives: 'test-measurableProjectObjectives',
      keyBenefits: 'test-keyBenefits',
      highLevelRequirements: 'test-highLevelRequirements',
      boundaries: 'test-boundaries',
      overallProjectRisk: 'test-overallProjectRisk',
      summaryMilestoneSchedule: 'test-summaryMilestoneSchedule',
      preApprovedFinancialResources: 'test-preApprovedFinancialResources',
      projectApprovalRequirements: 'test-projectApprovalRequirements',
      successCriteria: 'test-successCriteria',
      projectExitCriteria: 'test-projectExitCriteria',
    }

    const response = await request(app)
      .post('/api/project-charters/new')
      .auth(jwt.token, { type: 'bearer' })
      .set({ 'current-project-id': project.id })
      .send(data)

    console.log(response.body)

    expect(response.status).toBe(StatusCodes.CREATED)

    await prismaClient.projectCharter.deleteMany({
      where: { project_name: { contains: 'test' } },
    })
  })
  test('should not be able to create a project charter with the signed attribute', async () => {
    const data: any = {
      projectName: 'test-projectName',
      highLevelProjectDescription: 'test-highLevelProjectDescription',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90),
      projectPurpose: 'test-projectPurpose',
      measurableProjectObjectives: 'test-measurableProjectObjectives',
      keyBenefits: 'test-keyBenefits',
      highLevelRequirements: 'test-highLevelRequirements',
      boundaries: 'test-boundaries',
      overallProjectRisk: 'test-overallProjectRisk',
      summaryMilestoneSchedule: 'test-summaryMilestoneSchedule',
      preApprovedFinancialResources: 'test-preApprovedFinancialResources',
      projectApprovalRequirements: 'test-projectApprovalRequirements',
      successCriteria: 'test-successCriteria',
      projectExitCriteria: 'test-projectExitCriteria',
      signed: true,
    }

    const response = await request(app)
      .post('/api/project-charters/new')
      .auth(jwt.token, { type: 'bearer' })
      .set({ 'current-project-id': project.id })
      .send(data)

    console.log(response.body)

    expect(response.status).toBe(StatusCodes.CREATED)
  })

  test('should not be able to create a project charter with invalid date', async () => {
    const data: any = {
      projectName: 'test-projectName',
      highLevelProjectDescription: 'test-highLevelProjectDescription',
      startDate: 'invalid-date',
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90),
      projectPurpose: 'test-projectPurpose',
      measurableProjectObjectives: 'test-measurableProjectObjectives',
      keyBenefits: 'test-keyBenefits',
      highLevelRequirements: 'test-highLevelRequirements',
      boundaries: 'test-boundaries',
      overallProjectRisk: 'test-overallProjectRisk',
      summaryMilestoneSchedule: 'test-summaryMilestoneSchedule',
      preApprovedFinancialResources: 'test-preApprovedFinancialResources',
      projectApprovalRequirements: 'test-projectApprovalRequirements',
      successCriteria: 'test-successCriteria',
      projectExitCriteria: 'test-projectExitCriteria',
    }

    const response = await request(app)
      .post('/api/project-charters/new')
      .auth(jwt.token, { type: 'bearer' })
      .set({ 'current-project-id': project.id })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('date.invalid')
  })

  test('should not be able to create a project charter with no authentication', async () => {
    const data: any = {
      name: 'test-workspace',
      description: 'a simple workspace',
    }

    const response = await request(app)
      .post('/api/project-charters/new')
      .send(data)
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
