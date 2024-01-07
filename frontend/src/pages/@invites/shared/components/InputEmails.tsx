import { usePageLayout } from '@/layout/PageLayoutProvider'
import { Button, Input, Tooltip } from '@nextui-org/react'
import { ListRestart } from 'lucide-react'
import { KeyboardEventHandler, useCallback } from 'react'
import { z } from 'zod'
import { InviteContextProps } from '../provider/@types'

type InputEmailsProps = {
  emails: InviteContextProps['input']
  invites: InviteContextProps['invites']
  roles: InviteContextProps['roles']
}

const validate = z.object({
  email: z.string().email()
})

export const InputEmails = ({
  emails: [emails, setEmails],
  invites: [invites, setInvites],
  roles: [role]
}: InputEmailsProps) => {
  const { t } = usePageLayout()

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter' && emails.trim() !== '') {
        e.preventDefault()

        const alreadyInvited = new Set(
          Array.from(invites).map((invite) => invite.email)
        )

        const split = emails
          .toLowerCase()
          .split(',')
          .map((email) => email.trim())
          .filter(
            (email) =>
              !alreadyInvited.has(email) &&
              validate.safeParse({ email }).success
          )

        for (const email of split) {
          let emailExists = false

          for (const invite of invites) {
            if (invite.email === email) {
              emailExists = true
              break
            }
          }

          if (!emailExists) {
            invites.add({ email, role: role.values().next().value })
          }
        }
        setEmails('')
      }
    },
    [emails, role, invites, setEmails]
  )

  return (
    <div className="flex items-end gap-2" role="group">
      <Input
        id="emails"
        color="primary"
        variant="bordered"
        labelPlacement="outside"
        label={t('invites.emails.label')}
        placeholder={t('invites.emails.placeholder')}
        value={emails}
        onValueChange={(value) => setEmails(value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        classNames={{ label: 'text-foreground' }}
        isClearable
      />
      <Tooltip content={'Reset'}>
        <Button
          variant="bordered"
          onPress={() => setInvites(new Set())}
          className="border-medium border-default-200 hover:border-default-400"
          isDisabled={invites.size === 0}
          isIconOnly
        >
          <ListRestart className="w-5 h-5" />
        </Button>
      </Tooltip>
    </div>
  )
}
