import { useState } from "react"

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
