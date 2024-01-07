import { TFunction } from 'i18next'

export type CommonInviteProps = {
  input: [string, (input: string) => void]
}

export type Invites = {
  email: string
  role: string
}

export type InviteContextProps<R = unknown> = CommonInviteProps & {
  t: TFunction
  invites: [Set<Invites>, (invites: Set<Invites>) => void]
  roles: [Set<R>, (role: Set<R>) => void]
}
