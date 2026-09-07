import { useMemo } from "react"
import { TOTAL_PHASES } from "../constants/phases"
import { getVodSourceName } from "../constants/sourceTypes"

export function useTodaySuggestions(buckets) {
  return useMemo(() => {
    const suggestions = []

    const inbox = buckets.inbox ?? []
    const editing = buckets.editing ?? []
    const shorts = buckets.shorts ?? []
    const trash = buckets.trash ?? []

    const shortsReady = shorts.filter(
      (v) => v.shortsReady && (v.shortsCount ?? 0) === 0,
    )
    const shortsProgress = shorts.filter(
      (v) => (v.shortsCount ?? 0) > 0 && (v.shortsPosted ?? 0) < v.shortsCount,
    )
    const shortsDone = shorts.filter(
      (v) => (v.shortsCount ?? 0) > 0 && (v.shortsPosted ?? 0) >= v.shortsCount,
    )

    const activeEdit = editing[0] ?? null
    if (activeEdit) {
      const isLastPhase = activeEdit.phase === TOTAL_PHASES
      suggestions.push({
        id: "editing",
        icon: "✂️",
        title: `Continuar edición — ${getVodSourceName(activeEdit)}`,
        sub: isLastPhase
          ? `Fase ${activeEdit.phase}: Intro y outro · ¡Último paso!`
          : `Fase ${activeEdit.phase} de ${TOTAL_PHASES}: ${phaseLabel(activeEdit.phase)}`,
        tag: isLastPhase ? "¡Último paso!" : "En edición",
        tagBg: "#c8f0e0",
        tagColor: "#0a3d2e",
        urgent: isLastPhase,
        navigate: "editing",
      })
    }

    if (shortsReady.length > 0) {
      suggestions.push({
        id: "shorts-ready",
        icon: "📱",
        title:
          shortsReady.length === 1
            ? `Empezar shorts — ${getVodSourceName(shortsReady[0])}`
            : `${shortsReady.length} videos listos para hacer shorts`,
        sub: "Indica cuántos shorts salieron para empezar a marcarlos",
        tag: "Listo para shorts",
        tagBg: "#fad6e4",
        tagColor: "#5c0d2a",
        urgent: false,
        navigate: "shorts",
      })
    }

    if (shortsProgress.length > 0) {
      const total = shortsProgress.reduce(
        (acc, v) => acc + (v.shortsCount ?? 0),
        0,
      )
      const posted = shortsProgress.reduce(
        (acc, v) => acc + (v.shortsPosted ?? 0),
        0,
      )
      suggestions.push({
        id: "shorts-progress",
        icon: "⬆️",
        title: `Subir shorts — ${posted}/${total} publicados`,
        sub:
          shortsProgress.length === 1
            ? getVodSourceName(shortsProgress[0])
            : `${shortsProgress.length} videos con shorts pendientes`,
        tag: "En progreso",
        tagBg: "#fad6e4",
        tagColor: "#5c0d2a",
        urgent: false,
        navigate: "shorts",
      })
    }

    if (shortsDone.length > 0) {
      suggestions.push({
        id: "shorts-done",
        icon: "✅",
        title: `${shortsDone.length} video${shortsDone.length > 1 ? "s" : ""} con todos los shorts subidos`,
        sub: "Puedes moverlos a Para borrar y liberar espacio",
        tag: "Ciclo completo",
        tagBg: "#c8f0e0",
        tagColor: "#0a3d2e",
        urgent: false,
        navigate: "shorts",
      })
    }

    if (inbox.length > 0) {
      suggestions.push({
        id: "inbox",
        icon: "📥",
        title: `Clasificar ${inbox.length} VOD${inbox.length > 1 ? "s" : ""} sin revisar`,
        sub: `El más reciente: ${getVodSourceName(inbox[0])}`,
        tag: inbox.length >= 5 ? "¡Muchos pendientes!" : "Pendiente",
        tagBg: inbox.length >= 5 ? "#fae0d4" : "#daeafa",
        tagColor: inbox.length >= 5 ? "#5c2010" : "#0d3a5c",
        urgent: inbox.length >= 5,
        navigate: "content",
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
