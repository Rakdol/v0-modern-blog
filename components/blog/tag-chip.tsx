interface TagChipProps {
  tag: string
  variant?: 'default' | 'glow'
}

const colorMap: Record<string, string> = {
  design: 'border-glow-coral/40 text-glow-coral',
  AI: 'border-glow-cyan/40 text-glow-cyan',
  interfaces: 'border-glow-lime/40 text-glow-lime',
  performance: 'border-glow-cyan/40 text-glow-cyan',
  animation: 'border-glow-coral/40 text-glow-coral',
  CSS: 'border-glow-lime/40 text-glow-lime',
  react: 'border-glow-cyan/40 text-glow-cyan',
  architecture: 'border-glow-coral/40 text-glow-coral',
  typography: 'border-glow-lime/40 text-glow-lime',
}

const defaultColor = 'border-muted-foreground/30 text-muted-foreground'

export function TagChip({ tag, variant = 'default' }: TagChipProps) {
  const colorClass = colorMap[tag] || defaultColor

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase ${colorClass} ${
        variant === 'glow' ? 'bg-secondary/30' : 'bg-transparent'
      }`}
    >
      {tag}
    </span>
  )
}
