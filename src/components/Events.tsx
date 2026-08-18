import { useState } from 'react'
import humanitixData from '../../data/humanitix.json'
import witLogo from '../assets/events/WitLogo.png'

/* map humantix event types to internal event categories */
const HUMANITIX_CATEGORY_MAP: Record<string, 'Workshops' | 'Networking' | 'Social Events' | 'Competitions' | 'Other'> = {
  classTrainingOrWorkshop: 'Workshops',
  seminarOrTalk: 'Workshops',

  meetingOrNetworkingEvent: 'Networking',
  conference: 'Networking',
  convention: 'Networking',
  tradeShowConsumerShowOrExpo: 'Networking',

  partyOrSocialGathering: 'Social Events',
  festivalOrFair: 'Social Events',
  dinnerOrGala: 'Social Events',
  concertOrPerformance: 'Social Events',
  screening: 'Social Events',
  tour: 'Social Events',
  campTripOrRetreat: 'Social Events',
  attraction: 'Social Events',
  rally: 'Social Events',
  
  other: 'Other',

  gameOrCompetition: 'Competitions',
  tournament: 'Competitions',
  raceOrEnduranceEvent: 'Competitions',
}

type ClubEvent = {
    name: string
    date: string
    caption: string
    image: string
    humanitixUrl: string
    location: string
    format: string
}

/* parse humanitx events */
const humanitixEvents: ClubEvent[] = humanitixData.events
    .filter((event) => event.public !== false && event.published !== false && event.isArchived !== true)
    .map(event => ({
        name: event.name || 'Untitled Event',
        date: event.startDate || '',
        caption: event.sharingDescription || '',
        image: event.bannerImage?.url || witLogo,
        humanitixUrl: event.url || 'https://events.humanitix.com/host/women-in-technology',
        location: event.eventLocation.address || '',
        format: HUMANITIX_CATEGORY_MAP[event.classification.type] || 'Other',
    }));

type EventSectionTone = 'upcoming' | 'past'

const EVENT_TYPES = [
    {
        name: 'Workshops',
        description: 'Hands-on sessions that help members build practical confidence with tools, code, and technical problem solving.',
    },
    {
        name: 'Networking',
        description: 'Industry mixers and sponsor-led events designed to make meeting people in tech feel approachable and useful.',
    },
    {
        name: 'Social Events',
        description: 'Low-pressure community events that help members make friends, settle in, and feel part of something bigger.',
    },
    {
        name: 'Competitions',
        description: 'Challenge-based events that bring problem solving, teamwork, and a little bit of healthy pressure into the mix.',
    },
    {
        name: 'Other',
        description: 'Events that don’t fit neatly into the above categories, but are still worth attending.',
    },
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
    return new Date(date).getTime()
}

function formatEventDate(date: string) {
    return eventDateFormatter.format(new Date(date))
}

export default function Events() {
    const [activeView, setActiveView] = useState<EventSectionTone>('upcoming')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTime = today.getTime()

    const upcomingEvents = humanitixEvents
        .filter((event) => getEventTime(event.date) >= todayTime)
        .sort((firstEvent, secondEvent) => getEventTime(firstEvent.date) - getEventTime(secondEvent.date))

    const pastEvents = humanitixEvents
        .filter((event) => getEventTime(event.date) < todayTime)
        .sort((firstEvent, secondEvent) => getEventTime(secondEvent.date) - getEventTime(firstEvent.date))

    const eventsByView: Record<EventSectionTone, ClubEvent[]> = {
        upcoming: upcomingEvents,
        past: pastEvents,
    }

    const visibleEvents = eventsByView[activeView]
    const activeViewCopy = EVENT_VIEW_COPY[activeView]
    const heroEvent = upcomingEvents[0] ?? humanitixEvents[0]

    return (
        <section className="events-page">
            <div className="events-page-inner">
                <section className="events-hero">
                    <div className="events-hero-media-bleed">
                        <div className="events-hero-media-card">
                            {heroEvent.image ? (
                                <img src={heroEvent.image} alt={heroEvent.name} loading="lazy" />
                            ) : (
                                <div className="events-hero-media-placeholder" aria-hidden="true">
                                    <span>{heroEvent.name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="events-hero-content">
                        <div className="events-hero-intro">
                            <p className="events-hero-kicker">Events at WiT</p>
                            <h2 className="events-hero-title">
                                Workshops, socials, and flagship moments that make the club feel <em>alive</em>.
                            </h2>
                            <p className="events-hero-lead">
                                Our calendar mixes technical learning, community-building, and industry connection. Across the semester we run events that help members build confidence, meet new people, and feel more at home in tech.
                            </p>
                        </div>

                        <div className="events-hero-types">
                            <p className="events-hero-types-label">What We Run</p>
                            <div className="events-hero-types-list">
                                {EVENT_TYPES.map((type) => (
                                    <article className="events-hero-type-row" key={type.name}>
                                        <p className="events-hero-type-name">{type.name}</p>
                                        <p className="events-hero-type-copy">{type.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

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

                <section className="events-panel" id="events-collection" key={activeView}>
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
