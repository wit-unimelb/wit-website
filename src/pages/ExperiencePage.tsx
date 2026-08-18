import { Link } from 'react-router-dom'

const moments = [
    {
        number: '01',
        title: 'Arrive exactly as you are.',
        copy: 'Whether you are opening your first code editor or already mapping out your next role, WiT is a place to ask the questions, meet the people, and take the next step at your own pace.',
    },
    {
        number: '02',
        title: 'Learn by doing.',
        copy: 'Hands-on workshops make technical ideas feel less abstract. Bring a laptop, follow along, get unstuck together, and leave with something new in your toolkit.',
    },
    {
        number: '03',
        title: 'Find your people.',
        copy: 'The best part of a university club is the people you keep seeing. From first-year nerves to final-year decisions, there is room here for the conversations that make uni feel smaller.',
    },
]

const paths = [
    ['Build', 'Workshop series, peer learning, and practical sessions that turn curiosity into confidence.'],
    ['Connect', 'Easy-going socials and community moments made for finding familiar faces on campus.'],
    ['Grow', 'Industry conversations, mentoring, and opportunities that help make future choices feel tangible.'],
]

export default function ExperiencePage() {
    return (
        <article className="experience-page">
            <section className="experience-hero" aria-labelledby="experience-title">
                <div className="experience-orbit experience-orbit--one" aria-hidden="true" />
                <div className="experience-orbit experience-orbit--two" aria-hidden="true" />
                <p className="experience-kicker">Women in Technology · University of Melbourne</p>
                <h1 id="experience-title">A little more <em>possibility</em> in every scroll.</h1>
                <p className="experience-hero-copy">
                    A long-form home for the moments, people, and ideas that make WiT more than a club.
                </p>
                <a className="experience-scroll-cue" href="#beginning">
                    <span>Scroll to explore</span>
                    <i aria-hidden="true" />
                </a>
            </section>

            <section className="experience-intro" id="beginning" aria-labelledby="intro-title">
                <div className="experience-section-label">
                    <span>01</span>
                    <p>What we are here for</p>
                </div>
                <div className="experience-intro-copy">
                    <p className="experience-overline">For every version of your future</p>
                    <h2 id="intro-title">There is no single way to belong in <em>tech.</em></h2>
                    <p>
                        WiT brings together students who are curious about the field, serious about their craft, or simply looking for a community that understands the journey. We make space for all three.
                    </p>
                </div>
                <div className="experience-intro-note">
                    <span className="experience-note-mark" aria-hidden="true">“</span>
                    <p>Start where you are. Keep going with people who have your back.</p>
                </div>
            </section>

            <section className="experience-moments" aria-labelledby="moments-title">
                <header className="experience-moments-header">
                    <div className="experience-section-label experience-section-label--light">
                        <span>02</span>
                        <p>The WiT rhythm</p>
                    </div>
                    <h2 id="moments-title">Big growth, made of small <em>moments.</em></h2>
                </header>
                <div className="experience-moments-list">
                    {moments.map((moment) => (
                        <article className="experience-moment" key={moment.number}>
                            <p className="experience-moment-number">{moment.number}</p>
                            <div>
                                <h3>{moment.title}</h3>
                                <p>{moment.copy}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="experience-paths" aria-labelledby="paths-title">
                <div className="experience-paths-heading">
                    <div className="experience-section-label">
                        <span>03</span>
                        <p>Choose your own route</p>
                    </div>
                    <h2 id="paths-title">The path is yours. We just make it feel less <em>lonely.</em></h2>
                </div>
                <div className="experience-path-grid">
                    {paths.map(([name, copy], index) => (
                        <article className={`experience-path experience-path--${index + 1}`} key={name}>
                            <div className="experience-path-number" aria-hidden="true">0{index + 1}</div>
                            <div className="experience-path-content">
                                <h3>{name}</h3>
                                <p>{copy}</p>
                            </div>
                            <span className="experience-path-line" aria-hidden="true" />
                        </article>
                    ))}
                </div>
            </section>

            <section className="experience-pause" aria-label="A moment to pause">
                <p>Make room for the version of you that is still becoming.</p>
                <span aria-hidden="true">✦</span>
            </section>

            <section className="experience-future" aria-labelledby="future-title">
                <div className="experience-future-shape" aria-hidden="true" />
                <div className="experience-future-copy">
                    <div className="experience-section-label">
                        <span>04</span>
                        <p>Come with us</p>
                    </div>
                    <h2 id="future-title">Your next chapter can start with a <em>hello.</em></h2>
                    <p>
                        See what is coming up, meet the people in the room, and find a corner of tech that feels like yours.
                    </p>
                    <div className="experience-future-actions">
                        <Link to="/events" className="btn-primary">Explore events <span>→</span></Link>
                        <a
                            className="experience-text-link"
                            href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Join WiT <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </section>
        </article>
    )
}
