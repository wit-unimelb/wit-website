import PageHero from '@/components/ui/PageHero'
import './EventsPage.css'

const eventCategories = ['Workshops', 'Networking', 'Social Events', 'Competitions', 'Other']
const carouselCategories = [...eventCategories, ...eventCategories, ...eventCategories]

export default function EventsPage() {
    return (
        <article className="new-site-page events-page">
            <section className="events-hero" aria-label="Events introduction">
                <PageHero
                    className="events-hero__page-hero"
                    compact
                    title="EVENTS"
                    lead="Workshops, socials, and flagship moments that make the club feel alive."
                />

                <p className="events-hero__introduction ui-section-body">
                    Our calendar mixes technical learning, community-building, and industry connection. Across the semester we run events that help members build confidence, meet new people, and feel more at home in tech.
                </p>
            </section>

            <section className="events-category-carousel" aria-label="Event categories">
                <div className="events-category-carousel__viewport">
                    <ul className="events-category-carousel__track">
                        {carouselCategories.map((category, index) => (
                            <li
                                aria-hidden={index >= eventCategories.length ? 'true' : undefined}
                                className="events-category-carousel__item"
                                key={`${category}-${index}`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </article>
    )
}
