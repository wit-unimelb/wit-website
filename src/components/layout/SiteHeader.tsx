import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'
import './SiteHeader.css'

const navigation = [
    { label: 'Experience', to: '/experience' },
    { label: 'Events', to: '/events' },
    { label: 'Sponsors', to: '/sponsors' },
    { label: 'About Us', to: '/about' },
]

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()
    const isHome = pathname === '/'
    const isExperience = pathname === '/experience'

    const closeMenu = () => setIsOpen(false)

    return (
        <nav className={`site-header${isHome ? ' site-header--home' : ''}${isExperience ? ' site-header--experience' : ''}`} aria-label="Primary navigation">
            <Link className="site-header__brand" to="/" onClick={closeMenu} aria-label="Women in Technology home">
                WIT
            </Link>

            <div id="site-navigation" className={`site-header__links${isOpen ? ' site-header__links--open' : ''}`}>
                {navigation.map((item) => (
                    <Link
                        aria-current={pathname === item.to ? 'page' : undefined}
                        className="site-header__link"
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                    >
                        {item.label}
                    </Link>
                ))}
                <a className="site-header__link" href="mailto:info@witunimelb.org" onClick={closeMenu}>Contact</a>
                <Button
                    href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                >
                    Join Us
                </Button>
            </div>

            <button
                className="site-header__menu-button"
                type="button"
                aria-expanded={isOpen}
                aria-controls="site-navigation"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsOpen((open) => !open)}
            >
                <span /><span /><span />
            </button>
        </nav>
    )
}
