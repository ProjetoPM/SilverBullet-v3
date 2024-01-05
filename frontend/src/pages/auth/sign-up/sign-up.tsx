import { usePage } from '@/hooks/usePage'
import { PageLayout } from '@/layout/PageLayout'
import { SignUpForm } from './sign-up.form'

export default function SignUpPage() {
  const { t, ns } = usePage('auth')

  return (
    <PageLayout title={t('sign_up.title')} ns={ns} isAuth>
      <SignUpForm />
    </PageLayout>
  )
}
