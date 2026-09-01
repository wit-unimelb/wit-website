import './Events.css'
import twilightGif from '../../assets/twilightSparkle.gif'

export default function Events() {
    return (
        <section className="events-page">
            <div className="events-page-inner">
                {/* existing events content goes here */}
                <h2>Upcoming Events</h2>
                {/* ... */}
            </div>

            {/* Twilight Sparkle Running GIF */}
            <div className="running-pony-container">
                <img 
                    src={twilightGif} 
                    alt="Twilight Sparkle running" 
                    className="running-pony" 
                />
            </div>
        </section>
    )
}
