import GlassPanel from '@/components/ui/GlassPanel'
import PageCanvas from '@/components/layout/PageCanvas'
import PageHero from '@/components/ui/PageHero'
import './AboutPage.css'

type Person = {
    name?: string
    role: string
    photo?: string
}

const committee: Person[] = [
    { role: 'President', name: 'Sara Banfalvi', photo: '/images/committee/president.jpg' },
    { role: 'Vice President', name: 'Manya Arya', photo: '/images/committee/vice-president.jpg' },
    { role: 'Secretary', name: 'Rachel Chen', photo: '/images/committee/secretary.jpg' },
    { role: 'Treasurer', name: 'Natasha Rumbens', photo: '/images/committee/treasurer.jpg' },
    { role: 'Events Director', name: 'Tanvi Mishra', photo: '/images/committee/events-director.jpg' },
    { role: 'Education Director', name: 'Honey Raut', photo: '/images/committee/education-director.jpg' },
    { role: 'Media Director', name: 'Violani Julia', photo: '/images/committee/media-director.jpg' },
    { role: 'Promotions Director', name: 'Claudia Acuña', photo: '/images/committee/promotions-director.jpg' },
    { role: 'IT Director', name: 'Emma Xu', photo: '/images/committee/it-director.jpg' },
    { role: 'Industry Director', name: 'Wendy Zhou', photo: '/images/committee/industry-director.jpg' },
    { role: 'P&C Director', name: 'Gayathri Raghavan', photo: '/images/committee/p&c-director.jpg' },
]
// No names supplied yet for department members — add `name`/`photo` per
// person here the same way as the committee array above once you have them.
const departments: Person[] = [
    { role: 'Events' },
    { role: 'Industry' },
    { role: 'Media' },
    { role: 'IT' },
    { role: 'Promotions' },
    { role: 'Education' },
    { role: 'P&C' },
]

function PersonCard({ person, wide = false }: { person: Person; wide?: boolean }) {
    const words = person.role.split(' ')
    const last = words.pop()
    const rest = words.join(' ')

    return (
        <div className={`about-person${wide ? ' about-person--wide' : ''}`}>
            <div className="about-person__photo">
                {person.photo ? <img src={person.photo} alt={person.name ?? person.role} /> : null}
                {person.name ? <span className="about-person__overlay">{person.name}</span> : null}
            </div>
            <p className="about-person__role">
                {rest ? `${rest} ` : null}
                <strong>{last}</strong>
            </p>
        </div>
    )
}

export default function AboutPage() {
    return (
        <div className="new-site-page about-page">
            <PageCanvas page="about" />

            <PageHero
                title="About Us"
                lead="We come from diverse backgrounds and fields, united by a shared passion for empowering women and creating meaningful connections in technology."
            />

            <div className="about-intro-panels">
                <GlassPanel className="about-intro-panel">
                    <span className="about-intro-panel__sparkle" aria-hidden="true">
                        ✦
                    </span>
                    <h2 className="about-intro-panel__title">Alumnis</h2>
                </GlassPanel>

                <GlassPanel className="about-intro-panel about-intro-panel--committee">
                    <h2 className="about-intro-panel__title">Meet our committee</h2>
                </GlassPanel>
            </div>

            <section className="about-section">
                <h2 className="ui-section-heading about-section__heading">Committee</h2>
                <div className="about-people">
                    {committee.map((person) => (
                        <PersonCard key={person.role} person={person} />
                    ))}
                </div>
            </section>

            <section className="about-section">
                <h2 className="ui-section-heading about-section__heading">Department</h2>
                <div className="about-people about-people--wide">
                    {departments.map((person) => (
                        <PersonCard key={person.role} person={person} wide />
                    ))}
                </div>
            </section>
        </div>
    )
}