export const TAGS = [
  {
    id: "video",
    label: "Video largo",
    color: "blue",
  },
  {
    id: "short",
    label: "Short",
    color: "teal",
  },
  {
    id: "tiktok",
    label: "TikTok",
    color: "pink",
  },
]

export const TAG_MAP = Object.fromEntries(TAGS.map((t) => [t.id, t]))
