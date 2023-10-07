import { z } from 'zod'

// @Todo
// Talvez colocar em uma pasta relaciona a segurança o enum
import PROJECT_ROLES from './roles.schema'

export const UserProjectRoleSchema = z.object({
  userProjectId: z.string().uuid({ message: 'Invalid id for user project' }),
  role: z.nativeEnum(PROJECT_ROLES),
})

export type UserProjectRoleProps = z.infer<typeof UserProjectRoleSchema>
