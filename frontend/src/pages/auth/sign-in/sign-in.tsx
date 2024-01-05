import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { SignInForm } from './sign-in.form'

export default function SignInPage() {
  const { t, ns } = usePage('auth')

  return (
    <PageLayout title={t('sign_in.title')} ns={ns} isAuth>
      <SignInForm />
    </PageLayout>
  )
}
