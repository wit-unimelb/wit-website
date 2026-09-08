// Replace with real sponsor names when you connect Sanity

import { assetUrl } from '@/assets'
import './Marquee.css'

const sponsors = [
    { name: 'Airwallex', logo: 'airwallex.png' },
    { name: 'Macquarie', logo: 'macquarie.png' },
    { name: 'Jane Street', logo: 'janestreet.png' },
    { name: 'Fenwick', logo: 'fenwick.png' },
    { name: 'Atlassian', logo: 'atlassian.png' },
    { name: 'Australian Super', logo: 'australiansuper.png' },
    { name: 'Susquehanna', logo: 'susquehanna.png' },
    { name: 'CBA', logo: 'cba.png' },
    { name: 'Vanguard', logo: 'vanguard.png' },
    { name: 'Optiver', logo: 'optiver.png' },
    { name: 'Accenture', logo: 'accenture.png' },
    { name: 'PWC', logo: 'pwc.png' },
    { name: 'Seek', logo: 'seek.png' },
    { name: 'EY', logo: 'ey.png' },
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
                            src={assetUrl(sponsor.logo)}
                            alt={ `${sponsor.name}`}
                            />
                        ))}
                    </div>  

                    <div className="marquee-group">
                        {sponsors.map((sponsor, i) => (
                            <img 
                            key={`${sponsor.name}-${i}`}
                            src={assetUrl(sponsor.logo)}
                            alt={ `${sponsor.name}`}
                            />
                        ))}
                    </div>   
                </div>
            </div>
        </div>
    )
}
