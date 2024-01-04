import { Modal } from '@nextui-org/react'
import { useEffect } from 'react'

type DashboardModalProps = {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: () => void
}

export const DashboardModal = ({
  isOpen,
  onOpenChange,
  children
}: DashboardModalProps) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange()
      }
    }

    document.addEventListener('keydown', down)

    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [onOpenChange])

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
      className="pb-6 bg-background dark:bg-[#101010]"
      classNames={{
        base: 'lg:max-w-[1095px]',
        closeButton: 'top-[0.40rem] right-2 z-50 focus:ring-0'
      }}
      shouldBlockScroll
    >
      {children}
    </Modal>
  )
}
