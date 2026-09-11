import { useState, useCallback } from "react"

export function useConfetti(duration = 2800) {
  const [showConfetti, setShowConfetti] = useState(false)

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), duration + 100)
  }, [duration])

  return { showConfetti, triggerConfetti }
}
