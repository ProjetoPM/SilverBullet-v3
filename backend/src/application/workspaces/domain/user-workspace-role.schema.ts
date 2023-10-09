import { z } from 'zod'

// @Todo
// Talvez colocar em uma pasta relaciona a segurança o enum
import ROLES from './roles.schema'

export const UserWorkspaceRoleSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid id for user' }),
  workspaceId: z.string().uuid({ message: 'Invalid id for workspace' }),
  role: z.nativeEnum(ROLES),
})

export type UserWorkspaceRoleProps = z.infer<typeof UserWorkspaceRoleSchema>
