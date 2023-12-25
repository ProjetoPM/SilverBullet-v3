import { api } from '@/services/api'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export type MutationMethods = 'get' | 'post' | 'put' | 'delete'

type MutateProps<T> = {
  url: string
  data?: T
  method?: MutationMethods
}

type AxiosProps = {
  data: {
    message: string
  }
}

export const useMutate = () => {
  const { t } = useTranslation('default')

  const mutate = useCallback(
    async <T>({ url, data, method }: MutateProps<T>): Promise<T> => {
      const _method = method ?? 'get'

      const _api = data
        ? api[_method](url, data).then((res) => res.data)
        : api[_method](url).then((res) => res.data)

      return new Promise((resolve, reject) =>
        toast.promise(_api, {
          loading: t('promise.loading'),
          success: (data) => {
            resolve(data)
            return data.message
          },
          error: (err) => {
            reject()
            return err.response?.data.message ?? err.message
          }
        })
      )
    },
    [t]
  )

  const promise = useCallback(
    <T extends AxiosProps>(api: Promise<T>): Promise<unknown> => {
      return new Promise((resolve, reject) =>
        toast.promise(
          api.then((res) => res.data),
          {
            important: true,
            loading: t('promise.loading'),
            success: (data) => {
              resolve(data)
              return data?.message ?? t('promise.no_message')
            },
            error: (err) => {
              reject()
              return err.response?.data?.message ?? err.message
            }
          }
        )
      )
    },
    [t]
  )

  return { mutate, promise }
}
