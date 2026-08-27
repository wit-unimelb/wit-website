import GlassPanel from '@/components/ui/GlassPanel'
import PageHero from '@/components/ui/PageHero'
import './MerchandisePage.css'

export default function MerchandisePage() {
    return (
        <article className="new-site-page merchandise-page">
            <PageHero
                eyebrow="WiT merchandise"
                title="Merchandise"
                lead="A small collection is on its way."
            />

            <GlassPanel className="merchandise-page__panel" strength="strong">
                <p>Coming soon</p>
                <span>Check back for Women in Technology merchandise.</span>
            </GlassPanel>
        </article>
    )
}
