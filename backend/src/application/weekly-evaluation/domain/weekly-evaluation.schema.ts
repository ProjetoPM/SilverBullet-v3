import { z } from 'zod'
import { Types } from './types.enum'
import { EvaluationStatuses } from './evaluation-statuses.enum'

export const WeeklyEvaluationSchema = z.object({
  name: z.string().min(3).max(64),
  startDate: z.date(),
  endDate: z.date(),
  type: z.nativeEnum(Types),
  status: z.nativeEnum(EvaluationStatuses),
  workspaceId: z.string().uuid(),
})

export type WeeklyEvaluationProps = z.infer<typeof WeeklyEvaluationSchema>
