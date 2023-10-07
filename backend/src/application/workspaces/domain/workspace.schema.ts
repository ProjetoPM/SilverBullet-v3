import { z } from 'zod'

import PLANS from './plans.enum'
import PLAN_STATUSES from './plan-statuses.enum'

export const WorkspaceSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().min(3).max(500).nullish(),
  plan: z.nativeEnum(PLANS),
  planStatus: z.nativeEnum(PLAN_STATUSES),
})

export type WorkspaceProps = z.infer<typeof WorkspaceSchema>
