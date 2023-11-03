import { StakeholderEngagementPlan } from '../../domain/stakeholder-engagement-plan'
import { IStakeholderEngagementPlansRepository } from '../IStakeholderEngagementPlansRepository'

export class InMemoryStakeholdersRepository
  implements IStakeholderEngagementPlansRepository
{
  constructor(public stakeholders: StakeholderEngagementPlan[] = []) {}

  async save(stakeholder: StakeholderEngagementPlan): Promise<void> {
    const stakeholderIndex = this.stakeholders.findIndex(
      (stakeholder) => stakeholder.id === stakeholder.id,
    )
    this.stakeholders[stakeholderIndex] = stakeholder
  }

  async create(stakeholder: StakeholderEngagementPlan): Promise<string | null> {
    this.stakeholders.push(stakeholder)

    const dbStakeholder = this.stakeholders.pop()

    if (!dbStakeholder) return null

    return dbStakeholder.id
  }

  async findById(id: string): Promise<StakeholderEngagementPlan | null> {
    const stakeholder = this.stakeholders.find(
      (stakeholder) => stakeholder.id === id,
    )

    if (!stakeholder) return null

    return stakeholder
  }
}
