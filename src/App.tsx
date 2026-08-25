import { Routes, Route } from 'react-router-dom'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteHeader from '@/components/layout/SiteHeader'
import Home from '@/pages/Home'
import SponsorsPage from '@/pages/SponsorsPage'
import EventsPage from '@/pages/EventsPage'
import AboutPage from '@/pages/AboutPage'
import ExperiencePage from '@/pages/ExperiencePage'

export default function App() {
    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/sponsors" element={<SponsorsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/experience" element={<ExperiencePage />} />
                </Routes>
            </main>
            <SiteFooter />
        </div>
    )
}
