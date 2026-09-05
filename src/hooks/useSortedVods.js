import { useState, useMemo } from "react"
import { getVodSourceName } from "../constants/sourceTypes"

const STORAGE_KEY = "streamflow:sort"

export const SORT_OPTIONS = [
  { id: "manual", label: "Orden manual" },
  { id: "date-desc", label: "Más recientes primero" },
  { id: "date-asc", label: "Más antiguos primero" },
  { id: "title-asc", label: "Título A → Z" },
  { id: "title-desc", label: "Título Z → A" },
]

const DEFAULT_SORT = "manual"

function loadSort(bucketId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : {}
    return saved[bucketId] ?? DEFAULT_SORT
  } catch {
    return DEFAULT_SORT
  }
}

function saveSort(bucketId, sortId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : {}
    saved[bucketId] = sortId
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch {
    /* empty */
  }
}

function sortVods(vods, sortId) {
  if (sortId === "manual") return vods
  const list = [...vods]
  switch (sortId) {
    case "date-desc":
      return list.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    case "date-asc":
      return list.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))
    case "title-asc":
      return list.sort((a, b) =>
        getVodSourceName(a).localeCompare(getVodSourceName(b), "es"),
      )
    case "title-desc":
      return list.sort((a, b) =>
        getVodSourceName(b).localeCompare(getVodSourceName(a), "es"),
      )
    default:
      return vods
  }
}

export function useSortedVods(vods = [], bucketId = "default") {
  const [sortId, setSortIdState] = useState(() => loadSort(bucketId))

  const setSortId = (id) => {
    setSortIdState(id)
    saveSort(bucketId, id)
  }

  const sorted = useMemo(() => sortVods(vods, sortId), [vods, sortId])

  const canReorder = sortId === "manual"

  return { sorted, sortId, setSortId, canReorder }
}
