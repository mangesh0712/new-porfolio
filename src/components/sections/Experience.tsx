import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/Badge'
import { experienceData } from '@/data/experience'
import { motion } from 'framer-motion'

export function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Badge variant="accent">Professional Journey</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 text-4xl font-bold text-gray-900 dark:text-white"
        >
          Experience
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 dark:bg-amber-400" />

          <div className="space-y-8 pl-8">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 h-5 w-5 rounded-full border-4 border-emerald-600 bg-white dark:border-amber-400 dark:bg-gray-900" />

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-emerald-700 dark:text-amber-400">
                        {exp.company}
                      </p>
                    </div>
                    {exp.isCurrent && (
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900">Current</span>
                    )}
                  </div>

                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate || 'Present'} • {exp.location}
                  </p>

                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">
                      Key Achievements:
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, aidx) => (
                        <li
                          key={aidx}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
