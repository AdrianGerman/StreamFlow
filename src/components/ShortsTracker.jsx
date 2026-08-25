export default function ShortsTracker({ vod, onUpdate, onComplete }) {
  const total = vod.shortsCount ?? 0
  const posted = vod.shortsPosted ?? 0

  if (total === 0) return null

  const allDone = posted >= total

  const handleToggle = (index) => {
    const isPosted = index < posted

    if (isPosted) {
      const next = index
      if (next <= 0 && total > 0) {
        onUpdate({ shortsPosted: 0 })
      } else {
        onUpdate({ shortsPosted: next })
      }
    } else {
      const next = index + 1
      if (next >= total) {
        onComplete()
      } else {
        onUpdate({ shortsPosted: next })
      }
    }
  }

  return (
    <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: "var(--text)" }}
        >
          Shorts / TikToks
        </span>
        <span
          className="text-[11px] font-semibold"
          style={{ color: allDone ? "var(--sf-primary)" : "var(--text)" }}
        >
          {posted}/{total} subidos
        </span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: total }).map((_, i) => {
          const isDone = i < posted
          return (
            <button
              key={i}
              onClick={() => handleToggle(i)}
              title={
                isDone
                  ? `Desmarcar short ${i + 1}`
                  : `Marcar short ${i + 1} como subido`
              }
              className="w-7 h-7 mr-1 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 cursor-pointer border-none"
              style={{
                background: isDone ? "var(--sf-primary)" : "var(--code-bg)",
                color: isDone ? "#fff" : "var(--text)",
                outline: `2px solid ${isDone ? "var(--sf-primary)" : "var(--border)"}`,
                outlineOffset: "1px",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              {isDone ? "✓" : i + 1}
            </button>
          )
        })}
      </div>

      {allDone && (
        <p
          className="text-[11px] font-medium mt-2"
          style={{ color: "var(--sf-primary)" }}
        >
          ✅ Todos subidos — puedes mover a "Para borrar"
        </p>
      )}
    </div>
  )
}
