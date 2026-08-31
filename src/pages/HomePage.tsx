import CultureSection from '@/components/home/CultureSection'
import JoinCTA from '@/components/home/JoinCTA'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'

export default function HomePage() {
    return (
        <article className="new-site-page home-page">
            <Hero />
            <Marquee />
            <CultureSection />
            <JoinCTA />
        </article>
    )
}