import { Experience } from '@/types'

export const experienceData: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Tech Startup Inc.',
    location: 'Remote',
    startDate: '2023-01',
    endDate: undefined,
    isCurrent: true,
    description:
      'Leading frontend development for web applications, mentoring junior developers, and implementing best practices across the team.',
    achievements: [
      'Improved app performance by 40% through code optimization',
      'Led migration of legacy codebase to TypeScript',
      'Mentored 3 junior developers in React and web development',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    location: 'City, Country',
    startDate: '2021-06',
    endDate: '2022-12',
    isCurrent: false,
    description:
      'Developed and maintained full-stack applications, working with both frontend and backend technologies.',
    achievements: [
      'Built 5+ customer-facing web applications',
      'Implemented real-time data synchronization using WebSocket',
      'Reduced database query time by 60%',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    id: '3',
    role: 'Junior Web Developer',
    company: 'Web Agency Plus',
    location: 'City, Country',
    startDate: '2020-08',
    endDate: '2021-05',
    isCurrent: false,
    description:
      'Started my career as a junior developer, learning web development fundamentals and building client websites.',
    achievements: [
      'Developed 10+ responsive websites for clients',
      'Learned React, JavaScript, and modern web development practices',
      'Improved code quality through code reviews',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'WordPress'],
  },
]
