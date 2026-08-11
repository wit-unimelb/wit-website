'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
        camera.position.z = 5.5

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)

        // ── LOGO GROUP ───────────────────────────────────────────
        const logoGroup = new THREE.Group()
        scene.add(logoGroup)

        const COL_CRIMSON = new THREE.Color('#c0185a')
        const COL_TEAL = new THREE.Color('#0abfbc')
        const COL_GREY = new THREE.Color('#c8c0d0')

        // [x, y, z, radius, color]
        const NODE_DEF: [number, number, number, number, THREE.Color][] = [
            [-0.42, 0.08, 0.0, 0.30, COL_CRIMSON],
            [-1.37, 0.68, 0.1, 0.20, COL_CRIMSON],
            [-1.42, -0.62, 0.05, 0.15, COL_CRIMSON],
            [0.43, -0.07, -0.05, 0.20, COL_TEAL],
            [1.28, 0.28, 0.0, 0.14, COL_GREY],
        ]

        const EDGE_DEF: [number, number][] = [
            [0, 1], [0, 2], [1, 2], [0, 3], [3, 4],
        ]

        const nodeMeshes: THREE.Mesh[] = []
        NODE_DEF.forEach(([x, y, z, r, col]) => {
            const mat = new THREE.MeshPhongMaterial({
                color: col, emissive: col, emissiveIntensity: 0.2,
                shininess: 90, transparent: true, opacity: 0,
            })
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 40, 40), mat)
            mesh.position.set(x, y, z)
            logoGroup.add(mesh)
            nodeMeshes.push(mesh)
        })

        const edgeLines: THREE.Line[] = []
        EDGE_DEF.forEach(([a, b]) => {
            const pts = [
                new THREE.Vector3(...NODE_DEF[a].slice(0, 3) as [number, number, number]),
                new THREE.Vector3(...NODE_DEF[b].slice(0, 3) as [number, number, number]),
            ]
            const geo = new THREE.BufferGeometry().setFromPoints(pts)
            const mat = new THREE.LineBasicMaterial({
                color: new THREE.Color('#f0a8c0'), transparent: true, opacity: 0,
            })
            const line = new THREE.Line(geo, mat)
            logoGroup.add(line)
            edgeLines.push(line)
        })

        logoGroup.position.set(-0.1, 1.1, 0)

        // ── PARTICLE SPHERE ──────────────────────────────────────
        const COUNT = 2200
        const ptPos = new Float32Array(COUNT * 3)
        const ptSizes = new Float32Array(COUNT)
        const ptAlpha = new Float32Array(COUNT)
        for (let i = 0; i < COUNT; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT)
            const theta = Math.PI * (1 + Math.sqrt(5)) * i
            const r = 2.2
            ptPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            ptPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            ptPos[i * 3 + 2] = r * Math.cos(phi)
            ptSizes[i] = 0.005 + Math.random() * 0.012
            ptAlpha[i] = 0.2 + Math.random() * 0.45
        }
        const ptGeo = new THREE.BufferGeometry()
        ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3))
        ptGeo.setAttribute('aSize', new THREE.BufferAttribute(ptSizes, 1))
        ptGeo.setAttribute('aAlpha', new THREE.BufferAttribute(ptAlpha, 1))

        const ptMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: { uTime: { value: 0 } },
            vertexShader: `
        attribute float aSize; attribute float aAlpha;
        uniform float uTime; varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec3 p = position * (1.0 + 0.012*sin(uTime*0.7+position.x*2.0+position.y*1.5));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * (280.0 / -mv.z);
          gl_Position  = projectionMatrix * mv;
        }`,
            fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float s = 1.0 - smoothstep(0.15, 0.5, d);
          gl_FragColor = vec4(0.941, 0.659, 0.753, s * vAlpha * 0.65);
        }`,
        })

        const ptSphere = new THREE.Points(ptGeo, ptMat)
        scene.add(ptSphere)

        // ── LIGHTS ───────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.7))
        const dirLight = new THREE.DirectionalLight(0xfff0f5, 1.4)
        dirLight.position.set(2, 4, 5)
        scene.add(dirLight)
        const rimLight = new THREE.PointLight(COL_TEAL, 1.0, 10)
        rimLight.position.set(-3, 2, 2)
        scene.add(rimLight)

        // ── RESIZE ───────────────────────────────────────────────
        function resize() {
            if (!canvas) return
            const w = window.innerWidth
            const h = window.innerHeight
            renderer.setSize(w, h)
            camera.aspect = w / h
            camera.updateProjectionMatrix()
        }
        resize()
        window.addEventListener('resize', resize)

        // ── DRAG TO ROTATE ───────────────────────────────────────
        let isDragging = false
        let isHovering = false
        let prevX = 0, prevY = 0
        let rotVelX = 0, rotVelY = 0

        const onEnter = () => { isHovering = true; canvas.style.cursor = 'grab' }
        const onLeave = () => { isHovering = false; canvas.style.cursor = 'default' }
        const onDown = (e: MouseEvent) => {
            isDragging = true
            prevX = e.clientX; prevY = e.clientY
            rotVelX = 0; rotVelY = 0
            canvas.style.cursor = 'grabbing'
        }
        const onMove = (e: MouseEvent) => {
            if (!isDragging) return
            rotVelY = (e.clientX - prevX) * 0.008
            rotVelX = (e.clientY - prevY) * 0.008
            logoGroup.rotation.y += rotVelY
            logoGroup.rotation.x += rotVelX
            prevX = e.clientX; prevY = e.clientY
        }
        const onUp = () => {
            isDragging = false
            canvas.style.cursor = isHovering ? 'grab' : 'default'
        }

        const onTouchStart = (e: TouchEvent) => {
            isDragging = true
            prevX = e.touches[0].clientX; prevY = e.touches[0].clientY
            rotVelX = 0; rotVelY = 0
        }
        const onTouchMove = (e: TouchEvent) => {
            if (!isDragging) return
            rotVelY = (e.touches[0].clientX - prevX) * 0.008
            rotVelX = (e.touches[0].clientY - prevY) * 0.008
            logoGroup.rotation.y += rotVelY
            logoGroup.rotation.x += rotVelX
            prevX = e.touches[0].clientX; prevY = e.touches[0].clientY
        }
        const onTouchEnd = () => { isDragging = false }

        canvas.addEventListener('mouseenter', onEnter)
        canvas.addEventListener('mouseleave', onLeave)
        canvas.addEventListener('mousedown', onDown)
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        canvas.addEventListener('touchstart', onTouchStart, { passive: true })
        window.addEventListener('touchmove', onTouchMove, { passive: true })
        window.addEventListener('touchend', onTouchEnd)

        // ── ANIMATE ──────────────────────────────────────────────
        const clock = new THREE.Timer()
        let fadeT = 0
        let rafId: number

        function animate() {
            rafId = requestAnimationFrame(animate)
            clock.update()
            const t = clock.getElapsed()
            fadeT = Math.min(fadeT + 0.007, 1.0)
            const fa = Math.pow(fadeT, 1.8)

            ptMat.uniforms.uTime.value = t

            nodeMeshes.forEach(m => {
                ; (m.material as THREE.MeshPhongMaterial).opacity = fa
            })
            edgeLines.forEach(l => {
                ; (l.material as THREE.LineBasicMaterial).opacity = fa * 0.8
            })

            if (!isDragging) {
                rotVelX *= 0.90
                rotVelY *= 0.90
                logoGroup.rotation.x += rotVelX
                logoGroup.rotation.y += rotVelY
                if (!isHovering && Math.abs(rotVelY) < 0.001) {
                    logoGroup.rotation.y += 0.003
                }
            }

            logoGroup.position.y = 1.1 + Math.sin(t * 0.6) * 0.06
            ptSphere.rotation.y = t * 0.05

            renderer.render(scene, camera)
        }
        animate()

        // ── CLEANUP ──────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafId)
            renderer.dispose()
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onTouchEnd)
            canvas.removeEventListener('mouseenter', onEnter)
            canvas.removeEventListener('mouseleave', onLeave)
            canvas.removeEventListener('mousedown', onDown)
            canvas.removeEventListener('touchstart', onTouchStart)
        }
    }, [])

    return (
        <section className="hero">
            <canvas ref={canvasRef} className="hero-canvas" />
            <div className="hero-vignette" />

            <div className="hero-content">
                <div className="hero-eyebrow" style={{ marginTop: '200px' }}>
                    University of Melbourne · Est. 2013</div>
                <h1 className="hero-title">
                    WIT
                </h1>
                <p className="hero-sub">
                    Women in Technology
                </p>
                {/* Add more social media buttons here */}
                <div className="hero-actions">
                    <a
                        href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/website/"
                        className="btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"> Join Us
                    </a>

                    <div className="hero-socials">
                        <a href="https://discord.gg/mW5dg4dwcD" target="_blank" rel="noopener noreferrer" className="social-btn">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" alt="Discord" />
                        </a>
                        {/*Insert actual UMSU Logo Here*/}
                        <a href="https://www.linkedin.com/company/women-in-tech-wit-unimelb/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-btn">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" alt="Linkedin" />
                        </a>
                        <a href="https://www.instagram.com/witunimelb/" target="_blank" rel="noopener noreferrer" className="social-btn">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" alt="Instagram" />
                        </a>
                        <a href="https://www.facebook.com/witunimelb" target="_blank" rel="noopener noreferrer" className="social-btn">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg" alt="Facebook" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="stats-strip">
                <div className="stat">
                    <div className="stat-num">500+</div>
                    <div className="stat-label">Members</div>
                </div>
                <div className="stat">
                    <div className="stat-num">30+</div>
                    <div className="stat-label">Events / year</div>
                </div>
                <div className="stat">
                    <div className="stat-num">20+</div>
                    <div className="stat-label">Industry partners</div>
                </div>
            </div>
        </section >
    )
}