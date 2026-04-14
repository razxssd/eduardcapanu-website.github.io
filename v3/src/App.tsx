import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'

const Story = lazy(() => import('./components/sections/Story'))
const Capabilities = lazy(() => import('./components/sections/Capabilities'))
const Work = lazy(() => import('./components/sections/Work'))
const Voices = lazy(() => import('./components/sections/Voices'))
const Connect = lazy(() => import('./components/sections/Connect'))

export default function App() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={null}>
        <Story />
        <Capabilities />
        <Work />
        <Voices />
        <Connect />
      </Suspense>
    </Layout>
  )
}
