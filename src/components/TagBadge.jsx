import { TAG_MAP } from "../constants/tags"

const TAG_CLASSES = {
  blue: "bg-[#e6f1fb] text-[#185fa5]",
  teal: "bg-[#e1f5ee] text-[#0f6e56]",
  pink: "bg-[#fbeaf0] text-[#993556]",
}

export default function TagBadge({ tagId }) {
  const tag = TAG_MAP[tagId]
  if (!tag) return null

  return (
    <span
      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide ${TAG_CLASSES[tag.color]}`}
    >
      {tag.label}
    </span>
  )
}
