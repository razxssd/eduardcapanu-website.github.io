import type { ReactNode } from 'react'
import Navigation from './Navigation'
import NavigationDots from '../ui/NavigationDots'

const SECTIONS = ['hero', 'about', 'career', 'skills', 'impact', 'writings', 'testimonials', 'contact'] as const

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="scan-lines relative min-h-screen bg-bg">
      <Navigation sections={SECTIONS} />
      <NavigationDots sections={SECTIONS} />
      <main>{children}</main>
    </div>
  )
}
