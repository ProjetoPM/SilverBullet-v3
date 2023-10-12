import { prismaClient } from '@/infra/prisma/client'
import { Workspace } from '../../domain/workspace'
import { WorkspaceMapper } from '../../mappers/workspace-mapper'
import { IWorkspacesRepository } from '../IWorkspacesRepository'
import { Roles } from '../../domain/roles.schema'
import { User } from '@/application/users/domain/user'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
  async create(workspace: Workspace, user: User, role: Roles): Promise<void> {
    const persistenceWorkspace = await WorkspaceMapper.toPersistence(workspace)

    await prismaClient.workspace.create({
      data: {
        ...persistenceWorkspace,
        UserWorkspace: {
          create: {
            user_id: user.id,
            status: 'ACTIVE',
            role: 'ADMIN',
          },
        },
      },
    })
  }

  async findById(id: string): Promise<Workspace | null> {
    const data = await prismaClient.workspace.findUnique({ where: { id: id } })

    if (!data) return null

    return WorkspaceMapper.toDomain(data)
  }
}
