import { z } from 'zod'
import { Types } from './types.enum'
import { Status } from './status.enum'

export const WeeklyEvaluationSchema = z.object({
  name: z.string().min(3).max(64),
  startDate: z.date(),
  endDate: z.date(),
  deadline: z.date(),
  type: z.nativeEnum(Types),
  status: z.nativeEnum(Status),
})

export type WeeklyEvaluationProps = z.infer<typeof WeeklyEvaluationSchema>
