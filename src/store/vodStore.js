import { useState, useEffect, useCallback } from "react"
import { STORE_KEYS } from "../constants/nav"

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
  return Object.fromEntries(STORE_KEYS.map((id) => [id, []]))
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
  const [buckets, setBuckets] = useState(buildInitialState)

  useEffect(() => {
    saveToStorage(buckets)
  }, [buckets])

  const addVod = useCallback((bucketId, vodData) => {
    const vod = createVod(vodData)
    setBuckets((prev) => ({ ...prev, [bucketId]: [...prev[bucketId], vod] }))
    return vod
  }, [])

  const moveVod = useCallback((vodId, fromId, toId) => {
    setBuckets((prev) => {
      const vod = prev[fromId]?.find((v) => v.id === vodId)
      if (!vod) return prev
      const updated =
        toId === "editing" && fromId !== "editing" ? { ...vod, phase: 1 } : vod
      return {
        ...prev,
        [fromId]: prev[fromId].filter((v) => v.id !== vodId),
        [toId]: [...prev[toId], updated],
      }
    })
  }, [])

  const updateVod = useCallback((bucketId, vodId, changes) => {
    setBuckets((prev) => ({
      ...prev,
      [bucketId]: prev[bucketId].map((v) =>
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

  const removeVod = useCallback((bucketId, vodId) => {
    setBuckets((prev) => ({
      ...prev,
      [bucketId]: prev[bucketId].filter((v) => v.id !== vodId),
    }))
  }, [])

  const reorderVods = useCallback((bucketId, fromIndex, toIndex) => {
    setBuckets((prev) => {
      const list = [...prev[bucketId]]
      const [moved] = list.splice(fromIndex, 1)
      list.splice(toIndex, 0, moved)
      return { ...prev, [bucketId]: list }
    })
  }, [])

  return {
    buckets,
    addVod,
    moveVod,
    updateVod,
    advancePhase,
    regressPhase,
    removeVod,
    reorderVods,
  }
}
