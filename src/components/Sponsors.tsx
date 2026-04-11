const SPONSORS = {
    platinum: [
        { name: 'Company1', logo: null },
        { name: 'Company2', logo: null },
    ],
    gold: [
        { name: 'Company3', logo: null },
        { name: 'Company4', logo: null },
        { name: 'Company5', logo: null },
    ],
    silver: [
        { name: 'Company6', logo: null },
        { name: 'Company7', logo: null },
        { name: 'Company8', logo: null },
        { name: 'Company9', logo: null },
    ]
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
                <div className="sponsor-tier">
                    <div className="tier-label">
                        <div className="tier-badge tier-badge--platinum">Platinum</div>
                    </div>
                    <div className="tier-grid tier-grid--platinum">
                        {SPONSORS.platinum.map((s, i) => (
                            <div className="sponsor-card sponsor-card--platinum" key={i}>
                                <div className="sponsor-card-inner">
                                    <div className="sponsor-logo-placeholder">{s.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sponsor-tier">
                    <div className="tier-label">
                        <div className="tier-badge tier-badge--gold">Gold</div>
                    </div>
                    <div className="tier-grid tier-grid--gold">
                        {SPONSORS.gold.map((s, i) => (
                            <div className="sponsor-card sponsor-card--gold" key={i}>
                                <div className="sponsor-card-inner">
                                    <div className="sponsor-logo-placeholder">{s.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sponsor-tier">
                    <div className="tier-label">
                        <div className="tier-badge tier-badge--silver">Silver</div>
                    </div>
                    <div className="tier-grid tier-grid--silver">
                        {SPONSORS.silver.map((s, i) => (
                            <div className="sponsor-card sponsor-card--silver" key={i}>
                                <div className="sponsor-card-inner">
                                    <div className="sponsor-logo-placeholder">{s.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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