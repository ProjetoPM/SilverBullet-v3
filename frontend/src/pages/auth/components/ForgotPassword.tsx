import { Text } from '@/components/ui/label/Text'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

export const ForgotPassword = () => {
  const { t } = useTranslation('auth')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Forgot Password</ModalHeader>
              <ModalBody>
                <p>Forgot Password</p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
