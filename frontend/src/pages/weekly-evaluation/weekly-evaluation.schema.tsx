import { z } from 'zod'

export const WeeklyReportSchema = z.object({
  single: z.coerce.date(),
  range: z.object({
    from: z.coerce.date(),
    to: z.coerce.date()
  })
})

export type WeeklyReportData = z.infer<typeof WeeklyReportSchema>
