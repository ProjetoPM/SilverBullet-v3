import { HttpResponse } from '@/@types/HttpResponse'
import { SignIn } from '@/pages/auth/sign-in/sign-in.schema'
import { SignUp } from '@/pages/auth/sign-up/sign-up.schema'
import { frontend } from '@/routes/routes'
import { api } from '@/services/api'
import { Workspace } from '@/stores/useWorkspaceStore'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useMutate } from './useMutate'

type HttpSignInResponse = HttpResponse & {
  token: string
}

export const getUser = () => {
  return {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user')
  }
}

export const useAuth = () => {
  const navigate = useNavigate()
  const { promise } = useMutate()

  const signIn = useMutation(
    async (data: SignIn) => {
      const url = `/auth/sign-in`
      return await promise(api.post(url, data))
    },
    {
      onSuccess: (response: HttpSignInResponse, { email }) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', email)
        Workspace.updateWorkspaceName()
        navigate(frontend.workspaces.index)
      }
    }
  )

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Workspace.closeWorkspace()
    navigate(frontend.auth.sign_in.index, { replace: true })
  }

  const signUp = useMutation(
    async (data: SignUp) => {
      const url = `/auth/sign-up`
      return await promise(api.post(url, data))
    },
    {
      onSuccess: () => {
        navigate(frontend.auth.sign_in.index)
      }
    }
  )

  return { signIn, signOut, signUp }
}
