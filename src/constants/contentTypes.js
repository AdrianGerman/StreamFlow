export const CONTENT_TYPES = [
  {
    id: "stream",
    label: "Stream / VOD",
    description: "Grabación de un stream en vivo.",
    icon: "🎮",
  },
  {
    id: "recording",
    label: "Grabación",
    description: "Video grabado offline, mayor calidad.",
    icon: "🎥",
  },
]

export const CONTENT_TYPE_MAP = Object.fromEntries(
  CONTENT_TYPES.map((t) => [t.id, t]),
)
