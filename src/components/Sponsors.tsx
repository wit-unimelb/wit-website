type Sponsor = {
    name: string
    logo?: string | null
}

type SponsorTier = 'platinum' | 'gold' | 'silver'

const SPONSORS: Record<SponsorTier, Sponsor[]> = {
    platinum: [
        { name: 'Airwallex', logo: null },
    ],
    gold: [
        { name: 'Macquarie', logo: null },
        { name: 'Jane Street', logo: null },
        { name: 'Atlassian', logo: null },
        { name: 'AustralianSuper', logo: null },
    ],
    silver: [
        { name: 'Vanguard', logo: null },
    ]
}

const SPONSOR_TIER_LABELS: Record<SponsorTier, string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
}

const sponsorLogoFiles = import.meta.glob('../assets/sponsors/*.{png,jpg,jpeg,svg,webp,avif}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

function normalizeSponsorKey(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const sponsorLogosByKey = Object.fromEntries(
    Object.entries(sponsorLogoFiles).map(([path, src]) => {
        const filename = path.split('/').pop() ?? ''
        const basename = filename.replace(/\.[^.]+$/, '')

        return [normalizeSponsorKey(basename), src]
    })
) as Record<string, string>

function getSponsorLogo(sponsor: Sponsor) {
    const logoKey = normalizeSponsorKey(sponsor.logo ?? sponsor.name)
    return sponsorLogosByKey[logoKey]
}

export default function Sponsors() {
    return (
        <section className="sponsors-page">
            <div className="sponsors-page-inner">

                <div className="sponsors-header">
                    <p className="section-kicker">Our Partners</p>
                    <h2 className="section-heading">2026 <em>Sponsors</em></h2>
                    <p className="sponsors-lead">
                        WiT is proudly supported by industry leaders who share our commitment
                        to empowering women in technology.
                    </p>
                </div>
                {(Object.keys(SPONSORS) as SponsorTier[]).map((tier) => (
                    <div className="sponsor-tier" key={tier}>
                        <div className="tier-label">
                            <div className={`tier-badge tier-badge--${tier}`}>{SPONSOR_TIER_LABELS[tier]}</div>
                        </div>
                        <div className={`tier-grid tier-grid--${tier}`}>
                            {SPONSORS[tier].map((sponsor) => {
                                const logoSrc = getSponsorLogo(sponsor)

                                return (
                                    <div className={`sponsor-card sponsor-card--${tier}`} key={sponsor.name}>
                                        <div className="sponsor-card-inner">
                                            {logoSrc ? (
                                                <img
                                                    className="sponsor-logo"
                                                    src={logoSrc}
                                                    alt={`${sponsor.name} logo`}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="sponsor-logo-placeholder">
                                                    <span>{sponsor.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
                <div className="sponsors-cta">
                    <h3>Interested in sponsoring WIT?</h3>
                    <p>
                        Partner with us to connect with Melbourne's brightest women in tech.
                        Download our prospectus or get in touch directly.
                    </p>
                    <div className="sponsors-cta-actions">
                        <a href="#" className="btn-primary">Download Prospectus</a>
                        <a href="#" className="btn-ghost">Contact Us</a>
                    </div>
                </div>

            </div>
        </section>
    )
}
