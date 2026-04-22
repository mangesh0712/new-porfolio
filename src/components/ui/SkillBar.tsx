import { motion } from 'framer-motion'

interface SkillBarProps {
  name: string
  level: number
}

export function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-500">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-amber-400 dark:to-amber-300"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  )
}
