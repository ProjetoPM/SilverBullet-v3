import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import axios, { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

const setup = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API as string,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  /**
   * Intercept errors.
   */
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
        console.error(error.response.data)
      }
      return Promise.reject(error)
    }
  )

  /**
   * Intercept a request to add the token and the language
   * in the request header.
   */
  api.interceptors.request.use((config) => {
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token')
    const lang = localStorage.getItem('lang') ?? 'en-US'

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = lang
    config.headers['Current-Workspace-ID'] = WorkspaceStore.getWorkspaceId()
    config.headers['Current-Project-ID'] = WorkspaceStore.getProjectId()
    return config
  })

  return api
}

export const api = setup()
