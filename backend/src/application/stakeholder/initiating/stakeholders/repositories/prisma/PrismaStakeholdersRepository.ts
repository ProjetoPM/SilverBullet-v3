import { prismaClient } from '@/infra/prisma/client'
import { Stakeholder } from '../../domain/stakeholder'
import { StakeholderMapper } from '../../mappers/stakeholder-mapper'
import { IStakeholdersRepository } from '../IStakeholdersRepository'

export class PrismaStakeholdersRepository implements IStakeholdersRepository {
  async findByEmail(id: string): Promise<Stakeholder | null> {
    const stakeholder = await prismaClient.stakeholder.findUnique({
      where: {
        id,
      },
    })

    if (!stakeholder) return null

    return StakeholderMapper.toDomain(stakeholder)
  }

  async create(stakeholder: Stakeholder): Promise<void> {
    const data = await StakeholderMapper.toPersistence(stakeholder)

    await prismaClient.stakeholder.create(data)
  }
}
