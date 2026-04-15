import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Pillars from '@/components/Pillars'
import Marquee from '@/components/Marquee'
import JoinCTA from '@/components/JoinCTA'
import Footer from '@/components/Footer'
import Sponsors from '@/components/Sponsors'
import Home from '@/pages/Home'
import SponsorsPage from '@/pages/SponsorsPage'
import EventsPage from '@/pages/EventsPage'

export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sponsors" element={<SponsorsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}