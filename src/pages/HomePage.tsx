import CultureSection from '@/components/home/CultureSection'
import EventSection from '@/components/home/EventSection'
import JoinCTA from '@/components/home/JoinCTA'

export default function HomePage() {
    return (
        <article className="new-site-page home-page">
            <CultureSection />
            <EventSection />
            <JoinCTA />
        </article>
    )
}
