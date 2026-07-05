export default function SVGRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="w-[280px] h-[280px] md:w-[360px] md:h-[360px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring - slow */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="rgba(0, 212, 255, 0.08)"
          strokeWidth="1"
          strokeDasharray="40 20 10 20"
          style={{ animation: 'ring-spin 30s linear infinite' }}
          transform-origin="200 200"
        />

        {/* Middle ring - medium */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="rgba(0, 212, 255, 0.12)"
          strokeWidth="0.8"
          strokeDasharray="20 30 5 15"
          style={{
            animation: 'ring-spin 20s linear infinite reverse',
            transformOrigin: '200px 200px',
          }}
        />

        {/* Inner ring - faster */}
        <circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="rgba(0, 212, 255, 0.15)"
          strokeWidth="0.6"
          strokeDasharray="8 12 30 12"
          style={{
            animation: 'ring-spin 15s linear infinite',
            transformOrigin: '200px 200px',
          }}
        />

        {/* Core glow */}
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="60" fill="url(#core-glow)" />

        {/* Tick marks on outer ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2 - Math.PI / 2
          const x1 = 200 + Math.cos(angle) * 175
          const y1 = 200 + Math.sin(angle) * 175
          const x2 = 200 + Math.cos(angle) * 185
          const y2 = 200 + Math.sin(angle) * 185
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`rgba(0, 212, 255, ${i % 6 === 0 ? 0.2 : 0.08})`}
              strokeWidth="0.8"
            />
          )
        })}
      </svg>
    </div>
  )
}
