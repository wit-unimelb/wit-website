import Button from '@/components/ui/Button'
import './ExperiencePage.css'

const principles = [
    ['Community', 'Find people who are growing alongside you.'],
    ['Curiosity', 'Make room for the questions that lead somewhere new.'],
    ['Opportunity', 'Turn the next conversation into a possible future.'],
]

export default function ExperiencePage() {
    return (
        <article className="new-site-page experience-showcase">
            <div className="experience-showcase__halo experience-showcase__halo--one" aria-hidden="true" />
            <div className="experience-showcase__halo experience-showcase__halo--two" aria-hidden="true" />
            <div className="experience-showcase__grid" aria-hidden="true" />

            <div className="experience-showcase__inner ds-container">
                <div className="experience-showcase__intro">
                    <p className="experience-showcase__eyebrow">Women in Technology · University of Melbourne</p>
                    <h1>Experience<br /><em>WiT</em></h1>
                    <p className="experience-showcase__lead">
                        A community for women and allies shaping their own place in technology.
                    </p>
                    <Button
                        href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Join our community
                    </Button>
                </div>

                <aside className="experience-showcase__panel" aria-label="The WiT experience">
                    <p className="experience-showcase__panel-label">The WiT experience</p>
                    <p className="experience-showcase__statement">
                        Where ideas, confidence, and connection come together.
                    </p>
                    <ul className="experience-showcase__principles">
                        {principles.map(([title, description], index) => (
                            <li key={title}>
                                <span>0{index + 1}</span>
                                <div>
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <p className="experience-showcase__footer-note">Scroll pages will inherit this shared background and navigation system.</p>
        </article>
    )
}
