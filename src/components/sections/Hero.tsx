import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiDownload } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { personal } from '@/data/personal'
import { useEffect, useState } from 'react'

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Innovator',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = (target: string) => {
    const element = document.getElementById(target)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="hero" className="flex flex-col justify-center relative">
      <div className="absolute top-6 right-6 flex gap-3">
        <a
          href={personal.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-700 text-white dark:bg-amber-400 dark:text-emerald-900 p-3 transition-transform hover:scale-110 lg:block hidden"
        >
          <FiGithub size={20} />
        </a>
        <a
          href={personal.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-700 text-white dark:bg-amber-400 dark:text-emerald-900 p-3 transition-transform hover:scale-110 lg:block hidden"
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href={personal.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-700 text-white dark:bg-amber-400 dark:text-emerald-900 p-3 transition-transform hover:scale-110 lg:block hidden"
        >
          <FiTwitter size={20} />
        </a>
      </div>
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          {personal.availability && (
            <Badge variant="accent">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-500 mr-2" />
              Available for opportunities
            </Badge>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-5xl font-bold text-gray-900 dark:text-white md:text-7xl"
        >
          Hi, I'm <span className="text-cyan-500">{personal.name}</span>
        </motion.h1>

        <motion.div
          key={titleNumber}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 h-12 text-2xl font-semibold text-gray-600 dark:text-gray-400 md:text-3xl"
        >
          {titles[titleNumber]}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
        >
          {personal.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:gap-6"
        >
          <Button
            size="md"
            variant="primary"
            onClick={() => handleScroll('experience')}
          >
            View My Work
          </Button>
          <Button size="md" variant="outline">
            <FiDownload className="mr-2 inline" />
            Download Resume
          </Button>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
