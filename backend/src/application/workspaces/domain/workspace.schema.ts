import { z } from 'zod'

import { max, min } from '@/utils/clear-html-tags'
import { PlanStatuses } from './plan-statuses.enum'
import { PlanTypes } from './plan-types.enum'

export const WorkspaceSchema = z.object({
  name: z
    .string()
    .refine(min)
    .refine((v) => max(v, 50)),
  description: z
    .string()
    .refine((v) => max(v, 500))
    .nullish(),
  plan: z.nativeEnum(PlanTypes),
  planStatus: z.nativeEnum(PlanStatuses),
})

export type WorkspaceProps = z.infer<typeof WorkspaceSchema>
