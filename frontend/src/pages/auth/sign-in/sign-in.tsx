import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { SignInForm } from './sign-in.form'

const SignInPage = () => {
  const { t } = useTranslation('auth')

  return (
    <PageLayout title={t('sign_in.title')}>
      <SignInForm />
    </PageLayout>
  )
}

export default SignInPage
