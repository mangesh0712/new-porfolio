import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { FiGithub, FiLinkedin, FiInstagram, FiSun, FiMoon } from 'react-icons/fi';
import { personal } from '@/data/personal';
import { SOCIAL_COLORS } from '@/constants';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'info', label: 'Info' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export function Sidebar() {
  const { activeSection, theme, toggleTheme } = useAppStore()

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-60 flex-col border-r border-gray-200 bg-white px-8 py-10 dark:border-gray-800 dark:bg-gray-950 lg:flex">
      <div className="mb-12">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          M.
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {personal.role}
        </p>
      </div>

      <nav className="mb-auto flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={cn(
                  'block w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'bg-emerald-700 text-white dark:bg-amber-400 dark:text-emerald-900'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex w-full items-center justify-center rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? (
            <FiSun className="text-xl" />
          ) : (
            <FiMoon className="text-xl" />
          )}
        </button>

        <div className="flex gap-3">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className={cn(
              'flex-1 rounded-lg p-2 text-center transition-colors',
              'bg-gray-100 dark:bg-gray-800',
              'hover:bg-gray-900 hover:text-white dark:hover:bg-gray-900 dark:hover:text-white'
            )}
          >
            <FiGithub className="inline-block text-lg" />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
            className={cn(
              'flex-1 rounded-lg p-2 text-center transition-colors',
              'bg-gray-100 dark:bg-gray-800',
              'hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white'
            )}
          >
            <FiLinkedin className="inline-block text-lg" />
          </a>
          <a
            href={personal.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my Instagram profile"
            className={cn(
              'flex-1 rounded-lg p-2 text-center transition-colors',
              'bg-gray-100 dark:bg-gray-800',
              'hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white'
            )}
          >
            <FiInstagram className="inline-block text-lg" />
          </a>
        </div>
      </div>
    </aside>
  )
}
