import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { FiGithub, FiLinkedin, FiInstagram, FiSun, FiMoon } from 'react-icons/fi';
import { personal } from '@/data/personal';

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
            className="flex-1 rounded-lg bg-gray-100 p-2 text-center transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FiGithub className="inline-block text-lg" />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-gray-100 p-2 text-center transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FiLinkedin className="inline-block text-lg" />
          </a>
          <a
            href={personal.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-gray-100 p-2 text-center transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FiInstagram className="inline-block text-lg" />
          </a>
        </div>
      </div>
    </aside>
  )
}
