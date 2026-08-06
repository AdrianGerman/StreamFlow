import { useMemo } from "react"

export function useDaysSinceUpload(buckets) {
  return useMemo(() => {
    const trash = buckets.trash ?? []
    if (trash.length === 0) return null

    const dates = trash
      .map((v) => v.completedAt)
      .filter(Boolean)
      .map((d) => new Date(d).getTime())

    if (dates.length === 0) return null

    const lastCompleted = new Date(Math.max(...dates))
    const now = new Date()
    const days = Math.floor((now - lastCompleted) / (1000 * 60 * 60 * 24))

    return { days, lastDate: lastCompleted }
  }, [buckets])
}
