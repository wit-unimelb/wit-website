import type { HTMLAttributes, PropsWithChildren } from 'react'

type GlassPanelProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    strength?: 'standard' | 'strong'
}

export default function GlassPanel({ children, className = '', strength = 'standard', ...props }: GlassPanelProps) {
    const strengthClass = strength === 'strong' ? ' ui-glass-panel--strong' : ''

    return (
        <div className={`ui-glass-panel${strengthClass} ${className}`.trim()} {...props}>
            {children}
        </div>
    )
}
