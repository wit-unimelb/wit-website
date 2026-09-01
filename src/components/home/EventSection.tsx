import "./EventSection.css";

export default function EventSection() {
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
            <button
              type="button"
              className="event-card__nav event-card__nav--prev"
              aria-label="Previous event"
            >
              ‹
            </button>

            <div className="event-card__media">
              <img src="/og-culture.png" alt="Placeholder upcoming event" />
            </div>

            <button
              type="button"
              className="event-card__nav event-card__nav--next"
              aria-label="Next event"
            >
              ›
            </button>

            <div className="event-card__spacer" aria-hidden="true" />

            <div className="event-card__content">
              <h3 className="event-card__title">
                Networking Social: Connections over Canapes
              </h3>
              <p className="event-card__details">
                TUE, 28 APRIL 2026 <br />
                The Forum, Melbourne Connect
              </p>
              <p className="event-card__text">
                Join us for a vibrant evening of music, food, and community
                celebrations.
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
