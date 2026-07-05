import type { ReactNode } from 'react'

interface Props {
  text: string
  mode?: 'words' | 'chars'
  className?: string
  wordClassName?: string
  charClassName?: string
}

export default function SplitText({
  text,
  mode = 'words',
  className = '',
  wordClassName = '',
  charClassName = '',
}: Props): ReactNode {
  if (mode === 'chars') {
    return (
      <span className={className} aria-label={text}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            className={`char inline-block ${charClassName}`}
            aria-hidden="true"
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i, arr) => (
        <span
          key={i}
          className={`word inline-block ${wordClassName}`}
          aria-hidden="true"
        >
          {word}
          {i < arr.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}
