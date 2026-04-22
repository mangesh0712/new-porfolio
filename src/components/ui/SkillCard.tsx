import { motion } from 'framer-motion'
import * as SiIcons from 'react-icons/si'

interface SkillCardProps {
  name: string
  level: number
}

const iconMap: Record<string, React.ReactNode> = {
  react: <SiIcons.SiReact className="text-2xl text-cyan-400" />,
  typescript: <SiIcons.SiTypescript className="text-2xl text-blue-500" />,
  javascript: <SiIcons.SiJavascript className="text-2xl text-yellow-400" />,
  tailwind: <SiIcons.SiTailwindcss className="text-2xl text-cyan-500" />,
  node: <SiIcons.SiNodedotjs className="text-2xl text-green-600" />,
  express: <SiIcons.SiExpress className="text-2xl text-gray-600 dark:text-gray-300" />,
  mongodb: <SiIcons.SiMongodb className="text-2xl text-green-500" />,
  postgresql: <SiIcons.SiPostgresql className="text-2xl text-blue-600" />,
  git: <SiIcons.SiGit className="text-2xl text-orange-600" />,
  docker: <SiIcons.SiDocker className="text-2xl text-blue-400" />,
  aws: <SiIcons.SiAmazonaws className="text-2xl text-orange-500" />,
  vercel: <SiIcons.SiVercel className="text-2xl text-gray-900 dark:text-white" />,
}

export function SkillCard({ name, level }: SkillCardProps) {
  const iconKey = name.toLowerCase()
  const displayIcon = iconMap[iconKey]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 transition-shadow hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center">
        {displayIcon || (
          <div className="text-2xl font-bold text-emerald-600 dark:text-amber-400">
            {name[0]}
          </div>
        )}
      </div>
      <p className="text-center text-sm font-semibold text-gray-900 dark:text-white">
        {name}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-amber-400 dark:to-amber-300"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{level}%</p>
    </motion.div>
  );
}
