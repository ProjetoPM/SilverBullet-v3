import { Form, FormField } from '@/components/Form/Form'
import { FormInput } from '@/components/Form/FormInput'
import { InputPassword } from '@/components/UI/Input/InputPassword'
import { Text } from '@/components/UI/Label/Text'
import { useAuth } from '@/hooks/useAuth'
import { usePageLayout } from '@/layout/PageLayoutProvider'
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
  Link,
  useDisclosure
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { ForgotPassword } from '../components/ForgotPassword'
import { SignIn, SignInSchema } from './sign-in.schema'

export const SignInForm = () => {
  const { t } = usePageLayout()
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
    <>
      <Card className="bg-default-100/60">
        <CardHeader className="ml-2 flex gap-4 p-3">
          <div className="flex flex-col gap-0.5 w-full pr-3">
            <h1 className="text-2xl font-bold">{t('sign_in.title')}</h1>
            <div className="flex flex-wrap items-center justify-between gap-1">
              <p className="text-sm">{t('sign_in.description')}</p>
              <ForgotPassword {...forgotPassword} />
            </div>
          </div>
        </CardHeader>
        <Divider />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <CardBody className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    label={t('email.label')}
                    placeholder={t('email.placeholder')}
                    autoComplete="email"
                    isRequired
                  />
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <InputPassword
                    {...field}
                    label={t('password.label')}
                    labelPlacement="outside"
                    errorMessage={form.formState.errors.password?.message}
                    isRequired
                  />
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field: { value, ...rest } }) => (
                  <Checkbox
                    {...rest}
                    color="primary"
                    defaultValue={String(value)}
                  >
                    <Text size="sm">{t('keep_me_signed.label')}</Text>
                  </Checkbox>
                )}
              />
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                variant="solid"
                color="primary"
                isLoading={signIn.isPending}
                fullWidth
              >
                {t('sign_in.btn')}
              </Button>
            </CardFooter>
          </form>
        </Form>
        <Link
          color="primary"
          href={frontend.auth.sign_up.index}
          showAnchorIcon
          className="mx-auto text-sm flex my-2"
        >
          {t('dont_have_an_account.label')}
        </Link>
      </Card>
    </>
  )
}
