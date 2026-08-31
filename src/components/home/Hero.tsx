'use client'

import { useEffect, useRef } from 'react'

import './Hero.css'

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    return (
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
                <p className="hero-sentence">
                    Connecting women through technology, creativity, community, and opportunity. 
                </p>

            </div>  

            <div className="stats-strip">
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
        </section >
    )
}