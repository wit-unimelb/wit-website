import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import GlassPanel from '@/components/ui/GlassPanel'
import humanitixData from '../../../data/humanitix.json'

const MELBOURNE_TIME_ZONE = 'Australia/Melbourne'
const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const humanitixCategoryMap: Record<string, string> = {
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
    gameOrCompetition: 'Competitions',
    tournament: 'Competitions',
    raceOrEnduranceEvent: 'Competitions',
}

type RawHumanitixEvent = {
    _id?: string
    name?: string
    startDate?: string
    endDate?: string
    sharingDescription?: string
    description?: string
    url?: string
    public?: boolean
    published?: boolean
    isArchived?: boolean
    classification?: { type?: string }
    bannerImage?: { url?: string }
    eventLocation?: { venueName?: string; address?: string }
}

type HumanitixSnapshot = {
    events?: RawHumanitixEvent[]
}

type DateParts = {
    year: number
    month: number
    day: number
}

type CalendarMonth = Pick<DateParts, 'year' | 'month'>

type ClubEvent = {
    id: string
    title: string
    startDate: string
    endDate?: string
    dateKey: string
    caption: string
    image?: string
    humanitixUrl?: string
    location?: string
    category: string
}

const melbourneDatePartsFormatter = new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: '2-digit',
    timeZone: MELBOURNE_TIME_ZONE,
    year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-AU', {
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
})

const eventDateFormatter = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    timeZone: MELBOURNE_TIME_ZONE,
    weekday: 'short',
    year: 'numeric',
})

const eventTimeFormatter = new Intl.DateTimeFormat('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: MELBOURNE_TIME_ZONE,
    timeZoneName: 'short',
})

function getMelbourneDateParts(value: Date | string): DateParts | null {
    const date = typeof value === 'string' ? new Date(value) : value

    if (Number.isNaN(date.getTime())) return null

    const parts = melbourneDatePartsFormatter.formatToParts(date)
    const findPart = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value)

    return {
        year: findPart('year'),
        month: findPart('month'),
        day: findPart('day'),
    }
}

function toDateKey({ year, month, day }: DateParts) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function toMonth({ year, month }: DateParts): CalendarMonth {
    return { year, month }
}

function monthDate({ year, month }: CalendarMonth) {
    return new Date(Date.UTC(year, month - 1, 1))
}

function getMonthDays(month: CalendarMonth) {
    return new Date(Date.UTC(month.year, month.month, 0)).getUTCDate()
}

function getMonthStartOffset(month: CalendarMonth) {
    const sundayBasedDay = monthDate(month).getUTCDay()
    return (sundayBasedDay + 6) % 7
}

function shiftMonth(month: CalendarMonth, amount: number): CalendarMonth {
    const shifted = new Date(Date.UTC(month.year, month.month - 1 + amount, 1))
    return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() + 1 }
}

function calendarDateTimestamp(dateKey: string) {
    const [year, month, day] = dateKey.split('-').map(Number)
    return Date.UTC(year, month - 1, day)
}

function plainText(value = '') {
    return value
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim()
}

function formatEventDateTime(event: ClubEvent) {
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : null
    const date = eventDateFormatter.format(start)
    const time = end && !Number.isNaN(end.getTime())
        ? `${eventTimeFormatter.format(start)} – ${eventTimeFormatter.format(end)}`
        : eventTimeFormatter.format(start)

    return `${date} · ${time}`
}

function formatCalendarDate(dateKey: string) {
    const [year, month, day] = dateKey.split('-').map(Number)
    return new Intl.DateTimeFormat('en-AU', {
        day: 'numeric',
        month: 'long',
        timeZone: 'UTC',
        weekday: 'long',
        year: 'numeric',
    }).format(new Date(Date.UTC(year, month - 1, day)))
}

const events: ClubEvent[] = ((humanitixData as HumanitixSnapshot).events ?? [])
    .filter((event) => event.public !== false && event.published !== false && event.isArchived !== true && Boolean(event.startDate))
    .flatMap((event) => {
        const dateParts = event.startDate ? getMelbourneDateParts(event.startDate) : null
        if (!event.startDate || !dateParts) return []

        return [{
            caption: plainText(event.sharingDescription || event.description),
            category: humanitixCategoryMap[event.classification?.type ?? ''] ?? 'Other',
            dateKey: toDateKey(dateParts),
            endDate: event.endDate,
            humanitixUrl: event.url,
            id: event._id || `${event.name ?? 'untitled'}-${event.startDate}`,
            image: event.bannerImage?.url,
            location: event.eventLocation?.venueName || event.eventLocation?.address,
            startDate: event.startDate,
            title: event.name || 'Untitled event',
        }]
    })
    .sort((first, second) => new Date(first.startDate).getTime() - new Date(second.startDate).getTime())

export default function EventsExplorer() {
    const todayDateKey = toDateKey(getMelbourneDateParts(new Date()) ?? { year: 2026, month: 1, day: 1 })
    const nextUpcomingEvent = events.find((event) => event.dateKey >= todayDateKey)
    const mostRecentPastEvent = [...events].reverse().find((event) => event.dateKey < todayDateKey)
    const initialEvent = nextUpcomingEvent ?? mostRecentPastEvent ?? events[0]
    const [activeEventId, setActiveEventId] = useState(initialEvent?.id)
    const [highlightedEventId, setHighlightedEventId] = useState<string>()
    const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(() => toMonth(getMelbourneDateParts(initialEvent?.startDate ?? new Date()) ?? { year: 2026, month: 1, day: 1 }))
    const [announcement, setAnnouncement] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const eventPanelRef = useRef<HTMLDivElement>(null)
    const eventCardRefs = useRef<Record<string, HTMLElement | null>>({})
    const highlightTimeoutRef = useRef<number>()

    const eventsByDate = useMemo(() => {
        const next = new Map<string, ClubEvent[]>()
        events.forEach((event) => next.set(event.dateKey, [...(next.get(event.dateKey) ?? []), event]))
        return next
    }, [])

    const normalisedSearchQuery = searchQuery.trim().toLocaleLowerCase()
    const matchingEvents = useMemo(() => {
        if (!normalisedSearchQuery) return events

        return events.filter((event) => [
            event.title,
            event.category,
            event.caption,
            event.location,
            formatEventDateTime(event),
        ].filter(Boolean).join(' ').toLocaleLowerCase().includes(normalisedSearchQuery))
    }, [normalisedSearchQuery])
    const matchingEventIds = useMemo(() => new Set(matchingEvents.map((event) => event.id)), [matchingEvents])

    const activeEvent = events.find((event) => event.id === activeEventId) ?? initialEvent
    const activeIsUpcoming = activeEvent ? activeEvent.dateKey >= todayDateKey : true
    const days = Array.from({ length: getMonthDays(visibleMonth) }, (_, index) => index + 1)
    const leadingBlanks = Array.from({ length: getMonthStartOffset(visibleMonth) }, (_, index) => index)

    function setActiveEvent(event: ClubEvent, shouldSetMonth = false) {
        setActiveEventId(event.id)
        if (shouldSetMonth) setVisibleMonth(toMonth(getMelbourneDateParts(event.startDate) ?? visibleMonth))
    }

    function scrollToEvent(event: ClubEvent, behaviour: ScrollBehavior = 'smooth') {
        const scrollToCard = () => {
            const card = eventCardRefs.current[event.id]
            const panel = eventPanelRef.current
            if (!card || !panel) return

            const usesPageScroll = window.matchMedia('(max-width: 48rem)').matches
            if (usesPageScroll) {
                card.scrollIntoView({ behavior: behaviour, block: 'center' })
            } else {
                panel.scrollTo({ behavior: behaviour, top: Math.max(0, card.offsetTop - panel.offsetTop - 12) })
            }

            setActiveEvent(event, true)
            setHighlightedEventId(event.id)
            setAnnouncement(`Showing ${event.title}.`)

            window.clearTimeout(highlightTimeoutRef.current)
            highlightTimeoutRef.current = window.setTimeout(() => setHighlightedEventId(undefined), 1400)
        }

        if (!matchingEventIds.has(event.id)) {
            setSearchQuery('')
            window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToCard))
            return
        }

        scrollToCard()
    }

    function findNearestEvent(dateKey: string) {
        const selectedTimestamp = calendarDateTimestamp(dateKey)

        return events.reduce<ClubEvent | undefined>((closest, event) => {
            if (!closest) return event

            const eventDistance = Math.abs(calendarDateTimestamp(event.dateKey) - selectedTimestamp)
            const closestDistance = Math.abs(calendarDateTimestamp(closest.dateKey) - selectedTimestamp)
            const eventIsAfterSelection = event.dateKey >= dateKey
            const closestIsAfterSelection = closest.dateKey >= dateKey

            if (eventDistance < closestDistance || (eventDistance === closestDistance && eventIsAfterSelection && !closestIsAfterSelection)) {
                return event
            }

            return closest
        }, undefined)
    }

    function handleCalendarDay(dateKey: string) {
        const event = eventsByDate.get(dateKey)?.[0] ?? findNearestEvent(dateKey)
        if (event) scrollToEvent(event)
    }

    function updateActiveEventFromScroll() {
        if (!events.length) return

        const usesPageScroll = window.matchMedia('(max-width: 48rem)').matches
        const eventAtReadingLine = events.reduce<ClubEvent | undefined>((closest, event) => {
            const card = eventCardRefs.current[event.id]
            if (!card) return closest

            const offset = usesPageScroll
                ? Math.abs(card.getBoundingClientRect().top - window.innerHeight * 0.34)
                : Math.abs(card.offsetTop - (eventPanelRef.current?.scrollTop ?? 0) - (eventPanelRef.current?.clientHeight ?? 0) * 0.26)

            if (!closest) return event
            const closestCard = eventCardRefs.current[closest.id]
            if (!closestCard) return event
            const closestOffset = usesPageScroll
                ? Math.abs(closestCard.getBoundingClientRect().top - window.innerHeight * 0.34)
                : Math.abs(closestCard.offsetTop - (eventPanelRef.current?.scrollTop ?? 0) - (eventPanelRef.current?.clientHeight ?? 0) * 0.26)

            return offset < closestOffset ? event : closest
        }, undefined)

        if (eventAtReadingLine && eventAtReadingLine.id !== activeEventId) setActiveEvent(eventAtReadingLine)
    }

    useLayoutEffect(() => {
        if (!initialEvent) return

        scrollToEvent(initialEvent, 'auto')
    }, [])

    useEffect(() => {
        const panel = eventPanelRef.current
        if (!panel) return

        panel.addEventListener('scroll', updateActiveEventFromScroll, { passive: true })
        window.addEventListener('scroll', updateActiveEventFromScroll, { passive: true })
        window.addEventListener('resize', updateActiveEventFromScroll)

        return () => {
            panel.removeEventListener('scroll', updateActiveEventFromScroll)
            window.removeEventListener('scroll', updateActiveEventFromScroll)
            window.removeEventListener('resize', updateActiveEventFromScroll)
        }
    }, [activeEventId])

    if (!events.length) {
        return (
            <section className="events-explorer events-explorer--empty" aria-labelledby="events-explorer-title">
                <h2 className="ui-section-heading" id="events-explorer-title">Our events</h2>
                <p className="ui-section-copy">There are no published events to show just yet.</p>
            </section>
        )
    }

    return (
        <section className="events-explorer" aria-label="Events timeline">
            <div className="events-explorer__layout">
                <aside className="events-explorer__navigation" aria-label="Event timeline navigation">
                    <div className={`events-explorer__anchor-controls${activeIsUpcoming ? ' is-upcoming' : ' is-past'}`} aria-label="Event timeline position">
                        <span aria-hidden="true" className="events-explorer__anchor-indicator" />
                        <button
                            aria-pressed={activeIsUpcoming}
                            className={`events-explorer__anchor${activeIsUpcoming ? ' is-active' : ''}`}
                            disabled={!nextUpcomingEvent}
                            onClick={() => nextUpcomingEvent && scrollToEvent(nextUpcomingEvent)}
                            type="button"
                        >
                            Upcoming
                        </button>
                        <button
                            aria-pressed={!activeIsUpcoming}
                            className={`events-explorer__anchor${!activeIsUpcoming ? ' is-active' : ''}`}
                            disabled={!mostRecentPastEvent}
                            onClick={() => mostRecentPastEvent && scrollToEvent(mostRecentPastEvent)}
                            type="button"
                        >
                            Past
                        </button>
                    </div>

                    <GlassPanel className="events-calendar" strength="strong">
                        <div className="events-calendar__header">
                            <button aria-label={`Show ${monthFormatter.format(monthDate(shiftMonth(visibleMonth, -1)))}`} className="events-calendar__month-button" onClick={() => setVisibleMonth((month) => shiftMonth(month, -1))} type="button">‹</button>
                            <h3 className="ui-section-heading events-calendar__month-title">{monthFormatter.format(monthDate(visibleMonth))}</h3>
                            <button aria-label={`Show ${monthFormatter.format(monthDate(shiftMonth(visibleMonth, 1)))}`} className="events-calendar__month-button" onClick={() => setVisibleMonth((month) => shiftMonth(month, 1))} type="button">›</button>
                        </div>

                        <div className="events-calendar__weekdays" aria-hidden="true">
                            {weekdayLabels.map((day) => <span key={day}>{day}</span>)}
                        </div>

                        <div className="events-calendar__days">
                            {leadingBlanks.map((blank) => <span aria-hidden="true" className="events-calendar__blank" key={`blank-${blank}`} />)}
                            {days.map((day) => {
                                const dateKey = toDateKey({ ...visibleMonth, day })
                                const eventCount = eventsByDate.get(dateKey)?.length ?? 0
                                const isActive = activeEvent?.dateKey === dateKey
                                const isToday = todayDateKey === dateKey
                                const eventLabel = eventCount ? `, ${eventCount} event${eventCount === 1 ? '' : 's'}` : ', no events'

                                return (
                                    <button
                                        aria-pressed={isActive}
                                        aria-label={`${formatCalendarDate(dateKey)}${eventLabel}`}
                                        className={`events-calendar__day${eventCount ? ' has-event' : ''}${isActive ? ' is-active' : ''}${isToday ? ' is-today' : ''}`}
                                        key={dateKey}
                                        onClick={() => handleCalendarDay(dateKey)}
                                        type="button"
                                    >
                                        <span>{day}</span>
                                        {eventCount ? <i aria-hidden="true" /> : null}
                                    </button>
                                )
                            })}
                        </div>
                    </GlassPanel>
                </aside>

                <GlassPanel className="events-timeline" strength="strong">
                    <form className="events-search" onSubmit={(event) => event.preventDefault()} role="search">
                        <label className="events-search__label" htmlFor="events-search-input">Search events</label>
                        <span aria-hidden="true" className="events-search__icon" />
                        <input
                            id="events-search-input"
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search events"
                            type="search"
                            value={searchQuery}
                        />
                        {searchQuery ? <button aria-label="Clear event search" className="events-search__clear" onClick={() => setSearchQuery('')} type="button">Clear</button> : null}
                    </form>
                    <div className="events-timeline__scroll" ref={eventPanelRef} tabIndex={0} aria-label={normalisedSearchQuery ? `${matchingEvents.length} matching events` : 'All events'}>
                        <div className="events-timeline__cards">
                            {matchingEvents.map((event) => {
                                const isUpcoming = event.dateKey >= todayDateKey
                                const isHighlighted = event.id === highlightedEventId

                                return (
                                    <article
                                        className={`events-event-card${isUpcoming ? ' events-event-card--upcoming' : ' events-event-card--past'}${isHighlighted ? ' is-highlighted' : ''}`}
                                        id={`event-${event.id}`}
                                        key={event.id}
                                        ref={(node) => { eventCardRefs.current[event.id] = node }}
                                    >
                                        <div className="events-event-card__media">
                                            {event.image ? <img alt="" loading="lazy" src={event.image} /> : <div aria-hidden="true" className="events-event-card__placeholder">WIT</div>}
                                        </div>
                                        <div className="events-event-card__body">
                                            <h3>{event.title}</h3>
                                            <div className="events-event-card__meta">
                                                <p>{event.category}</p>
                                                <span>{isUpcoming ? 'Upcoming' : 'Past'}</span>
                                            </div>
                                            <p className="events-event-card__date">{formatEventDateTime(event)}</p>
                                            {event.location ? <p className="events-event-card__location">{event.location}</p> : null}
                                            {event.caption ? <p className="events-event-card__caption">{event.caption}</p> : null}
                                            {isUpcoming && event.humanitixUrl ? (
                                                <Button href={event.humanitixUrl} rel="noreferrer" target="_blank" tone="gradient">Get Tickets</Button>
                                            ) : null}
                                        </div>
                                    </article>
                                )
                            })}
                            {!matchingEvents.length ? <p className="events-timeline__empty">No events match “{searchQuery.trim()}”.</p> : null}
                        </div>
                    </div>
                </GlassPanel>
            </div>
            <p aria-live="polite" className="events-explorer__announcement">{announcement}</p>
        </section>
    )
}
