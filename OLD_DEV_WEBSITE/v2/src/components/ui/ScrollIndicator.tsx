export default function ScrollIndicator() {
  return (
    <a
      href="#about"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors duration-300"
      aria-label="Scroll down"
    >
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          className="text-current"
          style={{
            animation: `chevron-cascade 1.5s ease-in-out ${i * 0.2}s infinite`,
          }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </a>
  )
}
