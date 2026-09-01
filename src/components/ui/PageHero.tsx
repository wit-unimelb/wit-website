import type { ReactNode } from 'react'

type PageHeroProps = {
    eyebrow?: ReactNode
    title: ReactNode
    lead?: ReactNode
    compact?: boolean
}

export default function PageHero({ eyebrow, title, lead, compact = false }: PageHeroProps) {
    return (
        <header className={`ui-page-hero${compact ? ' ui-page-hero--compact' : ''}`}>
            {eyebrow ? <p className="ui-page-hero__eyebrow">{eyebrow}</p> : null}
            <h1 className="ui-page-hero__title">{title}</h1>
            {lead ? <p className="ui-page-hero__lead">{lead}</p> : null}
        </header>
    )
}
