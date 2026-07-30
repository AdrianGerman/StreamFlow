import { useMemo } from "react"
import { formatWeekLabel } from "../utils/date"

function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d)
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString().slice(0, 10)
}

export function useHistoryStats(buckets, filter = "all") {
  return useMemo(() => {
    const applyFilter = (vods) =>
      filter === "all"
        ? vods
        : vods.filter((v) => (v.contentType ?? "stream") === filter)

    const trash = applyFilter(buckets.trash ?? [])
    const allVods = applyFilter(Object.values(buckets).flat())

    const weekMap = new Map()

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
      if (!vod.completedAt) return
      const week = getOrCreate(getWeekStart(vod.completedAt))
      week.videosCompleted += 1
      week.shortsPosted += vod.shortsPosted ?? 0
    })

    allVods.forEach((vod) => {
      if (!vod.createdAt) return
      const week = getOrCreate(getWeekStart(vod.createdAt))
      week.vodsAdded += 1
      if ((vod.contentType ?? "stream") === "recording") week.recordingVods += 1
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
  }, [buckets, filter])
}
