import { api } from '@/services/api'
import { replaceParams } from '@/utils/helpers/replace-params'
import toast from 'react-hot-toast'
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useMutate } from './useMutate'
import { useToken } from './useToken'
import { useMemo } from 'react'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'

type CommonProps = {
  params?: (string | undefined)[]
  options?: UseQueryOptions
}

type AppendOrParamsProps = {
  append?: string
  params?: (string | undefined)[]
}

type FetchProps = {
  keys: string | string[]
  get?: CommonProps & {
    append?: string
  }
  list?: CommonProps & {
    append?: string
  }
}

type UseFetchProps = {
  baseUrl: string
  fetch?: FetchProps
  redirectTo?: string
  invalidateQueries?: string[]
  useWorkspaceId?: boolean
  useProjectId?: boolean
}

type MutateProps = {
  _id: string
  asyncFn?: () => Promise<void>
  internalAsyncFn?: () => Promise<void>
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
  redirectTo,
  invalidateQueries,
  useWorkspaceId,
  useProjectId
}: UseFetchProps) => {
  const { promise } = useMutate()
  const queryClient = useQueryClient()
  const redirect = useNavigate()
  const { isExpired: isTokenExpired } = useToken()

  const ids = useMemo(() => {
    const _workspaceId = WorkspaceStore.getWorkspaceId()
    const _projectId = WorkspaceStore.getProjectId()

    const result = [
      useWorkspaceId ? _workspaceId : undefined,
      useProjectId ? _projectId : undefined
    ]

    return result.filter((item) => !!item)
  }, [useWorkspaceId, useProjectId])

  /**
   * Método para buscar um registro, seja ele qual for.
   *
   * @returns Promise com o resultado da requisição.
   */
  const get = useQuery<T>(
    [...(fetch?.keys ?? ''), ...ids],
    async () => {
      /**
       * Determinar se a rota deve ser alterada.
       */
      const _baseUrl = _useAppendOrParams(baseUrl, fetch?.get)

      return await api
        .get(_baseUrl)
        .then((res) => res.data?.dto)
        .catch((err) => !isTokenExpired() && toast.error(err.message))
    },
    {
      ...(fetch?.get?.options as UseQueryOptions<T>),
      enabled: !!fetch?.get?.append
    }
  )

  /**
   * Método para listar todos os registros, seja ele qual for.
   *
   * @returns Promise com o resultado da requisição.
   */
  const list = useQuery<T>(
    [...(fetch?.keys ?? ''), ...ids],
    async () => {
      /**
       * Determinar se a rota deve ser alterada.
       */
      const _baseUrl = _useAppendOrParams(baseUrl, fetch?.list)

      return await api
        .get(_baseUrl)
        .then((res) => res.data?.dto)
        .catch((err) => !isTokenExpired() && toast.error(err.message))
    },
    {
      ...(fetch?.list?.options as UseQueryOptions<T>),
      enabled: !!fetch?.list
    }
  )

  /**
   * Método para criar um novo registro, seja ele qual for.
   *
   * @param data Dados do registro a ser criado.
   * @returns Promise com o resultado da requisição.
   */
  const create = useMutation(
    async (data: T & Omit<MutateProps, '_id'>) => {
      const url = `${baseUrl}/new`
      await data.asyncFn?.()
      return await promise(api.post(url, data))
    },
    {
      onSuccess: async (_, { internalAsyncFn }) => {
        await internalAsyncFn?.()

        if (redirectTo) {
          redirect(redirectTo)
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: invalidateQueries ?? fetch?.keys
        })
      }
    }
  )

  /**
   * Método para atualizar um registro, seja ele qual for.
   *
   * @param data Dados do registro a ser atualizado.
   * @returns Promise com o resultado da requisição.
   */
  const update = useMutation(
    async (data: T & MutateProps) => {
      const url = `${baseUrl}/${data._id}/edit`
      await data.asyncFn?.()
      return await promise(api.put(url, data))
    },
    {
      onSuccess: async (_, { internalAsyncFn }) => {
        await internalAsyncFn?.()

        if (redirectTo) {
          redirect(redirectTo)
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: invalidateQueries ?? fetch?.keys
        })
      }
    }
  )

  /**
   * Método para remover um registro, seja ele qual for.
   *
   * @param data Dados do registro a ser removido.
   * @returns Promise com o resultado da requisição.
   */
  const remove = useMutation(
    async (data: RemoveProps<T>) => {
      const url = `${baseUrl}/${data._id}`
      await data.asyncFn?.()
      return await promise(api.delete(url))
    },
    {
      onSuccess: async (_, { internalAsyncFn }) => {
        await internalAsyncFn?.()

        if (redirectTo) {
          redirect(redirectTo)
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: invalidateQueries ?? fetch?.keys
        })
      }
    }
  )

  /**
   * Método para remover um ou mais registros, sejam quais forem.
   *
   * @param data Registros a serem removidos.
   * @returns Promise com o resultado da requisição.
   */
  const removeMany = useMutation(
    async (
      data: (
        | Omit<RemoveProps<T>, 'asyncFn' | 'internalAsyncFn'>
        | Omit<RemoveProps<T>, 'asyncFn' | 'internalAsyncFn'>[]
      ) &
        Pick<MutateProps, 'asyncFn' | 'internalAsyncFn'>
    ) => {
      const _data = Array.isArray(data) ? data : [data._id]
      await data.asyncFn?.()
      return await promise(api.delete(baseUrl, { params: { ids: _data } }))
    },
    {
      onSuccess: async (_, { internalAsyncFn }) => {
        await internalAsyncFn?.()

        if (redirectTo) {
          redirect(redirectTo)
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: invalidateQueries ?? fetch?.keys
        })
      }
    }
  )

  return { create, update, remove, removeMany, get, list }
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
  { append, params }: AppendOrParamsProps = {}
) => {
  if (params) {
    baseUrl = replaceParams(baseUrl, params)
  }

  if (append) {
    baseUrl += `/${append}`
  }

  return baseUrl
}
