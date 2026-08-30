import GlassPanel from '@/components/ui/GlassPanel'
import PageCanvas from '@/components/layout/PageCanvas'
import PageHero from '@/components/ui/PageHero'
import './AboutPage.css'

type Person = {
    name?: string
    role: string
    photo?: string
}

// TODO: add `photo: '...'` per person once images are hosted on R2 (Tuesday)
const committee: Person[] = [
    { role: 'President', name: 'Sara Banfalvi' },
    { role: 'Vice President', name: 'Manya Arya' },
    { role: 'Secretary', name: 'Rachel Chen' },
    { role: 'Treasurer', name: 'Natasha Rumbens' },
    { role: 'Events Director', name: 'Tanvi Mishra' },
    { role: 'Education Director', name: 'Honey Raut' },
    { role: 'Media Director', name: 'Violani Julia' },
    { role: 'Promotions Director', name: 'Claudia Acuña' },
    { role: 'IT Director', name: 'Emma Xu' },
    { role: 'Industry Director', name: 'Wendy Zhou' },
    { role: 'P&C Director', name: 'Gayathri Raghavan' },
]

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
                {person.photo ? <img src={person.photo} alt={person.name ?? person.role} loading="lazy" /> : null}
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
                    <h2 className="ui-section-heading about-intro-panel__title">Alumnis</h2>
                </GlassPanel>

                <GlassPanel className="about-intro-panel about-intro-panel--committee">
                    <h2 className="ui-section-heading about-intro-panel__title">Meet our committee</h2>
                </GlassPanel>
            </div>

            <GlassPanel className="about-section">
                <h2 className="ui-section-heading about-section__heading">Committee</h2>
                {/* TODO: add group picnic photo here once hosted on R2 */}
                <div className="about-people">
                    {committee.map((person) => (
                        <PersonCard key={person.role} person={person} />
                    ))}
                </div>
            </GlassPanel>

            <GlassPanel className="about-section">
                <h2 className="ui-section-heading about-section__heading">Department</h2>
                {/* TODO: add group picnic photo here once hosted on R2 */}
                <div className="about-people about-people--wide">
                    {departments.map((person) => (
                        <PersonCard key={person.role} person={person} wide />
                    ))}
                </div>
            </GlassPanel>
        </div>
    )
}