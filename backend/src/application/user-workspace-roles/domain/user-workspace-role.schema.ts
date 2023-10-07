import { z } from 'zod'

// @Todo
// Talvez colocar em uma pasta relaciona a segurança o enum
import ROLES from './roles.schema'

export const UserWorkspaceRoleSchema = z.object({
  userWorkspaceId: z
    .string()
    .uuid({ message: 'Invalid id for user workspace' }),
  role: z.nativeEnum(ROLES),
})

export type UserWorkspaceRoleProps = z.infer<typeof UserWorkspaceRoleSchema>
