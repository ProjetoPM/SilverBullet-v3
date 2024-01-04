import { useTheme } from '@/contexts/theme-provider'
import { Toaster } from 'sonner'

export const ToastSonner = () => {
  const { theme } = useTheme()

  return (
    <Toaster
      theme={theme}
      toastOptions={{
        className:
          '!bg-default-50 !border-default-100 dark:!bg-default-100 dark:!border-default-200',
        classNames: {
          success: '!text-success',
          error: '!text-danger-500',
          warning: '!text-warning-500',
          info: '!text-primary-500'
        }
      }}
      richColors
      closeButton
    />
  )
}
