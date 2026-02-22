export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pb-16 pt-32 text-center md:pb-24 md:pt-40">
      {/* Glow orb behind title */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, oklch(0.82 0.19 195 / 0.4), oklch(0.72 0.19 25 / 0.2), transparent)',
        }}
        aria-hidden="true"
      />

      <p className="animate-fade-up mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        Editorial Blog
      </p>
      <h1
        className="animate-fade-up font-serif text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance"
        style={{ animationDelay: '100ms' }}
      >
        the<span className="text-primary">void</span>
      </h1>
      <p
        className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty"
        style={{ animationDelay: '200ms' }}
      >
        Exploring the frontiers of technology, design, and code.
        Deep dives into what shapes the future.
      </p>
    </section>
  )
}
