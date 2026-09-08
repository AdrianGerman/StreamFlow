function getAudioContext() {
  if (typeof window === "undefined") return null
  if (!window._sfAudioCtx) {
    window._sfAudioCtx = new (
      window.AudioContext || window.webkitAudioContext
    )()
  }
  return window._sfAudioCtx
}

function playTone({
  frequency = 440,
  type = "sine",
  duration = 0.15,
  volume = 0.3,
  delay = 0,
}) {
  const ctx = getAudioContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay)

  gainNode.gain.setValueAtTime(0, ctx.currentTime + delay)
  gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration,
  )

  oscillator.start(ctx.currentTime + delay)
  oscillator.stop(ctx.currentTime + delay + duration)
}

export function playShortPosted() {
  playTone({ frequency: 600, type: "sine", duration: 0.12, volume: 0.2 })
  playTone({
    frequency: 900,
    type: "sine",
    duration: 0.08,
    volume: 0.15,
    delay: 0.05,
  })
}

export function playAllShortsComplete() {
  playTone({ frequency: 523, type: "sine", duration: 0.12, volume: 0.25 }) // Do
  playTone({
    frequency: 659,
    type: "sine",
    duration: 0.12,
    volume: 0.25,
    delay: 0.1,
  }) // Mi
  playTone({
    frequency: 784,
    type: "sine",
    duration: 0.2,
    volume: 0.3,
    delay: 0.2,
  }) // Sol
}

export function playCycleComplete() {
  playTone({ frequency: 800, type: "sine", duration: 0.1, volume: 0.25 })
  playTone({
    frequency: 1000,
    type: "sine",
    duration: 0.1,
    volume: 0.25,
    delay: 0.1,
  })
  playTone({
    frequency: 1200,
    type: "sine",
    duration: 0.2,
    volume: 0.3,
    delay: 0.2,
  })
}
