import { min } from '@/utils/clear-html-tags'
import { z } from 'zod'
import { max } from '../../../utils/clear-html-tags'

export const ProjectSchema = z.object({
  name: z
    .string()
    .refine(min)
    .refine((v) => max(v, 50)),
  description: z
    .string()
    .refine((v) => max(v, 500))
    .nullish(),
  workspaceId: z.string().cuid2({ message: 'Invalid id for workspace' }),
})

export type ProjectProps = z.infer<typeof ProjectSchema>
