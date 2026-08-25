import './SiteFooter.css'

const links = [
    { label: 'Instagram', href: 'https://www.instagram.com/witunimelb/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/women-in-tech-wit-unimelb/' },
    { label: 'Facebook', href: 'https://www.facebook.com/witunimelb' },
    { label: 'Email', href: 'mailto:info@witunimelb.org' },
]

export default function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner ds-container">
                <p className="site-footer__brand">Women In Tech</p>
                <p>© 2026 Women in Technology, University of Melbourne</p>
                <ul className="site-footer__links">
                    {links.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
