import { useEffect, useRef } from "react"

const COLORS = [
  "#7c3aed",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#60a5fa",
  "#fb923c",
]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createParticle(canvas) {
  return {
    x: randomBetween(0, canvas.width),
    y: randomBetween(-40, -10),
    w: randomBetween(6, 12),
    h: randomBetween(4, 8),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: randomBetween(2, 5),
    angle: randomBetween(-0.4, 0.4),
    spin: randomBetween(-0.15, 0.15),
    rot: randomBetween(0, Math.PI * 2),
    opacity: 1,
  }
}

export default function Confetti({ count = 80, duration = 2800 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: count }, () =>
      createParticle(canvas),
    )
    const start = performance.now()
    let frame

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.y += p.speed
        p.x += p.angle
        p.rot += p.spin
        p.opacity = 1 - progress

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [count, duration])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
      }}
    />
  )
}
