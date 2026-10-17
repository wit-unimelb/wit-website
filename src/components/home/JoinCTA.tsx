import Button from '@/components/ui/Button'
import { assetUrl } from '@/assets'

import './JoinCTA.css'

const membershipUrl = 'https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/'
const photos = [
    'join-cta:grid-01.webp',
    'join-cta:grid-02.webp',
    'join-cta:grid-03.webp',
    'join-cta:grid-04.webp',
].map(assetUrl)
const centerPhoto = assetUrl('join-cta:centre.webp')

export default function JoinCTA() {
    return (
        <section className="join-cta" aria-labelledby="join-cta-heading">
            <div className="join-cta__visual" aria-hidden="true">
                <div className="join-cta__collage">
                    {photos.map((source, index) => (
                        <div className={`join-cta__photo join-cta__photo--${index + 1}`} key={index}>
                            {source ? <img alt="" src={source} /> : <span />}
                        </div>
                    ))}
                </div>

                <div className="join-cta__center-photo">
                    {centerPhoto ? <img alt="" src={centerPhoto} /> : <span />}
                </div>
            </div>

            <div className="join-cta__content">
                <h2 className="ui-section-heading join-cta__heading" id="join-cta-heading">Ready to get involved?</h2>
                <p className="ui-section-copy">
                    Membership is free and open to everyone at the University of Melbourne —
                    regardless of degree or experience level.
                </p>
                <Button href={membershipUrl} rel="noreferrer" target="_blank" tone="gradient">
                    Become a member
                </Button>
            </div>
        </section>
    )
}
