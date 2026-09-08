// Replace with real sponsor names when you connect Sanity

import './Marquee.css'

const sponsors = [
    { name: 'Airwallex', logo: '../sponsor-images/airwallex.png'},
    { name: 'Macquarie', logo: '../sponsor-images/macquarie.png'},
    { name: 'Jane Street', logo: '../sponsor-images/janestreet.png'},
    { name: 'Fenwick', logo: '../sponsor-images/fenwick.png'},
    { name: 'Atlassian', logo: '../sponsor-images/atlassian.png'},
    { name: 'Australian Super', logo: '../sponsor-images/australiansuper.png'},
    { name: 'Susquehanna', logo: '../sponsor-images/susquehanna.png'},
    { name: 'CBA', logo: '../sponsor-images/cba.png'},
    { name: 'Vanguard', logo: '../sponsor-images/vanguard.png'},
    { name: 'Optiver', logo: '../sponsor-images/optiver.png'},
    { name: 'Accenture', logo: '../sponsor-images/accenture.png'},
    { name: 'PWC', logo: '../sponsor-images/pwc.png'},
    { name: 'Seek', logo: '../sponsor-images/seek.png'},
    { name: 'EY', logo: '../sponsor-images/ey.png'},
]

export default function Marquee() {
    return (
       <div className="sponsors-row">
             <p className="sponsors-kicker">OUR SPONSORS</p>
            <div style={{ overflow: 'hidden', padding: '20px 40px' }}>
                <div className="marquee-track">
                    <div className="marquee-group">
                        {sponsors.map((sponsor, i) => (
                            <img 
                            key={`${sponsor.name}-${i}`}
                            src={sponsor.logo}
                            alt={ `${sponsor.name}`}
                            />
                        ))}
                    </div>  

                    <div className="marquee-group">
                        {sponsors.map((sponsor, i) => (
                            <img 
                            key={`${sponsor.name}-${i}`}
                            src={sponsor.logo}
                            alt={ `${sponsor.name}`}
                            />
                        ))}
                    </div>   
                </div>
            </div>
        </div>
    )
}