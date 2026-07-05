import type { ReactNode } from 'react'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import Navigation from './Navigation'
import ScrollProgress from './ScrollProgress'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  useSmoothScroll()

  return (
    <div className="scan-lines relative min-h-screen">
      <ScrollProgress />
      <Navigation />
      <main>{children}</main>
    </div>
  )
}
