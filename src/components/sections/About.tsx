import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

export function About() {
  const whatIBring = [
    "I’m a Senior React Engineer with 6+ years of experience building scalable, high-performance web applications at enterprise scale. Currently at ConnectWise, I architect solutions for PSA and CPQ platforms, handling complex workflows and large data systems.",

    "I’ve optimized quote builders to reduce re-renders by 60%, built data grids handling 50,000+ records under 500ms, and developed real-time pricing systems integrating multiple APIs. My focus goes beyond code—I design systems aligned with business logic and data architecture to drive real impact.",

    "I thrive in solving complex problems at scale, where architecture directly influences performance and user experience. I also mentor engineers, establish best practices, and build design systems that improve team productivity.",

    "I’m passionate about performance, system design, and developer experience—and always exploring better ways to build, scale, and optimize modern web applications.",
  ];
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
          {whatIBring.map((item) => (
            <p>{item}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: "🎯",
              title: "Goal-Oriented",
              desc: "Focused on delivering results",
            },
            {
              icon: "🚀",
              title: "Innovation-Driven",
              desc: "Always exploring new solutions",
            },
            {
              icon: "🤝",
              title: "Collaborative",
              desc: "Love working with great teams",
            },
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
  );
}
