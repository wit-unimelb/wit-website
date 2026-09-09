import { useState, type FormEvent } from 'react'

import PageHero from '@/components/ui/PageHero'

import './ContactPage.css'

const contactEmail = 'women.in.ict.unimelb@gmail.org'
const contactEndpoint = import.meta.env.VITE_CONTACT_API_URL ?? 'https://wit-contact-api.women-in-ict-unimelb.workers.dev/api/contact'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
    const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
    const [isDiscordNoticeVisible, setIsDiscordNoticeVisible] = useState(false)

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
        <article className="new-site-page contact-page">
            <PageHero
                title="Contact us"
                lead="Have a question or want to get involved? We’d love to hear from you!"
                compact
            />

            <div className="contact-page__content ds-container">
                <form className="contact-page__form ui-glass-panel ui-glass-panel--strong" onSubmit={handleSubmit}>
                    <h2 className="ui-section-heading">Send us questions!</h2>

                    <input aria-hidden="true" autoComplete="off" className="contact-page__honeypot" name="website" tabIndex={-1} type="text" />

                    <div className="contact-page__fields">
                        <div className="ui-form-field">
                            <label htmlFor="first-name">First name <span aria-hidden="true" className="contact-page__required">*</span></label>
                            <input autoComplete="given-name" id="first-name" name="firstName" placeholder="First name" required />
                        </div>

                        <div className="ui-form-field">
                            <label htmlFor="last-name">Last name</label>
                            <input autoComplete="family-name" id="last-name" name="lastName" placeholder="Last name" />
                        </div>

                        <div className="ui-form-field">
                            <label htmlFor="email">Email <span aria-hidden="true" className="contact-page__required">*</span></label>
                            <input autoComplete="email" id="email" name="email" placeholder="Email" required type="email" />
                        </div>

                        <div className="ui-form-field">
                            <label htmlFor="phone">Phone number <span aria-hidden="true" className="contact-page__required">*</span></label>
                            <input autoComplete="tel" id="phone" name="phone" placeholder="Phone number" required type="tel" />
                        </div>

                        <div className="ui-form-field">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" placeholder="Message" />
                        </div>
                    </div>

                    <button className={`contact-page__submit${submissionState === 'success' ? ' is-submitted' : ''}`} disabled={submissionState === 'submitting' || submissionState === 'success'} type="submit">
                        <span aria-live="polite" key={submissionState}>
                            {submissionState === 'success' ? 'Thank you, we will be in touch :)' : null}
                            {submissionState === 'submitting' ? 'Sending message…' : null}
                            {submissionState === 'error' ? 'Unable to send — please try again' : null}
                            {submissionState === 'idle' ? 'Send Message' : null}
                        </span>
                    </button>
                </form>

                <aside aria-label="Contact details" className="contact-page__details">
                    <section className="contact-page__detail-group">
                        <h2 className="ui-section-heading">Location</h2>
                        <p className="ui-section-body">The University of Melbourne</p>
                    </section>

                    <section className="contact-page__detail-group">
                        <h2 className="ui-section-heading">Social media</h2>
                        <ul className="contact-page__social-links ui-section-body">
                            <li>
                                <a className="contact-page__social-link" href="https://www.instagram.com/witunimelb/" rel="noreferrer" target="_blank">
                                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" alt="" />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a className="contact-page__social-link" href="https://www.linkedin.com/company/women-in-tech-wit-unimelb/" rel="noreferrer" target="_blank">
                                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" alt="" />
                                    <span>LinkedIn</span>
                                </a>
                            </li>
                            <li>
                                <a className="contact-page__social-link" href="https://www.facebook.com/witunimelb" rel="noreferrer" target="_blank">
                                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg" alt="" />
                                    <span>Facebook</span>
                                </a>
                            </li>
                            {/* TODO: Populate a fresh invite from the scheduled Discord-link worker. */}
                            <li>
                                <button aria-controls="discord-status" aria-expanded={isDiscordNoticeVisible} className="contact-page__social-link" onClick={() => setIsDiscordNoticeVisible((visible) => !visible)} type="button">
                                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" alt="" />
                                    <span>Discord</span>
                                </button>
                            </li>
                        </ul>
                        {isDiscordNoticeVisible ? <p className="contact-page__discord-notice" id="discord-status" role="status">A refreshed invite link is coming soon.</p> : null}
                    </section>

                    <section className="contact-page__detail-group">
                        <h2 className="ui-section-heading">Email</h2>
                        <a className="contact-page__email ui-section-body" href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    </section>
                </aside>
            </div>
        </article>
    )
}
