import { useState, useMemo } from "react"

export const SORT_OPTIONS = [
  { id: "date-desc", label: "Más recientes primero" },
  { id: "date-asc", label: "Más antiguos primero" },
  { id: "title-asc", label: "Título A → Z" },
  { id: "title-desc", label: "Título Z → A" },
]

const DEFAULT_SORT = "date-desc"

function sortVods(vods, sortId) {
  const list = [...vods]
  switch (sortId) {
    case "date-desc":
      return list.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    case "date-asc":
      return list.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title, "es"))
    case "title-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title, "es"))
    default:
      return list
  }
}

export function useSortedVods(vods = []) {
  const [sortId, setSortId] = useState(DEFAULT_SORT)
  const sorted = useMemo(() => sortVods(vods, sortId), [vods, sortId])
  return { sorted, sortId, setSortId }
}
