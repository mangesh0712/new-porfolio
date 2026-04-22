import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'info', label: 'Info' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useAppStore()

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
      <h1 className="text-lg font-bold">M.</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          <ul className="space-y-2 p-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'block w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors',
                    'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
