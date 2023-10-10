import { prismaClient } from '@/infra/prisma/client'
import { Workspace } from '../../domain/workspace'
import { WorkspaceMapper } from '../../mappers/workspace-mapper'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { IUserWorkspaceRolesRepository } from '../IUserWorkspaceRolesRepository'
import { IUserWorkspacesRepository } from '../IUserWorkspaceRepository'
import { UserWorkspace } from '../../domain/user-workspace'
import { UserWorkspaceRole } from '../../domain/user-workspace-role'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
  constructor(
    private userWorkspacesRepository: IUserWorkspacesRepository,
    private userWorkspaceRolesRepository: IUserWorkspaceRolesRepository,
  ) {}

  async create(
    workspace: Workspace,
    userWorkspace: UserWorkspace,
    userWorkspaceRole: UserWorkspaceRole,
  ): Promise<void> {
    const data = await WorkspaceMapper.toPersistence(workspace)

    await prismaClient.workspace.create({
      data,
    })

    await this.userWorkspacesRepository.create(userWorkspace)

    await this.userWorkspaceRolesRepository.create(userWorkspaceRole)
  }

  async findById(id: string): Promise<Workspace | null> {
    const data = await prismaClient.workspace.findUnique({ where: { id: id } })

    if (!data) return null

    return WorkspaceMapper.toDomain(data)
  }
}
