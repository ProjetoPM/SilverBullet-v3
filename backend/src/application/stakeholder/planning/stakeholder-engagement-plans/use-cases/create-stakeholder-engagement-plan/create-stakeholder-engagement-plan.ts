import { Either, left, right } from '@/core/logic/either'
import { StakeholderEngagementPlan } from '../../domain/stakeholder-engagement-plan'
import { IStakeholderEngagementPlansRepository } from '../../repositories/IStakeholderEngagementPlansRepository'
import { StakeholderDoesNotExistError } from '../get-last-stakeholder-engagement-plan/errors/StakeholderDoesNotExistError'
import { Engagements } from '../../domain/engagements.enum'

type CreateStakeholderRequest = {
  stakeholderId: string
  currentEngagement: Engagements
  desiredEngagement: Engagements
  interestLevel: number
  powerLevel: number
  influenceLevel: number
  engagementManagementStrategy: string
  scopeImpactChangesToStakeholder: string
  observations: string
}

// @TODO
// Verify null userId
type CreateStakeholderResponse = Either<
  StakeholderDoesNotExistError,
  StakeholderEngagementPlan
>

export class CreateStakeholderEngagementPlan {
  constructor(
    private stakeholderEngagementPlansRepository: IStakeholderEngagementPlansRepository,
  ) {}

  async execute({
    stakeholderId,
    currentEngagement,
    desiredEngagement,
    interestLevel,
    powerLevel,
    influenceLevel,
    engagementManagementStrategy,
    scopeImpactChangesToStakeholder,
    observations,
  }: CreateStakeholderRequest): Promise<CreateStakeholderResponse> {
    const stakeholderEngagementPlanOrError = StakeholderEngagementPlan.create({
      stakeholderId,
      currentEngagement,
      desiredEngagement,
      interestLevel,
      powerLevel,
      influenceLevel,
      engagementManagementStrategy,
      scopeImpactChangesToStakeholder,
      observations,
    })

    if (stakeholderEngagementPlanOrError.isLeft()) {
      return left(stakeholderEngagementPlanOrError.value)
    }

    const stakeholderEngagementPlan = stakeholderEngagementPlanOrError.value

    await this.stakeholderEngagementPlansRepository.create(
      stakeholderEngagementPlan,
    )

    return right(stakeholderEngagementPlan)
  }
}
