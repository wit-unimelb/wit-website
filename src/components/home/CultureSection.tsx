import { useState } from 'react'

import { assetUrl } from '@/assets'
import GlassPanel from '@/components/ui/GlassPanel'

import './CultureSection.css'

const cultureCards = [
    {
        description: 'A welcoming space for women and allies across every degree and year level. Find your people at our socials, workshops, and casual meetups.',
        icon: 'culture:community.svg',
        title: 'Community',
    },
    {
        description: "Panels, networking nights, and company visits that bridge the gap between uni and the industry roles you're working towards.",
        icon: 'culture:industry-exposure.svg',
        title: 'Industry Exposure',
    },
    {
        description: 'Join our committee, lead subteams and build real skills in events, design, media, promotions and more — all while still at uni.',
        icon: 'culture:leadership.svg',
        title: 'Leadership',
    },
]

type CultureCardProps = (typeof cultureCards)[number]

function CultureCard({ description, icon, title }: CultureCardProps) {
    const [isPinned, setIsPinned] = useState(false)

    return (
        <button
            aria-describedby={`culture-card-description-${title.toLowerCase().replaceAll(' ', '-')}`}
            aria-label={`Toggle ${title} details`}
            aria-pressed={isPinned}
            className="culture-card"
            data-pinned={isPinned}
            onClick={() => setIsPinned((isExpanded) => !isExpanded)}
            type="button"
        >
            <span className="culture-card__flipper">
                <GlassPanel aria-hidden="true" className="culture-card__face culture-card__face--front">
                    <img alt="" className="culture-card__icon" src={assetUrl(icon)} />
                    <span className="culture-card__title">{title}</span>
                </GlassPanel>

                <GlassPanel aria-hidden="true" className="culture-card__face culture-card__face--back" strength="strong">
                    <img alt="" className="culture-card__icon" src={assetUrl(icon)} />
                    <span className="culture-card__title">{title}</span>
                    <span className="culture-card__description">{description}</span>
                </GlassPanel>
            </span>
            <span className="culture-card__sr-only" id={`culture-card-description-${title.toLowerCase().replaceAll(' ', '-')}`}>
                {description}
            </span>
        </button>
    )
}

export default function CultureSection() {
    return (
        <section className="culture-section" aria-labelledby="culture-heading">
            <div className="culture-section__inner ds-container">
                <div className="culture-section__intro">
                    <p className="culture-section__eyebrow">What we do</p>
                    <h2 className="culture-section__heading" id="culture-heading">Community, Culture &amp; Careers</h2>
                </div>

                <div className="culture-section__cards">
                    {cultureCards.map((card) => <CultureCard key={card.title} {...card} />)}
                </div>
            </div>
        </section>
    )
}
