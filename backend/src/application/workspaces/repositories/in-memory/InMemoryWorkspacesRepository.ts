import { UserWorkspace } from '../../domain/user-workspace'
import { UserWorkspaceRole } from '../../domain/user-workspace-role'
import { Workspace } from '../../domain/workspace'
import { IUserWorkspacesRepository } from '../IUserWorkspaceRepository'
import { IUserWorkspaceRolesRepository } from '../IUserWorkspaceRolesRepository'
import { IWorkspacesRepository } from '../IWorkspacesRepository'

export class InMemoryWorkspacesRepository implements IWorkspacesRepository {
  constructor(
    public workspaces: Workspace[] = [],
    private userWorkspacesRepository: IUserWorkspacesRepository,
    private userWorkspaceRolesRepository: IUserWorkspaceRolesRepository,
  ) {}

  async create(
    workspace: Workspace,
    userWorkspace: UserWorkspace,
    userWorkspaceRole: UserWorkspaceRole,
  ): Promise<void> {
    this.workspaces.push(workspace)

    await this.userWorkspacesRepository.create(userWorkspace)

    await this.userWorkspaceRolesRepository.create(userWorkspaceRole)
  }
}
