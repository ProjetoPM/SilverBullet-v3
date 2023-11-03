import { StakeholderEngagementPlan } from '../domain/stakeholder-engagement-plan'

export interface IStakeholderEngagementPlansRepository {
  create(
    stakeholderEngagementPlan: StakeholderEngagementPlan,
  ): Promise<string | null>
  findById(id: string): Promise<StakeholderEngagementPlan | null>
}
