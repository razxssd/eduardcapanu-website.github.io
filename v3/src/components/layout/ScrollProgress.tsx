import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent-green to-secondary"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  )
}
