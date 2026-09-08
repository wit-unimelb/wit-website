import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'
import './SiteHeader.css'

const navigation = [
    { label: 'Events', to: '/events' },
    { label: 'Sponsors', to: '/sponsors' },
    { label: 'Merchandise', to: '/merchandise' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
]

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()
    const isHome = pathname === '/'

    const closeMenu = () => setIsOpen(false)

    return (
        <nav className={`site-header${isHome ? ' site-header--home' : ''}`} aria-label="Primary navigation">
            <Link className="site-header__brand" to="/" onClick={() => {
                closeMenu()
                window.location.href = '/'
                }} 
                aria-label="Women in Technology home"
                >
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
                <Button
                    href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/"
                    target="_blank"
                    rel="noreferrer"
                    tone="join"
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
