import { z } from 'zod'

export const MetricSchema = z.object({
  name: z.string().min(3).max(64),
  value: z.number(),
})

export type MetricProps = z.infer<typeof MetricSchema>
