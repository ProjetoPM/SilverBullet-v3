import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { SignInForm } from './sign-in.form'

export const SignInPage = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout title={t('sign_in.title')} isAuth>
      <SignInForm />
    </PageLayout>
  )
}
