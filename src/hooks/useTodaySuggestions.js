import { useMemo } from "react"
import { TOTAL_PHASES } from "../constants/phases"

export function useTodaySuggestions(buckets) {
  return useMemo(() => {
    const suggestions = []

    const inbox = buckets.inbox ?? []
    const editing = buckets.editing ?? []
    const shorts = buckets.shorts ?? []
    const trash = buckets.trash ?? []

    const activeEdit = editing[0] ?? null
    if (activeEdit) {
      const isLastPhase = activeEdit.phase === TOTAL_PHASES
      suggestions.push({
        id: "editing",
        icon: "✂️",
        title: `Continuar edición — ${activeEdit.title}`,
        sub: isLastPhase
          ? `Fase ${activeEdit.phase}: Intro y outro · ¡Último paso!`
          : `Fase ${activeEdit.phase} de ${TOTAL_PHASES}: ${phaseLabel(activeEdit.phase)}`,
        tag: isLastPhase ? "¡Último paso!" : "En edición",
        tagBg: isLastPhase ? "#c8f0e0" : "#c8f0e0",
        tagColor: isLastPhase ? "#0a3d2e" : "#0a3d2e",
        urgent: isLastPhase,
        navigate: "editing",
      })
    }

    if (shorts.length > 0) {
      suggestions.push({
        id: "shorts",
        icon: "📱",
        title: `Extraer shorts de ${shorts.length} video${shorts.length > 1 ? "s" : ""}`,
        sub:
          shorts.length > 1
            ? `El más reciente: ${shorts[0]?.title}`
            : shorts[0]?.title,
        tag: "Shorts pendientes",
        tagBg: "#fad6e4",
        tagColor: "#5c0d2a",
        urgent: false,
        navigate: "shorts",
      })
    }

    if (inbox.length > 0) {
      suggestions.push({
        id: "inbox",
        icon: "📥",
        title: `Clasificar ${inbox.length} VOD${inbox.length > 1 ? "s" : ""} sin revisar`,
        sub: `El más reciente: ${inbox[0]?.title ?? ""}`,
        tag: inbox.length >= 5 ? "¡Muchos pendientes!" : "Pendiente",
        tagBg: inbox.length >= 5 ? "#fae0d4" : "#daeafa",
        tagColor: inbox.length >= 5 ? "#5c2010" : "#0d3a5c",
        urgent: inbox.length >= 5,
        navigate: "inbox",
      })
    }

    if (trash.length > 0) {
      suggestions.push({
        id: "trash",
        icon: "🗑️",
        title: `${trash.length} VOD${trash.length > 1 ? "s listos" : " listo"} para borrar`,
        sub: "Puedes liberar espacio en tu PC",
        tag: "Liberar espacio",
        tagBg: "#fae0d4",
        tagColor: "#5c2010",
        urgent: false,
        navigate: "trash",
      })
    }

    return suggestions
  }, [buckets])
}

function phaseLabel(n) {
  return ["Cortar", "Zoom y edición", "Música", "Intro y outro"][n - 1] ?? ""
}
