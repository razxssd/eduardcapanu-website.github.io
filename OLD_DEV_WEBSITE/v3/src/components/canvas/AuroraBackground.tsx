interface Props {
  className?: string
}

export default function AuroraBackground({ className = '' }: Props) {
  return (
    <div
      className={`aurora absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
