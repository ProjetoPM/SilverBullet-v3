import { StakeholderEngagementPlan as PersistenceStakeholderEngagementPlan } from '@prisma/client'
import { StakeholderEngagementPlan } from '../domain/stakeholder-engagement-plan'
import { t } from 'i18next'
import ENGAGEMENTS from '../domain/engagements.enum'

export class StakeholderEngagementPlanMapper {
  static toDomain(raw: PersistenceStakeholderEngagementPlan) {
    const StakeholderEngagementPlanOrError = StakeholderEngagementPlan.create(
      {
        stakeholderId: raw.stakeholder_id,
        currentEngagement: raw.current_engagement as unknown as ENGAGEMENTS,
        desiredEngagement: raw.desired_engagement as unknown as ENGAGEMENTS,
        interestLevel: raw.interest_level,
        powerLevel: raw.power_level,
        influenceLevel: raw.influence_level,
        engagementManagementStrategy: raw.engagement_management_strategy,
        scopeImpactChangesToStakeholder:
          raw.scope_impact_changes_to_stakeholder,
        observations: raw.observations,
      },
      raw.id,
    )

    if (StakeholderEngagementPlanOrError.isLeft()) {
      throw new Error(t('errors.invalid_stakeholderEngagementPlan'))
    }

    if (StakeholderEngagementPlanOrError.isRight()) {
      return StakeholderEngagementPlanOrError.value
    }
    return null
  }

  static async toPersistence(
    stakeholderEngagementPlan: StakeholderEngagementPlan,
  ) {
    return {
      id: stakeholderEngagementPlan.id,
      stakeholder_id: stakeholderEngagementPlan.props.stakeholderId,
      current_engagement: stakeholderEngagementPlan.props.currentEngagement,
      desired_engagement: stakeholderEngagementPlan.props.desiredEngagement,
      interest_level: stakeholderEngagementPlan.props.interestLevel,
      power_level: stakeholderEngagementPlan.props.powerLevel,
      influence_level: stakeholderEngagementPlan.props.influenceLevel,
      engagement_management_strategy:
        stakeholderEngagementPlan.props.engagementManagementStrategy,
      scope_impact_changes_to_stakeholder:
        stakeholderEngagementPlan.props.scopeImpactChangesToStakeholder,
      observations: stakeholderEngagementPlan.props.observations,
    }
  }
}
