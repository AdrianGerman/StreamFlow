import { useState, useEffect, useCallback } from "react"
import { COLUMN_IDS } from "../constants/columns"

const STORAGE_KEY = "streamflow:vods"

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    console.warn("StreamFlow: no se pudo guardar en localStorage.")
  }
}

function buildInitialState() {
  const saved = loadFromStorage()
  if (saved) return saved

  return Object.fromEntries(COLUMN_IDS.map((id) => [id, []]))
}

function generateId() {
  return `vod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function createVod({
  title,
  duration = "",
  notes = "",
  tags = [],
  date = null,
}) {
  return {
    id: generateId(),
    title,
    duration,
    notes,
    tags,
    date: date ?? new Date().toISOString().slice(0, 10),
    phase: 1,
    createdAt: new Date().toISOString(),
  }
}

export function useVodStore() {
  const [columns, setColumns] = useState(buildInitialState)

  useEffect(() => {
    saveToStorage(columns)
  }, [columns])

  const addVod = useCallback((columnId, vodData) => {
    const vod = createVod(vodData)
    setColumns((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], vod],
    }))
    return vod
  }, [])

  const moveVod = useCallback((vodId, fromColumnId, toColumnId) => {
    setColumns((prev) => {
      const vod = prev[fromColumnId]?.find((v) => v.id === vodId)
      if (!vod) return prev

      const updatedVod =
        toColumnId === "editing" && fromColumnId !== "editing"
          ? { ...vod, phase: 1 }
          : vod

      return {
        ...prev,
        [fromColumnId]: prev[fromColumnId].filter((v) => v.id !== vodId),
        [toColumnId]: [...prev[toColumnId], updatedVod],
      }
    })
  }, [])

  const updateVod = useCallback((columnId, vodId, changes) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((v) =>
        v.id === vodId ? { ...v, ...changes } : v,
      ),
    }))
  }, [])

  const advancePhase = useCallback(
    (vodId, currentPhase, totalPhases) => {
      if (currentPhase >= totalPhases) return
      updateVod("editing", vodId, { phase: currentPhase + 1 })
    },
    [updateVod],
  )

  const regressPhase = useCallback(
    (vodId, currentPhase) => {
      if (currentPhase <= 1) return
      updateVod("editing", vodId, { phase: currentPhase - 1 })
    },
    [updateVod],
  )

  const removeVod = useCallback((columnId, vodId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((v) => v.id !== vodId),
    }))
  }, [])

  const reorderVods = useCallback((columnId, fromIndex, toIndex) => {
    setColumns((prev) => {
      const list = [...prev[columnId]]
      const [moved] = list.splice(fromIndex, 1)
      list.splice(toIndex, 0, moved)
      return { ...prev, [columnId]: list }
    })
  }, [])

  return {
    columns,
    addVod,
    moveVod,
    updateVod,
    advancePhase,
    regressPhase,
    removeVod,
    reorderVods,
  }
}
