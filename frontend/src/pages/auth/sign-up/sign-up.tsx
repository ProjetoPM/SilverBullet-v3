import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { SignUpForm } from './sign-up.form'

export const SignUpPage = () => {
  const { t, ns } = usePageUtils('auth')

  return (
    <PageLayout title={t('sign_up.title')} ns={ns} isAuth>
      <SignUpForm />
    </PageLayout>
  )
}
