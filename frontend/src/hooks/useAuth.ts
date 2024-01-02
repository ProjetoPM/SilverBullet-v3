import { HttpResponse } from '@/@types/HttpResponse'
import { SignIn } from '@/pages/auth/sign-in/sign-in.schema'
import { SignUp } from '@/pages/auth/sign-up/sign-up.schema'
import { frontend } from '@/routes/routes'
import { api } from '@/services/api'
import { WorkspaceStore } from '@/stores/useWorkspaceStore'
import { AG_EXPIRED_TOKEN_ID } from '@/utils/guard'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useMutate } from './useMutate'

type HttpSignInResponse = HttpResponse & {
  token: string
}

export const getUser = () => {
  return {
    token: sessionStorage.getItem('token') ?? localStorage.getItem('token'),
    user: sessionStorage.getItem('user') ?? localStorage.getItem('user')
  }
}

export const useAuth = () => {
  const navigate = useNavigate()
  const { promise } = useMutate()

  const signIn = useMutation({
    mutationFn: async (data: SignIn): Promise<HttpSignInResponse> => {
      const url = '/auth/sign-in'
      return promise(api.post(url, data)) as Promise<HttpSignInResponse>
    },
    onSuccess: (response: HttpSignInResponse, { email, rememberMe }) => {
      /** Deciding where to store the token */
      const storage = rememberMe ? localStorage : sessionStorage

      if (localStorage.getItem('user') !== email) {
        WorkspaceStore.resetStore()
      }

      if (storage === sessionStorage) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      storage.setItem('token', response.token)
      localStorage.setItem('user', email)

      /** Clean expired token toast message */
      toast.dismiss(AG_EXPIRED_TOKEN_ID)

      /** Navigate to workspace */
      navigate(frontend.workspaces.index)
    }
  })

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
    WorkspaceStore.resetStore()
    navigate(frontend.auth.sign_in.index, { replace: true })
  }

  const signUp = useMutation({
    mutationFn: async (data: SignUp) => {
      const url = '/auth/sign-up'
      return await promise(api.post(url, data))
    },
    onSuccess: () => {
      navigate(frontend.auth.sign_in.index)
    }
  })

  return { signIn, signOut, signUp }
}
