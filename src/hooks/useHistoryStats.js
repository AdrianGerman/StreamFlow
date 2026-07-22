import { useMemo } from "react"

export function useHistoryStats(buckets) {
  return useMemo(() => {
    const trash = buckets.trash ?? []
    const allVods = Object.values(buckets).flat()

    const weekMap = new Map()

    const getWeekKey = (dateStr) => {
      if (!dateStr) return null
      const date = new Date(dateStr)
      const day = date.getDay()
      const diff = date.getDate() - day + (day === 0 ? -6 : 1)
      const monday = new Date(date)
      monday.setDate(diff)
      monday.setHours(0, 0, 0, 0)
      return monday.toISOString().slice(0, 10)
    }

    const getOrCreate = (key) => {
      if (!weekMap.has(key)) {
        weekMap.set(key, {
          weekStart: key,
          label: formatWeekLabel(key),
          videosCompleted: 0,
          shortsPosted: 0,
          vodsAdded: 0,
          streamVods: 0,
          recordingVods: 0,
        })
      }
      return weekMap.get(key)
    }

    trash.forEach((vod) => {
      const key = getWeekKey(vod.completedAt)
      if (!key) return
      const week = getOrCreate(key)
      week.videosCompleted += 1
      week.shortsPosted += vod.shortsPosted ?? 0
    })

    allVods.forEach((vod) => {
      const key = getWeekKey(vod.createdAt)
      if (!key) return
      const week = getOrCreate(key)
      week.vodsAdded += 1
      if (vod.contentType === "recording") week.recordingVods += 1
      else week.streamVods += 1
    })

    const weeks = Array.from(weekMap.values())
      .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
      .slice(-12)

    const totals = {
      videosCompleted: trash.length,
      shortsPosted: trash.reduce((acc, v) => acc + (v.shortsPosted ?? 0), 0),
      vodsAdded: allVods.length,
      streams: allVods.filter((v) => (v.contentType ?? "stream") === "stream")
        .length,
      recordings: allVods.filter((v) => v.contentType === "recording").length,
    }

    return { weeks, totals }
  }, [buckets])
}

function formatWeekLabel(weekStart) {
  const date = new Date(weekStart + "T00:00:00")
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
}
