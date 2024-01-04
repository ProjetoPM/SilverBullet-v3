import { max, message, min, required } from '@/utils/helpers/replace-html-tags'
import { z } from 'zod'

export const ProjectSchema = z.object({
  _id: z.string().uuid().nullish(),
  name: z
    .string()
    .refine(min, required)
    .refine((v) => max(v, 64), message('max', 64)),
  description: z
    .string()
    .refine((v) => max(v, 1000), message('max', 1000))
    .nullish()
})

export type ProjectData = z.infer<typeof ProjectSchema>
