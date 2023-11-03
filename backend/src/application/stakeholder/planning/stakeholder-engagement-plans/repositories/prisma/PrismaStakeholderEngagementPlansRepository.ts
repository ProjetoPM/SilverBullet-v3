import { prismaClient } from '@/infra/prisma/client'
import { StakeholderEngagementPlan } from '../../domain/stakeholder-engagement-plan'
import { StakeholderEngagementPlanMapper } from '../../mappers/stakeholder-mapper'
import { IStakeholderEngagementPlansRepository } from '../IStakeholderEngagementPlansRepository'

export class PrismaStakeholderEngagementPlansRepository
  implements IStakeholderEngagementPlansRepository
{
  findById(id: string): Promise<StakeholderEngagementPlan | null> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(id: string): Promise<StakeholderEngagementPlan | null> {
    const stakeholderEngagementPlan =
      await prismaClient.stakeholderEngagementPlan.findUnique({
        where: {
          id,
        },
      })

    if (!stakeholderEngagementPlan) {
      return null
    }

    return StakeholderEngagementPlanMapper.toDomain(stakeholderEngagementPlan)
  }

  async exists(id: string): Promise<boolean> {
    const stakeholderExists =
      await prismaClient.stakeholderEngagementPlan.findUnique({
        where: {
          id,
        },
      })

    return !!stakeholderExists
  }

  async create(stakeholder: StakeholderEngagementPlan): Promise<string | null> {
    const data =
      await StakeholderEngagementPlanMapper.toPersistence(stakeholder)

    const { id } = await prismaClient.stakeholderEngagementPlan.create({
      data,
    })

    if (!id) return null

    return id
  }

  async findAllByStakeholderId(
    stakeholderId: string,
  ): Promise<StakeholderEngagementPlan[] | null> {
    let stakeholderEngagementsPlan: StakeholderEngagementPlan[] = []

    const data = await prismaClient.stakeholderEngagementPlan.findMany({
      where: {
        stakeholder_id: stakeholderId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    if (!data) return null

    for (let index = 0; index < data.length; index++) {
      const dbStakeholderEngagementPlan = data[index]

      const stakeholderEngagementPlan =
        StakeholderEngagementPlanMapper.toDomain(dbStakeholderEngagementPlan)
      if (!stakeholderEngagementPlan) break

      stakeholderEngagementsPlan.push(stakeholderEngagementPlan)
    }

    return stakeholderEngagementsPlan
  }
}
