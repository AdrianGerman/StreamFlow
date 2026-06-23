export const COLUMNS = [
  {
    id: "inbox",
    label: "VODs sin clasificar",
    icon: "inbox",
    description: "Streams descargados que todavía no clasificaste.",
    emptyText: "Arrastrá un VOD aquí o agregá uno nuevo.",
  },
  {
    id: "ideas",
    label: "Ideas de contenido",
    icon: "bulb",
    description: "VODs con potencial para video largo o short.",
    emptyText: "Mové un VOD cuando tengas una idea clara.",
  },
  {
    id: "editing",
    label: "En edición",
    icon: "cut",
    description: "Videos activamente en proceso de edición.",
    emptyText: "Los videos que estás editando aparecen acá.",
  },
  {
    id: "shorts",
    label: "Pool de shorts",
    icon: "device-mobile",
    description: "Videos terminados para extraer shorts y TikToks.",
    emptyText: "Mové un video terminado para sacarle shorts.",
  },
  {
    id: "trash",
    label: "Listo para borrar",
    icon: "trash",
    description: "VODs ya procesados. Podés borrarlos del disco.",
    emptyText: "Cuando un ciclo cierre completamente, el VOD llega acá.",
  },
]

export const COLUMN_IDS = COLUMNS.map((c) => c.id)

export const COLUMN_MAP = Object.fromEntries(COLUMNS.map((c) => [c.id, c]))
