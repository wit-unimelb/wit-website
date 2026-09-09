import { useState } from 'react'
import twilightGif from '../../assets/twilightSparkle.gif'
import './Events.css'

export default function EventsPage() {
    const [isJumping, setIsJumping] = useState(false)

    const handleJump = () => {
        if (!isJumping) {
            setIsJumping(true)
            setTimeout(() => setIsJumping(false), 600) // Reset after animation finishes
        }
    }

    return (
        <section className="events-page">
            <div className="events-page-inner">
                <div className="events-header">
                    <p className="section-kicker">Mark Your Calendars</p>
                    <h2 className="section-heading">Upcoming <em>Events</em></h2>
                    <p className="events-lead">
                        Join us for workshops, tech talks, and networking nights.
                    </p>
                </div>
            </div>

            {/* Placed at the bottom of the page section, right above the footer */}
            <div className="running-pony-container">
                <img 
                    src={twilightGif} 
                    alt="Twilight Sparkle running" 
                    className={`running-pony ${isJumping ? 'jump' : ''}`}
                    onClick={handleJump}
                />
            </div>
        </section>
    )
}