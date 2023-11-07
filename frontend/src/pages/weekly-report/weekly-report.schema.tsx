import { Workspace } from '@/stores/useWorkspaceStore'
import { max, message } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const WeeklyReportSchema = z.object({
  projectId: z
    .string()
    .uuid()
    .default(Workspace.getWorkspace()?.id ?? 'error')
    .readonly(),
  weeklyEvaluationId: z.string().uuid(),
  toolEvaluation: z
    .string()
    .refine((v) => max(v, 1000), message('max', 1000))
    .optional(),
  processes: z.array(
    z.object({
      group: z.string().uuid(),
      name: z.string().uuid(),
      description: z.string().refine((v) => max(v, 1000), message('max', 1000)),
      filesFolder: z.string().optional()
    })
  )
})

export type WeeklyReportData = z.infer<typeof WeeklyReportSchema>
export type WeeklyReportDataWithId = WeeklyReportData & { id: string }
