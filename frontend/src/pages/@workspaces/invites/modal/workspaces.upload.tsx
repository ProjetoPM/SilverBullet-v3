import { Button } from '@nextui-org/react'
import { Upload } from 'lucide-react'
import Papa from 'papaparse'
import { ChangeEvent, useCallback } from 'react'
import {
  WorkspaceInvites,
  useWorkspaceInvites
} from '../context/WorkspaceInviteContext'
import { toast } from 'sonner'

export const WorkspaceUploadButton = () => {
  const {
    t,
    invites: [invites, setInvites]
  } = useWorkspaceInvites()

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0]

        if (file) {
          Papa.parse(file, {
            complete: (result) => {
              const data = result.data.slice(0) as WorkspaceInvites[]

              if (data && data.length > 0) {
                const uniqueEmails = data.filter(
                  (email) =>
                    !Array.from(invites).some(
                      (invite) => invite.email === email.email
                    )
                )
                const normalizeInvites = uniqueEmails.map((invite) => ({
                  ...invite,
                  role: invite.role.toUpperCase()
                }))

                setInvites(new Set([...invites, ...normalizeInvites]))
              }
            },
            fastMode: true,
            header: true
          })
          /**
           * Reset the input value to allow the user to upload the same file
           */
          event.target.files = new DataTransfer().files
        }
      } catch (e) {
        toast.error(t('invites.invalid_file'))
      }
    },
    [invites, setInvites, t]
  )

  return (
    <>
      <input
        className="hidden"
        type="file"
        id="upload-file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <Button
        color="primary"
        variant="ghost"
        onClick={() => document.getElementById('upload-file')?.click()}
      >
        <Upload className="w-5 h-5" />
        {t('invites.import_from_template')}
      </Button>
    </>
  )
}
