import { Text } from '@/components/ui/label/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email()
})

type ForgotPasswordData = z.infer<typeof schema>

type ForgotPasswordProps = {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: (open: boolean) => void
}

export const ForgotPassword = ({
  isOpen,
  onOpen,
  onOpenChange
}: ForgotPasswordProps) => {
  const { t } = useTranslation('auth')

  const form = useForm<ForgotPasswordData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: ForgotPasswordData) => {
    console.log(data)
  }

  return (
    <>
      <Text
        size="sm"
        color="primary"
        className="flex items-center gap-0.5"
        onPress={onOpen}
      >
        {t('sign_in.forgot_password.label')}
      </Text>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shouldBlockScroll
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-0.5">
                <h2 className="text-xl">Forgot Password</h2>
                <p className="text-sm font-light">Recover your account</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  labelPlacement="outside"
                  variant="faded"
                  placeholder={t('email.placeholder')}
                  description="We will send you a link to reset your password."
                  errorMessage={form.formState.errors.email?.message}
                  onClear={form.reset}
                  {...form.register('email')}
                  autoFocus
                  isClearable
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  type="button"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Enviar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
