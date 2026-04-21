const pillars = [
    {
        title: 'Community',
        body: 'A welcoming space for women and allies across every degree and year level. Find your people at our socials, workshops, and casual meetups.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'Industry exposure',
        body: 'Panels, networking nights, and company visits that bridge the gap between uni and the industry roles you\'re working towards.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        title: 'Leadership',
        body: 'Join our committee, lead subteams, and build real skills in events, design, media, promotions and more — all while still at uni.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
]

export default function Pillars() {
    return (
        <section className="pillars">
            <div className="pillars-inner">
                <p className="section-kicker">What we do</p>
                <h2 className="section-heading">Community, <em>culture</em> &amp; careers</h2>
                <div className="pillars-grid">
                    {pillars.map((p) => (
                        <div className="pillar-card" key={p.title}>
                            <div className="pillar-icon">{p.icon}</div>
                            <h3>{p.title}</h3>
                            <p>{p.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}