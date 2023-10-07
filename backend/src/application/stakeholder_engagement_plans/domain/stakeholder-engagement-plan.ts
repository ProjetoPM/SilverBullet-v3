import {
  StakeholderEngagementPlanProps,
  StakeholderEngagementPlanSchema,
} from './stakeholder-engagement-plan.schema'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'

export class StakeholderEngagementPlan extends Entity<StakeholderEngagementPlanProps> {
  private constructor(props: StakeholderEngagementPlanProps, id?: string) {
    super(props, id)
  }

  static create(
    props: StakeholderEngagementPlanProps,
    id?: string,
  ): Either<Error, StakeholderEngagementPlan> {
    const result = StakeholderEngagementPlanSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new StakeholderEngagementPlan(result.data, id))
  }
}
