import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { Info } from '@/components/sections/Info'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

function App() {
  return (
    <Layout>
      <Hero />
      <Info />
      <About />
      <Experience />
      <Testimonials />
      <Contact />
    </Layout>
  )
}

export default App
