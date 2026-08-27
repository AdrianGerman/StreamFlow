import { useState } from "react"
import ShortsModal from "./ShortsModal"

export default function ShortsTracker({ vod, onUpdate, onComplete }) {
  const [showModal, setShowModal] = useState(false)

  const total = vod.shortsCount ?? 0
  const posted = vod.shortsPosted ?? 0
  const isReady = vod.shortsReady && total === 0
  const inProgress = total > 0 && posted < total
  const allDone = total > 0 && posted >= total

  const handleStartShorts = (count) => {
    onUpdate({ shortsCount: count, shortsPosted: 0, shortsReady: true })
    setShowModal(false)
  }

  const handleToggle = (index) => {
    const isDone = index < posted
    if (isDone) {
      onUpdate({ shortsPosted: index })
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
    <>
      <div
        className="mt-3 pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {isReady && (
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-lg"
            style={{ background: "var(--sf-primary-dim)" }}
          >
            <div>
              <p
                className="text-[12px] font-semibold"
                style={{ color: "var(--sf-edit-text)" }}
              >
                📱 Listo para hacer shorts
              </p>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "var(--text)" }}
              >
                Cuando empieces, indica cuántos salieron.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-white transition-opacity hover:opacity-80 shrink-0 ml-3"
              style={{ background: "var(--sf-primary)" }}
            >
              Empezar →
            </button>
          </div>
        )}

        {inProgress && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--text)" }}
              >
                Shorts / TikToks
              </span>
              <span
                className="text-[11px] font-semibold"
                style={{ color: "var(--sf-primary)" }}
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
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer border-none transition-all duration-200"
                    style={{
                      background: isDone
                        ? "var(--sf-primary)"
                        : "var(--code-bg)",
                      color: isDone ? "#fff" : "var(--text)",
                      outline: `2px solid ${isDone ? "var(--sf-primary)" : "var(--border)"}`,
                      outlineOffset: "1px",
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
          </>
        )}

        {allDone && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: "var(--sf-primary-dim)" }}
          >
            <span className="text-base">✅</span>
            <div className="flex-1">
              <p
                className="text-[12px] font-semibold"
                style={{ color: "var(--sf-edit-text)" }}
              >
                {posted}/{total} shorts subidos — ciclo completo
              </p>
              <p className="text-[11px]" style={{ color: "var(--text)" }}>
                Puedes moverlo a "Para borrar".
              </p>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ShortsModal
          vod={vod}
          onConfirm={handleStartShorts}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
