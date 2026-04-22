import { useAppStore } from '@/store/useAppStore'
import { Sidebar } from './Sidebar'
import { MobileNavbar } from './MobileNavbar'
import { useEffect } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useAppStore()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} h-screen overflow-hidden`}>
      <MobileNavbar />
      <Sidebar />
      <main className="h-screen overflow-y-auto lg:ml-60 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  )
}
