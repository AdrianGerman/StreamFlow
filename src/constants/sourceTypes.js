export const SOURCE_TYPES = [
  { id: "file", label: "Archivo", icon: "📄" },
  { id: "folder", label: "Carpeta", icon: "📁" },
  { id: "both", label: "Ambos", icon: "🗂️" },
]

export const SOURCE_TYPE_MAP = Object.fromEntries(
  SOURCE_TYPES.map((t) => [t.id, t]),
)

export function inferSourceType(vod) {
  if (vod?.sourceType && SOURCE_TYPE_MAP[vod.sourceType]) {
    return vod.sourceType
  }
  if (vod?.folderName && vod?.title) return "both"
  if (vod?.folderName) return "folder"
  return "file"
}

export function getSourceLines(vod) {
  const type = inferSourceType(vod)
  const lines = []
  if ((type === "folder" || type === "both") && vod?.folderName) {
    lines.push({
      id: "folder",
      icon: SOURCE_TYPE_MAP.folder.icon,
      label: vod.folderName,
      hint: "Carpeta organizada",
    })
  }
  if ((type === "file" || type === "both") && vod?.title) {
    lines.push({
      id: "file",
      icon: SOURCE_TYPE_MAP.file.icon,
      label: vod.title,
      hint: "Archivo",
    })
  }
  if (!lines.length && vod?.title) {
    lines.push({
      id: "file",
      icon: SOURCE_TYPE_MAP.file.icon,
      label: vod.title,
      hint: "Archivo",
    })
  }
  return lines
}

export function getVodSourceName(vod) {
  return vod?.title || vod?.folderName || ""
}