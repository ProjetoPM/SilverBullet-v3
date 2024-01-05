import { z } from 'zod'

export const ProjectSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().min(3).max(500).nullish(),
  workspaceId: z.string().cuid2({ message: 'Invalid id for workspace' }),
})

export type ProjectProps = z.infer<typeof ProjectSchema>
