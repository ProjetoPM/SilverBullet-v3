import { StakeholderEngagementPlan } from '../domain/stakeholder-engagement-plan'

export class StakeholderEngagementPlanUtils {
  async findByEmail(stakeholderEngagementPlans: StakeholderEngagementPlan[]) {
    const stakeholderEngagementPlan = stakeholderEngagementPlans.pop()

    if (!stakeholderEngagementPlans) return null

    return stakeholderEngagementPlan
  }
}
