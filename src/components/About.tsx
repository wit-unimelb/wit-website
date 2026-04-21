type TeamMember = {
    name: string
    role: string
    blurb: string
}

type SubcommitteeMember = {
    name: string
    photoUrl?: string
}

type SubcommitteeTeam = {
    name: string
    description: string
    members: SubcommitteeMember[]
}

const EXECUTIVES: TeamMember[] = [
    {
        name: 'Name Here',
        role: 'President',
        blurb: 'Add a short intro about the President here, including how they shape the club direction and member experience.',
    },
    {
        name: 'Name Here',
        role: 'Vice President',
        blurb: 'Use this space for a quick overview of how the Vice President supports operations, planning, and team coordination.',
    },
    {
        name: 'Name Here',
        role: 'Secretary',
        blurb: 'This can introduce the person handling club administration, finance, and the behind-the-scenes structure of the society.',
    },
    {
        name: 'Name Here',
        role: 'Treasurer',
        blurb: 'This can introduce the person handling club administration, finance, and the behind-the-scenes structure of the society.',
    }
]

const DIRECTORS: TeamMember[] = [
    {
        name: 'Name Here',
        role: 'P&C Director',
        blurb: 'Placeholder copy for the person leading workshops, socials, and the wider events calendar.',
    },
    {
        name: 'Name Here',
        role: 'Promotions Director',
        blurb: 'Placeholder copy for the person managing sponsor and industry relationships.',
    },
    {
        name: 'Name Here',
        role: 'Media Director',
        blurb: 'Placeholder copy for the person shaping social media, branding, and outreach.',
    },
    {
        name: 'Name Here',
        role: 'Industry Director',
        blurb: 'Placeholder copy for the person leading workshops, socials, and the wider events calendar.',
    },
    {
        name: 'Name Here',
        role: 'Events Director',
        blurb: 'Placeholder copy for the person leading workshops, socials, and the wider events calendar.',
    },
    {
        name: 'Name Here',
        role: 'Education Director',
        blurb: 'Placeholder copy for the person leading workshops, socials, and the wider events calendar.',
    },
        {
        name: 'Name Here',
        role: 'IT Director',
        blurb: 'Placeholder copy for the person leading workshops, socials, and the wider events calendar.',
    }
]

const SUBCOMMITTEE_TEAMS: SubcommitteeTeam[] = [
    {
        name: 'General',
        description: 'General officers can support culture, operations, and the wider member experience across the club.',
        members: [
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
        ],
    },
    {
        name: 'Events',
        description: 'The events team supports planning, logistics, and delivery for workshops, socials, and flagship programs.',
        members: [
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
        ],
    },
    {
        name: 'Media',
        description: 'This team supports content, social media, and design so members hear about what the club is building.',
        members: [
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
        ],
    },
    {
        name: 'Promotions',
        description: 'The promotions team supports outreach, partnerships, and sponsor-facing work for the society.',
        members: [
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
        ],
    },
    {
        name: 'IT',
        description: 'The IT team supports the website, systems, and technical infrastructure behind the club.',
        members: [
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
        ],
    },
    {
        name: 'Industry',
        description: 'Industry officers support outreach, partnerships, and sponsor-facing work for the society.',
        members: [
            {
                name: 'Name Here',
            },
            {
                name: 'Name Here',
            },
        ],
    },
]

function getInitials(role: string) {
    return role
        .split(/[\s/]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')
}

function LeadershipCard({ member }: { member: TeamMember }) {
    return (
        <article className="leadership-card" tabIndex={0}>
            <div className="leadership-card-photo" aria-hidden="true" />
            <div className="leadership-card-overlay">
                <p className="leadership-card-copy">{member.blurb}</p>
            </div>
            <div className="leadership-card-body">
                <p className="leadership-card-role">{member.role}</p>
                <h4 className="leadership-card-name">{member.name}</h4>
            </div>
        </article>
    )
}

function OfficerCard({ member }: { member: SubcommitteeMember }) {
    return (
        <article className="officer-card">
            <div className="officer-card-avatar">
                {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} loading="lazy" />
                ) : (
                    <span aria-hidden="true">{getInitials(member.name)}</span>
                )}
            </div>
            <div className="officer-card-body">
                <h4 className="officer-card-name">{member.name}</h4>
            </div>
        </article>
    )
}

export default function About() {
    return (
        <section className="about-page">
            <div className="about-page-inner">
                <header className="about-header">
                    <p className="section-kicker">About Us</p>
                    <h2 className="section-heading">Building a stronger <em>community</em> in tech</h2>
                    <p className="about-lead">
                        We are a student-led club committed to empowering women and gender-diverse students with practical technical skills and industry experience to help successful careers in tech. 
                    </p>
                </header>

                {/*
                <section className="about-mission">
                    <div className="about-mission-card">
                        <p className="about-mission-label">Our Mission</p>
                        <h3 className="about-mission-title">Mission statement placeholder</h3>
                        <p className="about-mission-copy">
                            
                        </p>
                    </div>

                    <div className="about-mission-sidecard">
                        <p className="about-mission-sidecard-label">Team Structure</p>
                    </div>
                </section>
                */}

                <section className="about-team-section">
                    <div className="about-team-header">
                        <p className="about-team-kicker">Leadership</p>
                        <h3 className="about-team-title">Executives</h3>
                    </div>
                    <div className="leadership-grid leadership-grid--executives">
                        {EXECUTIVES.map((member) => (
                            <LeadershipCard key={member.role} member={member} />
                        ))}
                    </div>
                </section>

                <section className="about-team-section">
                    <div className="about-team-header">
                        <p className="about-team-kicker">Leadership</p>
                        <h3 className="about-team-title">Directors</h3>
                    </div>
                    <div className="leadership-grid leadership-grid--directors">
                        {DIRECTORS.map((member) => (
                            <LeadershipCard key={member.role} member={member} />
                        ))}
                    </div>
                </section>

                <section className="about-team-section">
                    <div className="about-team-header">
                        <p className="about-team-kicker">Subcommittee</p>
                        <h3 className="about-team-title">Officers</h3>
                    </div>
                    <div className="subcommittee-groups">
                        {SUBCOMMITTEE_TEAMS.map((team) => (
                            <section className="subcommittee-group" key={team.name}>
                                <div className="subcommittee-group-header">
                                    <h4 className="subcommittee-group-title">{team.name}</h4>
                                    <p className="subcommittee-group-copy">{team.description}</p>
                                </div>
                                <div className="officer-grid">
                                    {team.members.map((member, index) => (
                                        <OfficerCard key={`${team.name}-${member.name}-${index}`} member={member} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}
