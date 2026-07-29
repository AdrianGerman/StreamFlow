export function formatDate(dateStr) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  } catch {
    return dateStr
  }
}

export function formatWeekLabel(weekStart) {
  return new Date(weekStart + "T00:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  })
}
