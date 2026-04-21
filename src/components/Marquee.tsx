// Replace with real sponsor names when you connect Sanity
const sponsors = [
    'Airwallex', 'Macquarie', 'Jane Street', 'Fenwick',
    'Atlassian', 'Australian Super', 'Susquehanna', 'CBA',
    'Vanguard', 'Optiver', 'Accenture', 'PWC',
    'Seek', 'EY',
]

export default function Marquee() {
    return (
        <div className="sponsors-row">
            <p className="sponsors-kicker">2026 Sponsors &amp; Partners</p>
            <div style={{ overflow: 'hidden', padding: '0 40px' }}>
                <div className="marquee-track">
                    {[...sponsors, ...sponsors].map((name, i) => (
                        <span className="sponsor-pill" key={i}>{name}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}