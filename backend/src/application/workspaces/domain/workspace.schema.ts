import { z } from 'zod'

import { PlanTypes } from './plan-types.enum'
import { PlanStatuses } from './plan-statuses.enum'
import { MetricSchema } from './metric.schema'

export const WorkspaceSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().min(3).max(500).nullish(),
  plan: z.nativeEnum(PlanTypes),
  planStatus: z.nativeEnum(PlanStatuses),
  metrics: MetricSchema,
})

export type WorkspaceProps = z.infer<typeof WorkspaceSchema>
