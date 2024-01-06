import { api } from '@/services/api'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import { replaceParams } from '@/utils/helpers/replace-params'
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useMutate } from './useMutate'
import { useEffect } from 'react'

type Keys = [string, ...(string | undefined)[]]

type AppendKeys = {
  workspace?: boolean
  project?: boolean
}

type CommonProps = {
  params?: Keys
  options?: UseQueryOptions
  append?: string
  keys?: AppendKeys
}

type UseFetchProps = {
  baseUrl: string
  redirectTo?: string
  invalidateQueries?: Keys
  fetch?: {
    keys: Keys
    get?: CommonProps
    list?: Omit<CommonProps, 'enable'>
  }
  mutate?: Pick<CommonProps, 'keys'>
}

type MutateProps = {
  _id: string
  fn?: () => void | Promise<void>
  internalFn?: () => void | Promise<void>
}

type RemoveProps<T> = T & MutateProps

/**
 * Hook para realizar requisições e mutações.
 *
 * @param baseUrl Rota base para a requisição.
 * @param keys Query para invalidar o cache.
 * @param fetch Objeto para determinar se o 'get' ou 'list' deverão ser habilitados.
 * @param redirectTo Rota para redirecionar após a mutação.
 *
 * @author Matheus Boeira Dias
 */
export const useFetch = <T>({
  baseUrl,
  fetch,
  mutate,
  redirectTo,
  invalidateQueries
}: UseFetchProps) => {
  const { promise } = useMutate()
  const queryClient = useQueryClient()
  const redirect = useNavigate()
  const workspaceId = WorkspaceStore.getWorkspaceId()
  const projectId = WorkspaceStore.getProjectId()

  const fetchQueryKeys = () => {
    return [
      fetch?.get?.keys?.workspace && workspaceId,
      fetch?.get?.keys?.project && projectId,
      fetch?.list?.keys?.workspace && workspaceId,
      fetch?.list?.keys?.project && projectId,
      ...(fetch?.keys ?? ['disabled'])
    ].filter(Boolean) as string[]
  }

  const mutateQueryKeys = () => {
    return [
      mutate?.keys?.workspace && workspaceId,
      mutate?.keys?.project && projectId,
      ...(invalidateQueries ?? [])
    ].filter(Boolean) as string[]
  }

  useEffect(() => {
    console.log(fetch?.keys)
  }, [fetch?.keys])

  /**
   * Método para buscar um registro, seja ele qual for.
   *
   * @returns Promise com o resultado da requisição.
   */
  const get = useQuery<T>({
    queryKey: [...fetchQueryKeys()],
    queryFn: async () => {
      /**
       * Determinar se a rota deve ser alterada.
       */
      const _baseUrl = _useAppendOrParams(baseUrl, fetch?.get)
      return await api.get(_baseUrl).then((res) => res.data?.dto)
    },
    enabled: !!fetch?.keys && !!fetch?.get?.append
  })

  /**
   * Método para listar todos os registros, seja ele qual for.
   *
   * @returns Promise com o resultado da requisição.
   */
  const list = useQuery<T>({
    queryKey: [...fetchQueryKeys()],
    queryFn: async () => {
      /**
       * Determinar se a rota deve ser alterada.
       */
      const _baseUrl = _useAppendOrParams(baseUrl, fetch?.list)
      return await api.get(_baseUrl).then((res) => res.data?.dto)
    },
    enabled: !!fetch?.keys && !!fetch?.list
  })

  /**
   * Método para criar um novo registro, seja ele qual for.
   *
   * @param data Dados do registro a ser criado.
   * @returns Promise com o resultado da requisição.
   */
  const create = useMutation({
    mutationFn: async (data: T & Omit<MutateProps, '_id'>) => {
      const url = `${baseUrl}/new`
      const result = Promise.all([data.fn?.(), promise(api.post(url, data))])
      return result.then((res) => res[1])
    },
    onSuccess: async (_, { internalFn }) => {
      await internalFn?.()

      if (redirectTo) {
        redirect(redirectTo)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: mutateQueryKeys()
      })
    }
  })

  /**
   * Método para atualizar um registro, seja ele qual for.
   *
   * @param data Dados do registro a ser atualizado.
   * @returns Promise com o resultado da requisição.
   */
  const update = useMutation({
    mutationFn: async (data: T & MutateProps) => {
      const url = `${baseUrl}/${data._id}/edit`
      const result = Promise.all([data.fn?.(), promise(api.put(url, data))])
      return result.then((res) => res[1])
    },
    onSuccess: async (_, { internalFn }) => {
      await internalFn?.()

      if (redirectTo) {
        redirect(redirectTo)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: mutateQueryKeys()
      })
    }
  })

  /**
   * Método para remover um registro, seja ele qual for.
   *
   * @param data Dados do registro a ser removido.
   * @returns Promise com o resultado da requisição.
   */
  const remove = useMutation({
    mutationFn: async (data: RemoveProps<T>) => {
      const url = `${baseUrl}/${data._id}`
      const result = Promise.all([data.fn?.(), promise(api.delete(url))])
      return result.then((res) => res[1])
    },
    onSuccess: async (_, { internalFn }) => {
      await internalFn?.()

      if (redirectTo) {
        redirect(redirectTo)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: mutateQueryKeys()
      })
    }
  })

  /**
   * Método para remover um ou mais registros, sejam quais forem.
   *
   * @param data Registros a serem removidos.
   * @returns Promise com o resultado da requisição.
   */
  const removeMany = useMutation({
    mutationFn: async (
      data: (
        | Omit<RemoveProps<T>, 'fn' | 'internalFn'>
        | Omit<RemoveProps<T>, 'fn' | 'internalFn'>[]
      ) &
        Pick<MutateProps, 'fn' | 'internalFn'>
    ) => {
      const _data = Array.isArray(data) ? data : [data._id]
      const result = Promise.all([
        data.fn?.(),
        promise(api.delete(baseUrl, { params: { ids: _data } }))
      ])
      return result.then((res) => res[1])
    },
    onSuccess: async (_, { internalFn }) => {
      await internalFn?.()

      if (redirectTo) {
        redirect(redirectTo)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: mutateQueryKeys()
      })
    }
  })

  const generic = useMutation({
    mutationFn: async (data: T & Omit<MutateProps, '_id'>) => {
      const url = baseUrl
      const result = Promise.all([data.fn?.(), promise(api.post(url, data))])
      return result.then((res) => res[1])
    },
    onSuccess: async (_, { internalFn }) => {
      await internalFn?.()

      if (redirectTo) {
        redirect(redirectTo)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: mutateQueryKeys()
      })
    }
  })

  return { create, update, remove, generic, removeMany, get, list }
}

/**
 * Determinar se a rota deve ser alterada com base nos parâmetros
 * passados na requisição.
 *
 * @param baseUrl Rota base para a requisição.
 * @returns Rota alterada.
 */
const _useAppendOrParams = (
  baseUrl: string,
  { append, params }: Omit<CommonProps, 'options'> = {}
) => {
  let updateUrl = baseUrl

  if (params) {
    updateUrl = replaceParams(baseUrl, params)
  }

  if (append) {
    updateUrl += `/${append}`
  }

  return updateUrl
}
