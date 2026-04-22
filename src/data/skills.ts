import { SkillCategory } from '@/types'

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript', level: 95 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    category: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Vercel', level: 85 },
    ],
  },
]
