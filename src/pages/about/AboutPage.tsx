import GlassPanel from '@/components/ui/GlassPanel'
import PageCanvas from '@/components/layout/PageCanvas'
import PageHero from '@/components/ui/PageHero'
import './AboutPage.css'


type Person = {
    name?: string
    role: string
    photo?: string
    linkedin?: string
}

const CLOUD = import.meta.env.VITE_ASSET_BASE_URL
const asset = (filename: string) => CLOUD + encodeURIComponent(filename)

const committee: Person[] = [
    { role: 'President', name: 'Sara Banfalvi', linkedin: 'https://www.linkedin.com/in/sara-banfalvi/', photo: asset('president.jpg') },
    { role: 'Vice President', name: 'Manya Arya', linkedin: 'https://www.linkedin.com/in/manya-arya/', photo: asset('vice-president.jpg') },
    { role: 'Secretary', name: 'Rachel Chen', linkedin: 'https://www.linkedin.com/in/rachel-chen-4871902bb/', photo: asset('secretary.jpg') },
    { role: 'Treasurer', name: 'Natasha Rumbens', linkedin: 'https://www.linkedin.com/in/natasha-rumbens/', photo: asset('treasurer.jpg') },
    { role: 'Events Director', name: 'Tanvi Mishra', linkedin: 'https://www.linkedin.com/in/tanvi-mishra-b03411262/', photo: asset('events-director.jpg') },
    { role: 'Education Director', name: 'Honey Raut', linkedin: 'https://www.linkedin.com/in/honeyraut/', photo: asset('education-director.jpg') },
    { role: 'Media Director', name: 'Violani Julia', linkedin: 'https://www.linkedin.com/in/violani-julia/', photo: asset('media-director.jpg') },
    { role: 'Promotions Director', name: 'Claudia Acuña', linkedin: 'https://www.linkedin.com/in/claudiaacunakuroiwa/', photo: asset('promotions-director.jpg') },
    { role: 'IT Director', name: 'Emma Xu', linkedin: 'https://www.linkedin.com/in/emma-xu-97a0b4287/', photo: asset('it-director.jpg') },
    { role: 'Industry Director', name: 'Wendy Zhou', linkedin: 'https://www.linkedin.com/in/wendy-zhou-749473303/', photo: asset('industry-director.jpg') },
    { role: 'P&C Director', name: 'Gayathri Raghavan', linkedin: 'https://www.linkedin.com/in/gayathri-raghavan-1b4b77232/', photo: asset('p&c-director.jpg') },
]

const departments: Person[] = [
    { role: 'Events', photo: asset('events-team.jpg') },
    { role: 'Industry', photo: asset('industry-team.jpg') },
    { role: 'Media', photo: asset('media-team.jpg') },
    { role: 'IT', photo: asset('it-team.jpg') },
    { role: 'Promotions', photo: asset('promotions-team.jpg') },
    { role: 'Education', photo: asset('education-team.jpg') },
    { role: 'P&C', photo: asset('p&c.jpg') },
]

function PersonCard({ person, wide = false }: { person: Person; wide?: boolean }) {
    const words = person.role.split(' ')
    const last = words.pop()
    const rest = words.join(' ')
    const linkLabel = (person.name || person.role) + ' LinkedIn profile'

    const photoContent = (
        <>
            {person.photo ? <img src={person.photo} alt={person.name || person.role} loading="lazy" /> : null}
            {person.name ? <span className="about-person__overlay">{person.name}</span> : null}
        </>
    )

    if (person.linkedin) {
        return (
            <div className={'about-person' + (wide ? ' about-person--wide' : '')}>
                <a className="about-person__photo" href={person.linkedin} target="_blank" rel="noreferrer" aria-label={linkLabel}>
                    {photoContent}
                </a>
                <p className="about-person__role">
                    {rest ? rest + ' ' : null}
                    <strong>{last}</strong>
                </p>
            </div>
        )
    }

    return (
        <div className={'about-person' + (wide ? ' about-person--wide' : '')}>
            <div className="about-person__photo">{photoContent}</div>
            <p className="about-person__role">
                {rest ? rest + ' ' : null}
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
                <div className="about-people">
                    {committee.map((person) => (
                        <PersonCard key={person.role} person={person} />
                    ))}
                </div>
            </GlassPanel>

            <GlassPanel className="about-section">
                <h2 className="ui-section-heading about-section__heading">Department</h2>
                <div className="about-people about-people--wide">
                    {departments.map((person) => (
                        <PersonCard key={person.role} person={person} wide />
                    ))}
                </div>
            </GlassPanel>
        </div>
    )
}