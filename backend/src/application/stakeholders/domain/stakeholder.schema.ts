import { z } from 'zod'
import TYPES from './types.enum'
import ROLES from './roles.enum'

export const StakeholderSchema = z.object({
  type: z.nativeEnum(TYPES),
  mainProjectRole: z.nativeEnum(ROLES),
  email: z.string().min(3).max(255),
  organization: z.string().min(3).max(255),
  organizationPosition: z.string().min(3).max(255),
  mainProjectResponsibility: z.string().min(3).max(255),
  phone: z.string().min(3).max(13),
  workplace: z.string().min(3).max(255),
  essentialRequirements: z.string().min(3).max(2000),
  mainExpectations: z.string().min(3).max(2000),
  greaterInterestPhase: z.string().min(3).max(255),
  observations: z.string().min(3).max(2000),
  projectId: z.string().uuid({ message: 'Invalid id for project' }),
  userId: z.string().uuid({ message: 'Invalid id for user' }).nullish(),
})

export type StakeholderProps = z.infer<typeof StakeholderSchema>
