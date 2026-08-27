import { Routes, Route } from 'react-router-dom'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteHeader from '@/components/layout/SiteHeader'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import EventsPage from '@/pages/EventsPage'
import HomePage from '@/pages/HomePage'
import MerchandisePage from '@/pages/MerchandisePage'
import SponsorsPage from '@/pages/SponsorsPage'

export default function App() {
    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/sponsors" element={<SponsorsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/merchandise" element={<MerchandisePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </main>
            <div className="footer-data-grid" aria-hidden="true" />
            <SiteFooter />
        </div>
    )
}
