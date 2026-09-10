import { useState, type FormEvent } from 'react'
import Button from '@/components/ui/Button'
import PageHero from '@/components/ui/PageHero'
import './Sponsors.css'

type Sponsor = {
    name: string
    logo?: string | null
    logoMaxHeight?: number
    url?: string
}

type SponsorTier = 'platinum' | 'gold' | 'silver' | 'tailored'

const SPONSORS: Record<SponsorTier, Sponsor[]> = {
    platinum: [
        { name: 'Airwallex', logo: null, url: 'https://www.airwallex.com/au' },
    ],
    gold: [
        { name: 'Atlassian', logo: null, url: 'https://www.atlassian.com/' },
        { name: 'AustralianSuper', logo: null, url: 'https://www.australiansuper.com/' },
        { name: 'Macquarie', logo: null, url: 'https://www.macquarie.com.au/' },
        { name: 'Jane Street', logo: null, url: 'https://www.janestreet.com/' },
        { name: 'Fenwick', logo: null, url: 'https://www.fenwick.com.au/' },
    ],
    silver: [
        { name: 'Susquehanna', logo: null, logoMaxHeight: 80, url: 'https://sig.com/' },
        { name: 'Commonwealth Bank of Australia (CBA)', logo: 'cba', url: 'https://www.commbank.com.au/' },
        { name: 'Vanguard', logo: null, url: 'https://www.vanguard.com.au/corporate/' },
    ],
    tailored: [
        { name: 'Optiver', logo: null, url: 'https://optiver.com/' },
        { name: 'Accenture', logo: null, url: 'https://www.accenture.com/au-en' },
        { name: 'PWC', logo: null, logoMaxHeight: 70, url: 'https://www.pwc.com.au/' },
        { name: 'SEEK', logo: null, url: 'https://www.seek.com.au/' },
        { name: 'Ernst & Young (EY)', logo: 'ey', url: 'https://www.ey.com/en_au' },
    ],
}

const SPONSOR_TIER_LABELS: Record<SponsorTier, string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    tailored: 'Tailored',
}

const sponsorLogoFiles = import.meta.glob('../../assets/sponsors/*.{png,jpg,jpeg,svg,webp,avif}', {
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

const contactEndpoint = import.meta.env.VITE_CONTACT_API_URL ?? 'https://wit-contact-api.women-in-ict-unimelb.workers.dev/api/contact'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export default function Sponsors() {
    const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        setSubmissionState('submitting')

        try {
            const response = await fetch(contactEndpoint, {
                body: JSON.stringify({
                    email: formData.get('email'),
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    message: formData.get('message'),
                    phone: formData.get('phone'),
                    website: formData.get('website'),
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Unable to submit the contact form.')
            }

            form.reset()
            setSubmissionState('success')
        } catch {
            setSubmissionState('error')
        }
    }

    return (
        <article className="new-site-page sponsors-page">
            <PageHero
                className="sponsors-page__hero"
                compact
                eyebrow="Our partners"
                lead="WiT is proudly supported by industry leaders who share our commitment to empowering women in technology."
                title="2026 sponsors"
            />

            <div className="sponsors-page-inner ds-container">

                {(Object.keys(SPONSORS) as SponsorTier[]).map((tier) => (
                    <div className="sponsor-tier" key={tier}>
                        <div className="tier-label">
                            <div className={`tier-badge tier-badge--${tier}`}>
                                <span>✦ {SPONSOR_TIER_LABELS[tier].toUpperCase()} ✦</span>
                            </div>
                        </div>
                        <div className={`tier-grid tier-grid--${tier}`}>
                            {SPONSORS[tier].map((sponsor) => {
                                const logoSrc = getSponsorLogo(sponsor)

                                return (
                                    <a
                                        className={`sponsor-card sponsor-card--${tier}`}
                                        key={sponsor.name}
                                        href={sponsor.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="sponsor-card-inner">
                                            {logoSrc ? (
                                                <img
                                                    className="sponsor-logo"
                                                    src={logoSrc}
                                                    alt={`${sponsor.name} logo`}
                                                    loading="lazy"
                                                    style={sponsor.logoMaxHeight ? { maxHeight: sponsor.logoMaxHeight } : undefined}
                                                />
                                            ) : (
                                                <div className="sponsor-logo-placeholder">
                                                    <span>{sponsor.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                ))}

                <section className="sponsors-cta ui-glass-panel ui-glass-panel--strong">
                    <h2 className="ui-section-heading">Interested in sponsoring WiT?</h2>
                    <p className="ui-section-copy">
                        Partner with us to connect with Melbourne's brightest women in tech. Download our prospectus or get in touch directly.
                    </p>
                    <div className="sponsors-cta-actions">
                        <Button href="#" tone="gradient">Download Prospectus</Button>
                    </div>
                </section>

                <section className="sponsors-contact">
                    <h2 className="ui-section-heading">Contact us</h2>
                    <form className="sponsors-contact__form ui-glass-panel ui-glass-panel--strong" onSubmit={handleSubmit}>
                        <input aria-hidden="true" autoComplete="off" className="sponsors-contact__honeypot" name="website" tabIndex={-1} type="text" />

                        <div className="sponsors-contact__fields">
                            <div className="ui-form-field">
                                <label htmlFor="sponsors-first-name">First name <span aria-hidden="true" className="sponsors-contact__required">*</span></label>
                                <input autoComplete="given-name" id="sponsors-first-name" name="firstName" placeholder="First name" required />
                            </div>

                            <div className="ui-form-field">
                                <label htmlFor="sponsors-last-name">Last name</label>
                                <input autoComplete="family-name" id="sponsors-last-name" name="lastName" placeholder="Last name" />
                            </div>

                            <div className="ui-form-field">
                                <label htmlFor="sponsors-email">Email <span aria-hidden="true" className="sponsors-contact__required">*</span></label>
                                <input autoComplete="email" id="sponsors-email" name="email" placeholder="Email" required type="email" />
                            </div>

                            <div className="ui-form-field">
                                <label htmlFor="sponsors-phone">Phone number <span aria-hidden="true" className="sponsors-contact__required">*</span></label>
                                <input autoComplete="tel" id="sponsors-phone" name="phone" placeholder="Phone number" required type="tel" />
                            </div>

                            <div className="ui-form-field">
                                <label htmlFor="sponsors-message">Message</label>
                                <textarea id="sponsors-message" name="message" placeholder="Message" />
                            </div>
                        </div>

                        <button className={`sponsors-contact__submit${submissionState === 'success' ? ' is-submitted' : ''}`} disabled={submissionState === 'submitting' || submissionState === 'success'} type="submit">
                            <span aria-live="polite" key={submissionState}>
                                {submissionState === 'success' ? 'Thank you, we will be in touch :)' : null}
                                {submissionState === 'submitting' ? 'Sending message…' : null}
                                {submissionState === 'error' ? 'Unable to send — please try again' : null}
                                {submissionState === 'idle' ? 'Submit' : null}
                            </span>
                        </button>
                    </form>
                </section>

            </div>
        </article>
    )
}
