import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(1).max(64),
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(64),
  confirmPassword: z.string().min(1).max(64)
})

export type SignUp = z.infer<typeof SignUpSchema>
