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
  Link,
  useDisclosure
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ForgotPassword } from '../components/ForgotPassword'
import { SignIn, SignInSchema } from './sign-in.schema'

export const SignInForm = () => {
  const { t } = useTranslation('auth')
  const { signIn } = useAuth()
  const forgotPassword = useDisclosure()

  const form = useForm<SignIn>({
    mode: 'all',
    resolver: zodResolver(SignInSchema)
  })

  const onSubmit = async (data: SignIn) => {
    if (!forgotPassword.isOpen) {
      await signIn.mutateAsync(data)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <Card className="pb-3 bg-default-100/60">
        <CardHeader className="ml-2 flex gap-4">
          <div className="flex flex-col gap-0.5 w-full pr-3">
            <h1 className="text-2xl font-bold">{t('sign_in.title')}</h1>
            <div className="flex flex-wrap items-center justify-between gap-1">
              <p className="text-sm">{t('sign_in.description')}</p>
              <ForgotPassword {...forgotPassword} />
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-1">
              <InputPassword
                {...form.register('password')}
                label={t('password.label')}
                labelPlacement="outside"
                errorMessage={form.formState.errors.password?.message}
                isRequired
              />
            </div>
            <Controller
              control={form.control}
              name="rememberMe"
              render={({ field: { value, onChange, ...rest } }) => (
                <Checkbox
                  color="primary"
                  value={String(value)}
                  onValueChange={(value) => onChange(value)}
                  {...rest}
                >
                  <Text size="sm">{t('keep_me_signed.label')}</Text>
                </Checkbox>
              )}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            isLoading={signIn.isLoading}
            fullWidth
          >
            {t('sign_in.btn')}
          </Button>
        </CardFooter>
        <Link
          color="primary"
          href={frontend.auth.sign_up.index}
          showAnchorIcon
          className="mx-auto text-sm flex my-2"
        >
          {t('dont_have_an_account.label')}
        </Link>
      </Card>
    </form>
  )
}
