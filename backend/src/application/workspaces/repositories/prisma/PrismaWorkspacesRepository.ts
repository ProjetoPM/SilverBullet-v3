import { prismaClient } from '@/infra/prisma/client'
import { Workspace } from '../../domain/workspace'
import { WorkspaceMapper } from '../../mappers/workspace-mapper'
import { IWorkspacesRepository } from '../IWorkspacesRepository'

export class PrismaWorkspacesRepository implements IWorkspacesRepository {
  async create(workspace: Workspace): Promise<void> {
    const data = await WorkspaceMapper.toPersistence(workspace)

    await prismaClient.workspace.create({
      data,
    })
  }
}
