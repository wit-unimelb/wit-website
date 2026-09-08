import "./EventSection.css";
import humanitixData from '../../../data/humanitix.json';

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

type WitEvent = {
    name: string
    date: string
    caption: string
    image: string
    humanitixUrl: string
    location: string
    format: string
}

function getEventTime(date: string) {
    return new Date(date).getTime()
}

function getTodatyTime() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today.getTime();
}

function formatDate(date: string) {
    const eventDate = new Date(date)
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: '2-digit', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return eventDate.toLocaleDateString(undefined, options)
}

/* parse upcoming humanitix events */
const upcomingEvents: WitEvent[] = humanitixData.events
    .filter((event) => event.public !== false && event.published !== false && event.isArchived !== true)
    .map(event => ({
        name: event.name || 'Untitled Event',
        date: event.startDate || '',
        caption: event.sharingDescription || '',
        image: event.bannerImage?.url || "../../../public/og,.png", //TODO: replace with a proper placeholder image
        humanitixUrl: event.url || 'https://events.humanitix.com/host/women-in-technology',
        location: event.eventLocation.address || '',
        format: HUMANITIX_CATEGORY_MAP[event.classification.type] || 'Other',
    })).filter((event) => getEventTime(event.date) >= getTodatyTime())
      .sort((firstEvent, secondEvent) => getEventTime(firstEvent.date) - getEventTime(secondEvent.date));

export default function EventSection() {
  if (upcomingEvents.length === 0) {
    return (null);
  }
  let currEvent = upcomingEvents[0];
  const canNav = upcomingEvents.length > 1;

  return (
    <section className="event-section" aria-labelledby="event-heading">
      <div className="event-section__inner ds-container">
        <div className="event-section__intro">
          <h2
            className="ui-section-heading event-section__heading"
            id="event-heading"
          >
            Our Upcoming Events
          </h2>
        </div>

        <div className="event-section__stack">
          <div className="event-card" aria-label="Featured event card">
            {canNav && <button
              type="button"
              className="event-card__nav event-card__nav--prev"
              aria-label="Previous event"
            >
              ‹
            </button>}

            <div className="event-card__media">
              <img src={currEvent.image} alt={currEvent.name} />
            </div>

            {canNav && <button
              type="button"
              className="event-card__nav event-card__nav--next"
              aria-label="Next event"
            >
              ›
            </button>}

            <div className="event-card__spacer" aria-hidden="true" />

            <div className="event-card__content">
              <h3 className="event-card__title">
                {currEvent.name}
              </h3>
              <p className="event-card__details">
                {formatDate(currEvent.date)} <br />
                {currEvent.location}
              </p>
              <p className="event-card__text">
                {currEvent.caption}
              </p>
              <button type="button" className="event-card__button ds-button">
                Find out more
              </button>
            </div>

            <div className="event-card__spacer" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
