import { max, message, min, required } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const ProjectSchema = z.object({
  name: z
    .string()
    .refine((v) => min(v, 1), required)
    .refine((v) => max(v, 100), message('max', 100)),
  description: z
    .string()
    .refine((v) => max(v, 1000), message('max', 1000))
    .nullish()
})

export type ProjectData = z.infer<typeof ProjectSchema>
export type ProjectDataWithId = ProjectData & { id: string }
