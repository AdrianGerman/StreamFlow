export default function ShortsTracker({ vod, onUpdate, onComplete }) {
  const total = vod.shortsCount ?? 0
  const posted = vod.shortsPosted ?? 0

  if (total === 0) return null

  const handleMark = () => {
    const next = posted + 1
    if (next >= total) {
      onComplete()
    } else {
      onUpdate({ shortsPosted: next })
    }
  }

  const handleUnmark = () => {
    if (posted <= 0) return
    onUpdate({ shortsPosted: posted - 1 })
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
          style={{ color: "var(--sf-green)" }}
        >
          {posted}/{total} subidos
        </span>
      </div>

      <div className="flex gap-1.5 mb-2.5 flex-wrap">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200"
            style={{
              background: i < posted ? "var(--sf-green)" : "var(--code-bg)",
              color: i < posted ? "#fff" : "var(--text)",
              border: `1px solid ${i < posted ? "var(--sf-green)" : "var(--border)"}`,
            }}
          >
            {i < posted ? "✓" : i + 1}
          </div>
        ))}
      </div>

      <div className="flex gap-1.5">
        {posted > 0 && (
          <button
            onClick={handleUnmark}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-all duration-150"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--bg)",
            }}
          >
            ← Desmarcar
          </button>
        )}
        {posted < total && (
          <button
            onClick={handleMark}
            className="text-[11px] font-medium px-3 py-1 rounded-lg border-none cursor-pointer transition-opacity hover:opacity-80 text-white"
            style={{ background: "var(--sf-green)" }}
          >
            {posted === total - 1
              ? "✓ Marcar último — cerrar ciclo"
              : `Marcar short ${posted + 1} como subido`}
          </button>
        )}
      </div>
    </div>
  )
}
