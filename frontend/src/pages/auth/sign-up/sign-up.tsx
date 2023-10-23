import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { SignUpForm } from './sign-up.form'

export const SignUpPage = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout title={t('sign_up.title')}>
      <SignUpForm />
    </PageLayout>
  )
}
