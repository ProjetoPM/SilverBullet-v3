type SidebarContainerProps = {
  children: React.ReactNode
}

export const SidebarContainer = ({ children }: SidebarContainerProps) => {
  return (
    <div className="w-full border-r-1 px-3 py-2.5 border-default-200 dark:border-default-100">
      {children}
    </div>
  )
}
