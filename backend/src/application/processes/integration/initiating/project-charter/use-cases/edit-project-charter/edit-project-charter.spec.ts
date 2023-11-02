import { beforeAll, describe, expect, test } from 'vitest'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'

import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

import { UserFactory } from '@/tests/factories/UserFactory'
import { IWorkspacesRepository } from '@/application/workspaces/repositories/IWorkspacesRepository'
import { InMemoryWorkspacesRepository } from '@/application/workspaces/repositories/in-memory/InMemoryWorkspacesRepository'
import { IProjectChartersRepository } from '../../repositories/IProjectCharters'
import { InMemoryProjectChartersRepository } from '../../repositories/in-memory/InMemoryProjectChartersRepository'
import {
  EditProjectCharter,
  EditProjectCharterRequest,
} from './edit-project-charter'
import { WorkspaceFactory } from '@/tests/factories/WorkspaceFactory'
import { ProjectFactory } from '@/tests/factories/ProjectFactory'
import { InviteStatuses } from '@/application/workspaces/domain/invite-statuses.enum'
import { WorkspaceRoles } from '@/application/workspaces/domain/workspace-roles.schema'
import { IProjectsRepository } from '@/application/projects/repositories/IProjectsRepository'
import { ProjectRoles } from '@/application/projects/domain/project-roles.schema'
import { InMemoryProjectsRepository } from '@/application/projects/repositories/in-memory/InMemoryProjectsRepository'
import { ProjectCharterFactory } from '@/tests/factories/ProjectCharterFactory'

let workspacesRepository: IWorkspacesRepository
let projectsRepository: IProjectsRepository
let projectCharterRepository: IProjectChartersRepository
let usersRepository: IUsersRepository
let editProjectCharter: EditProjectCharter

describe('Edit a project charter', async () => {
  const user = UserFactory.create()
  const workspace = WorkspaceFactory.create()
  const project = ProjectFactory.create({ workspaceId: workspace.id })
  const projectCharter = ProjectCharterFactory.create({ projectId: project.id })

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
    projectsRepository = new InMemoryProjectsRepository()
    await projectsRepository.create(project, user, InviteStatuses.ACTIVE, [
      ProjectRoles.ADMIN,
    ])
    projectCharterRepository = new InMemoryProjectChartersRepository()
    await projectCharterRepository.create(projectCharter)

    editProjectCharter = new EditProjectCharter(
      projectsRepository,
      projectCharterRepository,
      usersRepository,
    )
  })

  test('should edit a project charter', async () => {
    const data: EditProjectCharterRequest = {
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
      projectCharterId: projectCharter.id,
      userId: user.id,
    }

    const response = await editProjectCharter.execute(data)
    expect(response.isRight()).toBeTruthy()
  })
})
