import type { ReactNode } from 'react'

interface Props {
  id: string
  children: ReactNode
  className?: string
  fullHeight?: boolean
}

export default function SectionWrapper({ id, children, className = '', fullHeight = false }: Props) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 md:px-12 lg:px-24 py-20 md:py-32 ${
        fullHeight ? 'min-h-screen flex flex-col justify-center' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
}
