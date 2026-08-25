'use client'

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()
    const isExperiencePage = pathname === '/experience'

    return (
        <nav className={isExperiencePage ? 'nav--experience' : undefined}>
            <a className="nav-logo" href="/"><span>WIT</span> @ UniMelb</a>
            <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
                <li><Link to="/experience">Experience WiT</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/sponsors">Sponsors</Link></li>
                {/* <li><Link to="/contact">Contact</Link></li> */}
                <li><a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/" className="cta"
                    target="_blank" rel="noopener noreferrer">Join Us</a></li>
            </ul>

            <div
                className="nav-hamburger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                <span /><span /><span />
            </div>
        </nav>
    )
}
