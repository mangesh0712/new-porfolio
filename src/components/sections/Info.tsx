import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { SkillCard } from '@/components/ui/SkillCard';
import { skillsData } from '@/data/skills';
import { personal } from '@/data/personal';
import { motion } from 'framer-motion';

const whatIBring = [
  "I build scalable, high-performance React applications with clean, maintainable architecture.",
"I specialize in modern UI systems, performance optimization, and seamless API integrations.",
"I design efficient, reusable solutions aligned with real business impact.",
"I bring leadership through mentoring, code quality, and best practices.",
"I turn product ideas into robust, user-focused digital experiences.",
]

export function Info() {
  return (
    <SectionWrapper id="info" className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Badge variant="accent">Building Digital Solutions</Badge>
        </motion.div>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              What I Bring
            </h3>
            <div className="space-y-3">
              {whatIBring.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-600 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Skills & Technologies
            </h3>
            <div className="space-y-12">
              {skillsData.map((category, idx) => (
                <div key={idx}>
                  <h4 className="mb-6 font-semibold text-lg text-gray-900 dark:text-white">
                    {category.category}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {category.skills.map((skill, sidx) => (
                      <SkillCard key={sidx} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 p-8 md:grid-cols-4 border border-emerald-200 dark:border-emerald-900"
        >
          {[
            { number: `${personal.stats.yearsOfExperience}+`, label: 'Years Experience' },
            { number: `${personal.stats.projectsCompleted}+`, label: 'Projects Completed' },
            { number: `${personal.stats.cupsOfCoffee}+`, label: 'Cups of Coffee' },
            { number: `${personal.stats.clientsSatisfied}+`, label: 'Satisfied Clients' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-emerald-700 dark:text-amber-300">
                {stat.number}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
