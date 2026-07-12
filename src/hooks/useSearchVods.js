import { useState, useMemo } from "react"

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function matchesSearch(vod, query) {
  if (!query.trim()) return true
  const q = normalize(query)
  return (
    normalize(vod.title).includes(q) ||
    normalize(vod.notes ?? "").includes(q) ||
    normalize(vod.duration ?? "").includes(q)
  )
}

export function useSearchVods(vods = []) {
  const [query, setQuery] = useState("")
  const filtered = useMemo(
    () => vods.filter((vod) => matchesSearch(vod, query)),
    [vods, query],
  )
  return { filtered, query, setQuery }
}
