import { z } from 'zod'
import { Engagements } from './engagements.enum'

export const StakeholderEngagementPlanSchema = z.object({
  stakeholderId: z.string().cuid2(),
  currentEngagement: z.nativeEnum(Engagements),
  desiredEngagement: z.nativeEnum(Engagements),
  interestLevel: z.number().int().gt(0).lt(100),
  powerLevel: z.number().int().gt(0).lt(100),
  influenceLevel: z.number().int().gt(0).lt(100),
  engagementManagementStrategy: z.string().min(3).max(2000),
  scopeImpactChangesToStakeholder: z.string().min(3).max(2000),
  observations: z.string().min(3).max(2000),
})

export type StakeholderEngagementPlanProps = z.infer<
  typeof StakeholderEngagementPlanSchema
>
