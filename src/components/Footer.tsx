const links = [
    { label: 'Instagram', href: 'https://www.instagram.com/witunimelb/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/women-in-tech-wit-unimelb/' },
    { label: 'Facebook', href: 'https://www.facebook.com/witunimelb' },
    { label: 'Contact', href: 'mailto:info@witunimelb.org' },
]

export default function Footer() {
    return (
        <footer>
            <div className="footer-logo"><span>WIT</span> @ UniMelb</div>
            <p>© 2026 Women in Technology, University of Melbourne</p>
            <ul className="footer-links">
                {links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
            </ul>
        </footer>
    )
}