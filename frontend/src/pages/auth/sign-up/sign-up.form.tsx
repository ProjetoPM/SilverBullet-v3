import { InputPassword } from '@/components/ui/input/InputPassword'
import { Text } from '@/components/ui/label/Text'
import { useAuth } from '@/hooks/useAuth'
import { frontend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { PasswordChecker } from '../components/PasswordChecker'
import { SignUp, SignUpSchema } from './sign-up.schema'

export const SignUpForm = () => {
  const { t } = useTranslation('auth')
  const { signUp } = useAuth()

  const form = useForm<SignUp>({
    mode: 'all',
    resolver: zodResolver(SignUpSchema)
  })

  const onSubmit = async (data: SignUp) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t('sign_up.passwords_dont_match'))
      return
    }
    await signUp.mutateAsync(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <Card className="pb-3 dark:bg-default-100/60">
        <CardHeader className="ml-2 flex gap-4">
          <div className="flex flex-col gap-0.{5}">
            <h1 className="text-2xl font-bold">{t('sign_up.title')}</h1>
            <p className="text-sm">{t('sign_up.description')}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('name')}
                type="text"
                label={t('name.label')}
                placeholder={t('name.placeholder')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.name?.message}
                autoComplete="name"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...form.register('email')}
                type="text"
                label={t('email.label')}
                placeholder={t('email.placeholder')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.email?.message}
                autoComplete="email"
                isRequired
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <InputPassword
                {...form.register('password')}
                label={t('password.label')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.password?.message}
                isRequired
              />
              <PasswordChecker
                className="absolute top-0 right-0"
                password={form.watch('password')}
              />
            </div>
            <div className="flex flex-col gap-1">
              <InputPassword
                {...form.register('confirmPassword')}
                label={t('password_check.label')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.confirmPassword?.message}
                isRequired
              />
            </div>
            <Controller
              control={form.control}
              name="termsAndConditions"
              render={({ field: { value, onChange, ...rest } }) => (
                <Checkbox
                  color="primary"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  {...rest}
                  isRequired
                >
                  <Text size="sm" isRequired>
                    {t('terms_and_conditions.label')}
                  </Text>
                  <Text size="xs" as="p" isInvalid>
                    {form.formState.errors.termsAndConditions?.message}
                  </Text>
                </Checkbox>
              )}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            isLoading={signUp.isLoading}
            fullWidth
          >
            {t('sign_up.btn')}
          </Button>
        </CardFooter>
        <Link
          href={frontend.auth.sign_in.index}
          color="primary"
          showAnchorIcon
          className="mx-auto text-sm flex my-2"
        >
          {t('already_have_an_account.label')}
        </Link>
      </Card>
    </form>
  )
}
