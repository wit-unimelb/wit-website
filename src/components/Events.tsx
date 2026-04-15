import { useState } from 'react'

type ClubEvent = {
    name: string
    date: string
    caption: string
    image: string
    humanitixUrl: string
}

type EventSectionTone = 'upcoming' | 'past'

// Store event photos in `src/assets/events/` and import them here when ready.
const EVENTS: ClubEvent[] = [
    {
        name: 'Networking Social',
        date: '2026-04-28',
        caption: 'Join us for an evening of connections, conversations, and career opportunities with students, alumni, and sponsors.',
        image: '',
        humanitixUrl: 'https://events.humanitix.com/networking-social-gjxcusfs?_gl=1*r9rjya*_gcl_aw*R0NMLjE3NzYxNTU3OTEuQ2owS0NRand5X2ZPQmhDNkFSSXNBSEtGQjc4Rk42ZDIwNFIwWnN5c1UwZ3NvWXBKV1Y3N01wdDEtTGdLR2xhRjItWlphQk9vUkNGRkZSY2FBc3dZRUFMd193Y0I.*_gcl_au*MTkwMzY4ODAyOC4xNzc2MTU1Nzkx*_ga*MTA5OTU3MzUwMi4xNzc2MTU1Nzkx*_ga_LHKW5FR9N6*czE3NzYyMjk1MTkkbzUkZzEkdDE3NzYyMjk1MjUkajU0JGwwJGgw',
    },
    {
        name: 'Susquehanna Brainteaser Battle',
        date: '2026-05-12',
        caption: 'Take on a fast-paced puzzle night with team challenges, prizes, and a chance to meet recruiters in a low-pressure setting.',
        image: '',
        humanitixUrl: '',
    },
    {
        name: 'WIT & Wisdom: HTML + CSS',
        date: '2026-03-31',
        caption: 'Want to build your own portfolio website but have no idea where to start? We got you. Join us for a beginner-friendly intro to HTML + CSS where you’ll learn the basics of portfolio website making in a fun and supportive space.',
        image: '',
        humanitixUrl: '',
    },
    {
        name: 'WIT & Wisdom: Git 101',
        date: '2026-03-17',
        caption: 'Because the first one was so good... we had to run it again. If you missed it the first time or want a refresher, join us for another WiT & Wisdom session where we will break down the basics of Git in a beginner friendly space. Come learn something new, ask questions, and connect with other women in tech.',
        image: '',
        humanitixUrl: '',
    },
    {
        name: 'Wit & Wisdom: How to Survive Uni ft. Speed Friending',
        date: '2026-03-05',
        caption: 'We’re talking study tips, balancing life, and all the things no one really explains in first year. AND you’ll get to meet new people through speed friending because we are not doing uni alone this year.',
        image: '',
        humanitixUrl: '',
    }
]

const EVENT_VIEW_COPY: Record<EventSectionTone, {
    badge: string
    title: string
    emptyState: string
}> = {
    upcoming: {
        badge: 'Coming up',
        title: 'Upcoming Events',
        emptyState: 'No upcoming events yet.',
    },
    past: {
        badge: 'From earlier this year',
        title: 'Past Events',
        emptyState: 'No past events yet.',
    },
}

const eventDateFormatter = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

function getEventTime(date: string) {
    return new Date(`${date}T00:00:00`).getTime()
}

function formatEventDate(date: string) {
    return eventDateFormatter.format(new Date(`${date}T00:00:00`))
}

export default function Events() {
    const [activeView, setActiveView] = useState<EventSectionTone>('upcoming')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTime = today.getTime()

    const upcomingEvents = EVENTS
        .filter((event) => getEventTime(event.date) >= todayTime)
        .sort((firstEvent, secondEvent) => getEventTime(firstEvent.date) - getEventTime(secondEvent.date))

    const pastEvents = EVENTS
        .filter((event) => getEventTime(event.date) < todayTime)
        .sort((firstEvent, secondEvent) => getEventTime(secondEvent.date) - getEventTime(firstEvent.date))

    const eventsByView: Record<EventSectionTone, ClubEvent[]> = {
        upcoming: upcomingEvents,
        past: pastEvents,
    }

    const visibleEvents = eventsByView[activeView]
    const activeViewCopy = EVENT_VIEW_COPY[activeView]

    return (
        <section className="events-page">
            <div className="events-page-inner">
                <div className="events-header">
                    <p className="section-kicker">Our Events</p>
                    <h2 className="section-heading">2026 <em>Events</em></h2>
                    <p className="events-lead">
                        Check out past and upcoming events!
                    </p>
                </div>

                <div className="events-toggle-wrap">
                    <div className="events-toggle" aria-label="Event view switcher">
                        {(['upcoming', 'past'] as EventSectionTone[]).map((view) => {
                            const isActive = activeView === view

                            return (
                                <button
                                    type="button"
                                    key={view}
                                    className={`events-toggle-button${isActive ? ' is-active' : ''}`}
                                    aria-pressed={isActive}
                                    onClick={() => setActiveView(view)}
                                >
                                    <span className="events-toggle-button-label">
                                        {view === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <section className="events-panel" key={activeView}>
                    <div className="events-panel-head">
                        <div>
                            <p className={`events-panel-label events-panel-label--${activeView}`}>
                                {activeViewCopy.badge}
                            </p>
                            <h3 className="events-panel-title">{activeViewCopy.title}</h3>
                        </div>
                    </div>

                    {visibleEvents.length > 0 ? (
                        <div className="events-grid">
                            {visibleEvents.map((event) => (
                                <article className={`club-event-card club-event-card--${activeView}`} key={`${event.name}-${event.date}`}>
                                    <div className="club-event-media">
                                        {event.image ? (
                                            <img src={event.image} alt={event.name} loading="lazy" />
                                        ) : (
                                            <div className="club-event-media-placeholder" aria-hidden="true">
                                                <span>{event.name}</span>
                                            </div>
                                        )}
                                        <span className={`event-status-badge event-status-badge--${activeView}`}>
                                            {activeView === 'upcoming' ? 'Upcoming' : 'Past Event'}
                                        </span>
                                    </div>

                                    <div className="club-event-body">
                                        <p className="club-event-date">{formatEventDate(event.date)}</p>
                                        <h4 className="club-event-title">{event.name}</h4>
                                        <p className="club-event-caption">{event.caption}</p>
                                        {activeView === 'upcoming' && event.humanitixUrl ? (
                                            <a
                                                className="btn-primary club-event-link"
                                                href={event.humanitixUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Register Now
                                            </a>
                                        ) : null}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="events-empty-state">
                            <p>{activeViewCopy.emptyState}</p>
                        </div>
                    )}
                </section>
            </div>
        </section>
    )
}
