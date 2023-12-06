import { min, required } from '@/utils/helpers/replace-html-tags'
import { z } from 'zod'

enum WeeklyEvaluationStatus {
  OPEN,
  CLOSED
}

export const WeeklyReportSchema = z.object({
  _id: z.string().uuid().nullish(),
  evaluationName: z.string().refine(min, required),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  deadline: z.coerce.date(),
  type: z.string().uuid(),
  status: z.nativeEnum(WeeklyEvaluationStatus),
  scoreMetricId: z.string().uuid()
})

export type WeeklyReportData = z.infer<typeof WeeklyReportSchema>
