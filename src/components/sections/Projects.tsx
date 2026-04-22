import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { projectsData } from '@/data/projects'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

type FilterType = 'all' | 'web' | 'mobile' | 'design' | 'fullstack'

export function Projects() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter)

  return (
    <SectionWrapper id="projects" className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Badge variant="accent">Featured Work</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 text-4xl font-bold text-gray-900 dark:text-white"
        >
          Projects & Case Studies
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-4"
        >
          {['all', 'web', 'mobile', 'design', 'fullstack'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f as FilterType)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden transition-transform hover:scale-105">
                <div className="aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200 font-medium"
                      >
                        <FiGithub size={18} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200 font-medium"
                      >
                        <FiExternalLink size={18} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
