import { z } from 'zod'

import INVITE_STATUSES from './invite-statuses.enum'

export const UserProjectSchema = z.object({
  projectId: z.string().uuid({ message: 'Invalid id for project' }),
  userId: z.string().uuid({ message: 'Invalid id for user' }),
  status: z.nativeEnum(INVITE_STATUSES),
})

export type UserProjectProps = z.infer<typeof UserProjectSchema>
