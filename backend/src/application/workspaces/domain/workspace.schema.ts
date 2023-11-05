import { z } from 'zod'

import { PlanTypes } from './plan-types.enum'
import { PlanStatuses } from './plan-statuses.enum'

export const WorkspaceSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().min(3).max(500).nullish(),
  plan: z.nativeEnum(PlanTypes),
  planStatus: z.nativeEnum(PlanStatuses),
})

export type WorkspaceProps = z.infer<typeof WorkspaceSchema>
