import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'

export function About() {
  return (
    <SectionWrapper id="about" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Badge variant="accent">My Story</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 text-4xl font-bold text-gray-900 dark:text-white"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 text-lg text-gray-600 dark:text-gray-300"
        >
          <p>
            I'm a passionate full-stack web developer with a love for building elegant solutions to complex problems. My journey in tech started with curiosity about how things work on the web, and it has evolved into a career dedicated to creating exceptional digital experiences.
          </p>

          <p>
            Over the past few years, I've worked on diverse projects ranging from e-commerce platforms to SaaS applications. I specialize in React and modern JavaScript/TypeScript, and I'm constantly exploring new technologies to stay at the forefront of web development.
          </p>

          <p>
            Beyond coding, I'm passionate about teaching others, contributing to open-source projects, and sharing knowledge with the community. When I'm not coding, you can find me exploring new technologies, reading tech blogs, or enjoying outdoor activities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {[
            { icon: '🎯', title: 'Goal-Oriented', desc: 'Focused on delivering results' },
            { icon: '🚀', title: 'Innovation-Driven', desc: 'Always exploring new solutions' },
            { icon: '🤝', title: 'Collaborative', desc: 'Love working with great teams' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-3 text-4xl">{item.icon}</div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
