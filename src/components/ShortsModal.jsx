import { useState } from "react"

export default function ShortsModal({ vod, onConfirm, onClose }) {
  const [count, setCount] = useState(1)

  const handleConfirm = () => {
    if (count < 1) return
    onConfirm(count)
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl p-6 w-[360px]"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow)" }}
      >
        <h2
          className="text-[15px] font-semibold m-0 mb-1"
          style={{ color: "var(--text-h)" }}
        >
          ¿Cuántos shorts salieron?
        </h2>
        <p className="text-[12px] mb-5" style={{ color: "var(--text)" }}>
          {vod.videoTitle || vod.title}
        </p>

        <div className="flex gap-2 flex-wrap mb-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className="w-11 h-11 rounded-xl text-[14px] font-semibold border cursor-pointer transition-all duration-150"
              style={{
                background: count === n ? "var(--sf-green)" : "var(--code-bg)",
                borderColor: count === n ? "var(--sf-green)" : "var(--border)",
                color: count === n ? "#fff" : "var(--text-h)",
              }}
            >
              {n}
            </button>
          ))}
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-[12px]" style={{ color: "var(--text)" }}>
              o
            </span>
            <input
              type="number"
              min={1}
              max={99}
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-14 text-center text-[13px] rounded-lg border outline-none"
              style={{
                padding: "8px 4px",
                borderColor: "var(--border)",
                background: "var(--code-bg)",
                color: "var(--text-h)",
              }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border transition-colors duration-150"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--bg)",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white"
            style={{ background: "var(--sf-green)" }}
          >
            Mover al pool →
          </button>
        </div>
      </div>
    </div>
  )
}
