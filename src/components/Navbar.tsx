'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav>
            <a className="nav-logo" href="/"><span>WIT</span> @ UniMelb</a>
            <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/sponsors">Sponsors</Link></li>
                <li><Link to="/contact">Contact</Link></li>
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