import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { SignUpForm } from './sign-up.form'

export default function SignUpPage() {
  const { t, ns } = usePageUtils('auth')

  return (
    <PageLayout title={t('sign_up.title')} ns={ns} isAuth>
      <SignUpForm />
    </PageLayout>
  )
}
