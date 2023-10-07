import { prismaClient } from '@/infra/prisma/client'
import { Stakeholder } from '../../domain/stakeholder'
import { StakeholderMapper } from '../../mappers/stakeholder-mapper'
import { IStakeholdersRepository } from '../IStakeholdersRepository'

export class PrismaStakeholdersRepository implements IStakeholdersRepository {
  findById(id: string): Promise<Stakeholder | null> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(id: string): Promise<Stakeholder | null> {
    const stakeholder = await prismaClient.stakeholder.findUnique({
      where: {
        id,
      },
    })

    if (!stakeholder) {
      return null
    }

    return StakeholderMapper.toDomain(stakeholder)
  }

  async exists(id: string): Promise<boolean> {
    const stakeholderExists = await prismaClient.stakeholder.findUnique({
      where: {
        id,
      },
    })

    return !!stakeholderExists
  }

  async create(stakeholder: Stakeholder): Promise<string | null> {
    const data = await StakeholderMapper.toPersistence(stakeholder)

    const { id } = await prismaClient.stakeholder.create({
      data,
    })

    if (!id) return null

    return id
  }
}
