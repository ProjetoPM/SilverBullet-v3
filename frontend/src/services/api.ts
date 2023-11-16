import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import axios, { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

const setup = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API as string,
    headers: {
      'Content-Type': 'application/json',
      'Current-Workspace-ID': WorkspaceStore.getWorkspace()?._id,
      'Current-Project-ID': 'not-implemented'
    }
  })

  /**
   * Interceptador de erros.
   */
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
        console.log('Internal Server Error')
      }
      return Promise.reject(error)
    }
  )

  /**
   * Interceptar uma request para adicionar o token e a
   * linguagem no header da requisição.
   */
  api.interceptors.request.use((config) => {
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token')
    const lang = localStorage.getItem('lang') ?? 'en-US'

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = lang
    return config
  })

  return api
}

export const api = setup()
