import { Header } from '@/layout/main/header/Header'
import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { MoveLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Error404 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="grid grid-rows-[64px_1fr] h-screen">
      <Header />
      <section className="bg-background">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mx-5">
            <p className="text-xl font-bold text-danger">{t('error_404')}</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              {t('page_not_found')}
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {t('page_not_found_description')}
            </p>
            <div className="flex items-center mt-6 gap-x-3">
              <Button
                color="primary"
                className="gap-2"
                onClick={() => navigate(-1)}
              >
                <MoveLeft className="h-5 w-5" />
                {t('btn.go_back')}
              </Button>
              <Button as={Link} href={frontend.workspaces.index}>
                {t('btn.take_me_home')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
