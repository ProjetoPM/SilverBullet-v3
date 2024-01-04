import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { SignInForm } from './sign-in.form'

export default function SignInPage() {
  const { t, ns } = usePageUtils('auth')

  return (
    <PageLayout title={t('sign_in.title')} ns={ns} isAuth>
      <SignInForm />
    </PageLayout>
  )
}
