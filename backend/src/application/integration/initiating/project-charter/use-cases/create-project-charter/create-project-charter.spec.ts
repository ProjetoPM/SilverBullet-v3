import { afterEach, beforeAll, describe, expect, test } from 'vitest'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { UserFactory } from '@/tests/factories/UserFactory'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { IProjectChartersRepository } from '../../repositories/IProjectCharters'
import { InMemoryProjectChartersRepository } from '../../repositories/in-memory/InMemoryProjectChartersRepository'
import { CreateProjectCharter } from './create-project-charter'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { ProjectRoles } from '@/application/projects/domain/project-roles.schema'
import { InMemoryProjectsRepository } from '@/application/projects/repositories/in-memory/InMemoryProjectsRepository'
import { ProjectCharterFactory } from '@/tests/factories/ProjectCharterFactory'
import { DuplicatedProjectCharterError } from './errors/DuplicatedProjectCharterError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { ProjectDoesNotExistError } from './errors/ProjectDoesNotExistError'

let workspacesRepository: IWorkspacesRepository
let projectsRepository: IProjectsRepository
let projectCharterRepository: IProjectChartersRepository
let usersRepository: IUsersRepository
let createProjectCharter: CreateProjectCharter

describe('Create a project charter', async () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()
  const project = ProjectFactory.create({ workspaceId: workspace.id })

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    workspacesRepository = new InMemoryWorkspacesRepository()
    await workspacesRepository.create(
      workspace,
      user,
      InviteStatuses.ACTIVE,
      WorkspaceRoles.ADMIN,
    )
    projectCharterRepository = new InMemoryProjectChartersRepository()
    projectsRepository = new InMemoryProjectsRepository()
    await projectsRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])

    createProjectCharter = new CreateProjectCharter(
      projectsRepository,
      projectCharterRepository,
      usersRepository,
    )
  })

  afterEach(async () => {
    await projectCharterRepository.deleteAll()
  })

  test('should create a project charter', async () => {
    const data = {
      projectName: 'string',
      highLevelProjectDescription: 'string',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 192),
      projectPurpose: 'string',
      measurableProjectObjectives: 'string',
      keyBenefits: 'string',
      highLevelRequirements: 'string',
      boundaries: 'string',
      overallProjectRisk: 'string',
      summaryMilestoneSchedule: 'string',
      preApprovedFinancialResources: 'string',
      projectApprovalRequirements: 'string',
      successCriteria: 'string',
      projectExitCriteria: 'string',
      signed: false,
      projectId: project.id,
      userId: user.id,
    }

    const response = await createProjectCharter.execute(data)
    expect(response.isRight()).toBeTruthy()
  })
  test('should not create a project charter with inexistent user', async () => {
    const data = {
      projectName: 'string',
      highLevelProjectDescription: 'string',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 192),
      projectPurpose: 'string',
      measurableProjectObjectives: 'string',
      keyBenefits: 'string',
      highLevelRequirements: 'string',
      boundaries: 'string',
      overallProjectRisk: 'string',
      summaryMilestoneSchedule: 'string',
      preApprovedFinancialResources: 'string',
      projectApprovalRequirements: 'string',
      successCriteria: 'string',
      projectExitCriteria: 'string',
      signed: false,
      projectId: project.id,
      userId: 'inexistent user',
    }

    const response = await createProjectCharter.execute(data)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new UserDoesNotExistError())
  })

  test('should not create a project charter with inexistent project', async () => {
    const data = {
      projectName: 'string',
      highLevelProjectDescription: 'string',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 192),
      projectPurpose: 'string',
      measurableProjectObjectives: 'string',
      keyBenefits: 'string',
      highLevelRequirements: 'string',
      boundaries: 'string',
      overallProjectRisk: 'string',
      summaryMilestoneSchedule: 'string',
      preApprovedFinancialResources: 'string',
      projectApprovalRequirements: 'string',
      successCriteria: 'string',
      projectExitCriteria: 'string',
      signed: false,
      projectId: 'inexistent project',
      userId: user.id,
    }

    const response = await createProjectCharter.execute(data)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new ProjectDoesNotExistError())
  })

  test('should not create more than one project charter in a project', async () => {
    const projectCharter = ProjectCharterFactory.create({
      projectId: project.id,
    })
    await projectCharterRepository.create(projectCharter)

    const data = {
      projectName: 'string',
      highLevelProjectDescription: 'string',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 192),
      projectPurpose: 'string',
      measurableProjectObjectives: 'string',
      keyBenefits: 'string',
      highLevelRequirements: 'string',
      boundaries: 'string',
      overallProjectRisk: 'string',
      summaryMilestoneSchedule: 'string',
      preApprovedFinancialResources: 'string',
      projectApprovalRequirements: 'string',
      successCriteria: 'string',
      projectExitCriteria: 'string',
      signed: false,
      projectId: project.id,
      userId: user.id,
    }

    const response = await createProjectCharter.execute(data)
    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new DuplicatedProjectCharterError())
  })
})
