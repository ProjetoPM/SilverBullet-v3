import { max, message, min, required } from '@/utils/helpers/replace-html-tags'
import { z } from 'zod'

const _max = {
  name: 50,
  description: 500
}

export const WorkspaceSchema = z.object({
  _id: z.string().cuid2().nullish(),
  name: z
    .string()
    .refine(min, required)
    .refine((v) => max(v, _max.name), message('max', _max.name)),
  description: z
    .string()
    .refine((v) => max(v, _max.description), message('max', _max.description))
    .nullish()
})

export { _max as WorkspaceLimits }
export type WorkspaceData = z.infer<typeof WorkspaceSchema>
