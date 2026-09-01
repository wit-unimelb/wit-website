import './SiteFooter.css'

const links = [
    { label: 'Instagram', href: 'https://www.instagram.com/witunimelb/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/women-in-tech-wit-unimelb/', icon: 'linkedin' },
    { label: 'Facebook', href: 'https://www.facebook.com/witunimelb', icon: 'facebook' },
    { label: 'Email', href: 'mailto:women.in.ict.unimelb@gmail.org', icon: 'gmail' },
]

export default function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner ds-container">
                <p className="site-footer__brand">Women In Tech</p>
                <p>© 2026 Women in Technology, University of Melbourne</p>
                <ul className="site-footer__links ui-social-links">
                    {links.map((link) => (
                        <li key={link.label}>
                            <a aria-label={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                                <img src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${link.icon}.svg`} alt="" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
