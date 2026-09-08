import { useState } from "react"
import { playCycleComplete } from "../utils/sounds"

export function useVodCardActions({ vod, bucketId, onMove, onRemove }) {
  const [hovered, setHovered] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => {
    setHovered(false)
    setConfirming(false)
  }

  const handleRemove = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onRemove(bucketId, vod.id)
  }

  const handleMove = (destId) => {
    if (destId === "trash" && bucketId === "shorts") playCycleComplete()
    onMove(vod.id, bucketId, destId)
  }

  return {
    hovered,
    confirming,
    handleMouseEnter,
    handleMouseLeave,
    handleRemove,
    handleMove,
  }
}
