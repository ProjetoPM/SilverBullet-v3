import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(64),
  rememberMe: z.boolean().optional()
})

export type SignIn = z.infer<typeof SignInSchema>
