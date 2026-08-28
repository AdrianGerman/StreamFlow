import { useRef, useState, useCallback } from "react"

export function useDragDrop(onReorder) {
  const draggingId = useRef(null)
  const [overId, setOverId] = useState(null)

  const onDragStart = useCallback(
    (id) => (e) => {
      draggingId.current = id
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.setData("text/plain", id)
    },
    [],
  )

  const onDragOver = useCallback(
    (id) => (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move"
      if (id !== draggingId.current) setOverId(id)
    },
    [],
  )

  const onDrop = useCallback(
    (id) => (e) => {
      e.preventDefault()
      const from = draggingId.current
      if (from && from !== id) onReorder(from, id)
      draggingId.current = null
      setOverId(null)
    },
    [onReorder],
  )

  const onDragEnd = useCallback(() => {
    draggingId.current = null
    setOverId(null)
  }, [])

  return { overId, onDragStart, onDragOver, onDrop, onDragEnd }
}
