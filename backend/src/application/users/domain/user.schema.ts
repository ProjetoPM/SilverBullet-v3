import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1).max(64),
  email: z.string().email(),
  password: z.string().min(1).max(64),
  phone: z.string().max(255).optional(),
})

export type UserProps = z.infer<typeof UserSchema>
