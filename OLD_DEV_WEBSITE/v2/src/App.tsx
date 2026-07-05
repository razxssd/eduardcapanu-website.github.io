import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import CareerJourney from './components/sections/CareerJourney'
import Skills from './components/sections/Skills'
import Impact from './components/sections/Impact'
import Writings from './components/sections/Writings'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <CareerJourney />
      <Skills />
      <Impact />
      <Writings />
      <Testimonials />
      <Contact />
    </Layout>
  )
}
