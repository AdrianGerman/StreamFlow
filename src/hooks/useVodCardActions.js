import { useState } from "react"

export function useVodCardActions({ vod, bucketId, onMove, onRemove }) {
  const [hovered, setHovered] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [shortsTarget, setShortsTarget] = useState(null)

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
    if (destId === "shorts") {
      setShortsTarget(destId)
      return
    }
    onMove(vod.id, bucketId, destId)
  }

  const handleShortsConfirm = (count) => {
    onMove(vod.id, bucketId, shortsTarget, {
      shortsCount: count,
      shortsPosted: 0,
    })
    setShortsTarget(null)
  }

  const handleShortsCancel = () => setShortsTarget(null)

  return {
    hovered,
    confirming,
    shortsTarget,
    handleMouseEnter,
    handleMouseLeave,
    handleRemove,
    handleMove,
    handleShortsConfirm,
    handleShortsCancel,
  }
}
