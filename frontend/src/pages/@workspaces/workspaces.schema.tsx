import { max, message, min, required } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const WorkspaceSchema = z.object({
  name: z
    .string()
    .refine((v) => min(v, 1), required)
    .refine((v) => max(v, 100), message('max', 100)),
  description: z
    .string()
    .refine((v) => max(v, 1000))
    .optional()
})

export type WorkspaceData = z.infer<typeof WorkspaceSchema>
export type WorkspaceDataWithId = WorkspaceData & { id: string }
