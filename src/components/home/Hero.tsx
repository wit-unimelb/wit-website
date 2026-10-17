'use client'

import { useEffect, useRef, useState} from 'react'

import './Hero.css'

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    /* to reset the animation every 10 seconds */
    const [animationKey, setAnimationKey] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, 10000);
        
        return () => clearInterval(timer);
    }, []);

    /* show stats on scroll */
   useEffect(() => {
        const timer = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2
            }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
        <section className="hero">
            <canvas ref={canvasRef} className="hero-canvas" />
            <div className="hero-vignette" />

            <div className="hero-content">
                <div className="hero-eyebrow">
                    Est. 2013</div>
                <h1 className="hero-title">
                    Women In Tech
                </h1>
                <p className="hero-sub">
                    <i>The University of Melbourne</i>
                </p>
                <svg key={animationKey} viewBox="0 0 800 150" 
                    width="100%" height="auto" style={{overflow: "visible"}}>
                    <line 
                        x1="25" 
                        y1="100" 
                        x2="180" 
                        y2="200"
                        className="line1"
                    />
                    <circle 
                        cx = "25"
                        cy = "100"
                        r="10"
                        className="dot1"
                    />
                    <line 
                        x1="180" 
                        y1="200" 
                        x2="335" 
                        y2="100"
                        className="line2"
                    />
                    <circle 
                        cx = "180"
                        cy = "200"
                        r="10"
                        className="dot2"
                    />
                    <line 
                        x1="25" 
                        y1="100" 
                        x2="335" 
                        y2="100"
                        className="line3"
                    />
                    <circle 
                        cx = "335"
                        cy = "100"
                        r="10"
                        className="dot3"
                    />
                    <line 
                        x1="335" 
                        y1="100" 
                        x2="490" 
                        y2="200"
                        className="line4"
                    />
                    <circle 
                        cx = "490"
                        cy = "200"
                        r="10"
                        className="dot4"
                    />
                    <line 
                        x1="490" 
                        y1="200" 
                        x2="645" 
                        y2="100"
                        className="line5"
                    />
                    <circle 
                        cx = "645"
                        cy = "100"
                        r="10"
                        className="dot5"
                    />
                    <line 
                        x1="645" 
                        y1="100" 
                        x2="800" 
                        y2="200"
                        className="line6"
                    />
                    <circle 
                        cx = "800"
                        cy = "200"
                        r="10"
                        className="dot6"
                    />
                </svg>
                <p className="hero-sentence">
                    Connecting women through technology, creativity, community, and opportunity. 
                </p>
            </div>
            </section>
            <div ref={statsRef} className="stats-strip">
                    <div className="stat">
                        <div className="stat-num">
                            <div className="count" style={{ "--target": 500 } as React.CSSProperties}></div>
                        </div>    
                        <div className="stat-label">Members</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">
                            <div className="count" style={{ "--target": 30 } as React.CSSProperties}></div>
                        </div>
                        <div className="stat-label">Events / year</div> 
                    </div>
                    <div className="stat">
                        <div className="stat-num">
                            <div className="count" style={{ "--target": 20 } as React.CSSProperties}></div>
                        </div>
                        <div className="stat-label">Industry Partners</div>
                    </div>
            </div>
    </>                    
    )
}