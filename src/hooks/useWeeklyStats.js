import { useMemo } from "react"

function getWeekStart() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  monday.setHours(0, 0, 0, 0)
  return monday
}

function isThisWeek(dateStr) {
  if (!dateStr) return false
  const date = new Date(dateStr)
  return date >= getWeekStart()
}

export function useWeeklyStats(buckets) {
  return useMemo(() => {
    const allVods = Object.values(buckets).flat()

    const completedVideos = (buckets.trash ?? []).filter((v) =>
      isThisWeek(v.completedAt),
    )

    const shortsPosted = [...(buckets.shorts ?? []), ...(buckets.trash ?? [])]
      .filter((v) => isThisWeek(v.completedAt) || isThisWeek(v.createdAt))
      .reduce((acc, v) => acc + (v.shortsPosted ?? 0), 0)

    const vodsAdded = allVods.filter((v) => isThisWeek(v.createdAt))

    const today = new Date()
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1
    const dayName = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][dayOfWeek]
    const isSunday = dayOfWeek === 6

    return {
      completedVideos: completedVideos.length,
      shortsPosted,
      vodsAdded: vodsAdded.length,
      dayOfWeek,
      dayName,
      isSunday,
    }
  }, [buckets])
}
