import { Routes, Route } from 'react-router-dom'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteHeader from '@/components/layout/SiteHeader'
import BlankPage from '@/pages/BlankPage'

export default function App() {
    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Routes>
                    <Route path="/" element={<BlankPage />} />
                    <Route path="/about" element={<BlankPage />} />
                    <Route path="/sponsors" element={<BlankPage />} />
                    <Route path="/events" element={<BlankPage />} />
                    <Route path="/merchandise" element={<BlankPage />} />
                    <Route path="/contact" element={<BlankPage />} />
                    <Route path="/experience" element={<BlankPage />} />
                    <Route path="*" element={<BlankPage />} />
                </Routes>
            </main>
            <div className="footer-data-grid" aria-hidden="true" />
            <SiteFooter />
        </div>
    )
}
