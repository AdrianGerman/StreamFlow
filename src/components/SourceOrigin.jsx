import { getSourceLines } from "../constants/sourceTypes"

export default function SourceOrigin({ vod }) {
  const lines = getSourceLines(vod)
  if (!lines.length) return null

  return (
    <div className="flex flex-col gap-0.5 mb-0.5">
      {lines.map((line) => (
        <p
          key={line.id}
          className="text-[11px] leading-snug flex items-center gap-1.5 m-0"
          style={{ color: "var(--text)" }}
          title={line.hint}
        >
          <span aria-hidden="true">{line.icon}</span>
          <span>{line.label}</span>
        </p>
      ))}
    </div>
  )
}
