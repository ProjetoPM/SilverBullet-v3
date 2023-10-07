import { z } from 'zod'

import INVITE_STATUSES from './invite-status.enum'

export const UserWorkspaceSchema = z.object({
  workspaceId: z.string().uuid({ message: 'Invalid id for workspace' }),
  userId: z.string().uuid({ message: 'Invalid id for user' }),
  status: z.nativeEnum(INVITE_STATUSES),
})

export type UserWorkspaceProps = z.infer<typeof UserWorkspaceSchema>
