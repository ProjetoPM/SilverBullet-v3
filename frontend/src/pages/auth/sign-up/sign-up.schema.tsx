import { required } from '@/utils/helpers/replace-html-tags'
import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(1).max(64),
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string().min(3).max(64),
  confirmPassword: z.string().min(1).max(64),
  termsAndConditions: z.boolean().refine((v) => !!v, required)
})

export type SignUp = z.infer<typeof SignUpSchema>
