import { useState } from "react"
import { COLUMNS } from "./constants/columns"
import { TOTAL_PHASES } from "./constants/phases"
import { TAGS } from "./constants/tags"
import { useVodStore } from "./store/vodStore"
import VodCard from "./components/VodCard"
import TagBadge from "./components/TagBadge"

const COL_ICON = {
  inbox: "📥",
  ideas: "💡",
  editing: "✂️",
  shorts: "📱",
  trash: "🗑️",
}

const COL_STYLE = {
  inbox: {
    "--ch-bg": "var(--sf-inbox-bg)",
    "--ch-text": "var(--sf-inbox-text)",
  },
  ideas: {
    "--ch-bg": "var(--sf-ideas-bg)",
    "--ch-text": "var(--sf-ideas-text)",
  },
  editing: {
    "--ch-bg": "var(--sf-edit-bg)",
    "--ch-text": "var(--sf-edit-text)",
  },
  shorts: {
    "--ch-bg": "var(--sf-shorts-bg)",
    "--ch-text": "var(--sf-shorts-text)",
  },
  trash: {
    "--ch-bg": "var(--sf-trash-bg)",
    "--ch-text": "var(--sf-trash-text)",
  },
}

export default function App() {
  const { columns, addVod, moveVod, advancePhase, regressPhase, removeVod } =
    useVodStore()
  const [addingTo, setAddingTo] = useState(null)

  return (
    <div
      className="min-h-svh flex flex-col"
      style={{ background: "var(--sf-bg)", fontFamily: "var(--sans)" }}
    >
      {/* Header */}
      <header
        className="h-[52px] flex items-center justify-between px-6 sticky top-0 z-10 shrink-0"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ background: "var(--sf-green)" }}
          >
            🎬
          </div>
          <span
            className="text-[15px] font-semibold tracking-tight"
            style={{ color: "var(--text-h)" }}
          >
            Stream<span style={{ color: "var(--sf-green)" }}>Flow</span>
          </span>
        </div>
        <span className="text-[12px]" style={{ color: "var(--text)" }}>
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </header>

      {/* Board */}
      <div className="flex gap-3 p-5 overflow-x-auto items-start flex-1">
        {COLUMNS.map((col, i) => {
          const cards = columns[col.id] ?? []

          return (
            <div key={col.id} className="flex items-start shrink-0">
              {/* Columna */}
              <div className="w-[240px]">
                {/* Header columna */}
                <div
                  className="rounded-t-[10px] px-3.5 py-2.5 flex items-center gap-2"
                  style={{ ...COL_STYLE[col.id], background: "var(--ch-bg)" }}
                >
                  <span className="text-sm">{COL_ICON[col.id]}</span>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wide leading-none"
                    style={{ color: "var(--ch-text)" }}
                  >
                    {col.label}
                  </span>
                  <span
                    className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color: "var(--ch-text)",
                      background: "rgba(0,0,0,0.1)",
                    }}
                  >
                    {cards.length}
                  </span>
                </div>

                {/* Body columna */}
                <div
                  className="rounded-b-[10px] p-2.5 flex flex-col gap-2 min-h-[300px]"
                  style={{ background: "var(--sf-col-bg)" }}
                >
                  {cards.length === 0 && (
                    <p
                      className="text-[11px] text-center px-2 py-4 leading-relaxed"
                      style={{ color: "var(--text)" }}
                    >
                      {col.emptyText}
                    </p>
                  )}

                  {cards.map((vod) => (
                    <VodCard
                      key={vod.id}
                      vod={vod}
                      columnId={col.id}
                      availableColumns={COLUMNS}
                      onMove={moveVod}
                      onAdvance={(vodId, phase) =>
                        advancePhase(vodId, phase, TOTAL_PHASES)
                      }
                      onRegress={regressPhase}
                      onRemove={removeVod}
                    />
                  ))}

                  {col.id !== "trash" && (
                    <button
                      onClick={() => setAddingTo(col.id)}
                      className="mt-auto text-[12px] py-2 rounded-lg border-dashed border-2 cursor-pointer transition-colors duration-150 hover:border-(--sf-green) hover:text-(--sf-green)"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        background: "transparent",
                      }}
                    >
                      + Agregar VOD
                    </button>
                  )}
                </div>
              </div>

              {/* Flecha */}
              {i < COLUMNS.length - 1 && (
                <div
                  className="w-7 flex items-center justify-center pt-5 text-base shrink-0"
                  style={{ color: "var(--text)" }}
                >
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {addingTo && (
        <AddVodModal
          columnLabel={COLUMNS.find((c) => c.id === addingTo)?.label}
          onAdd={(data) => {
            addVod(addingTo, data)
            setAddingTo(null)
          }}
          onClose={() => setAddingTo(null)}
        />
      )}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function AddVodModal({ columnLabel, onAdd, onClose }) {
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState([])

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd({ title: title.trim(), duration, date, notes, tags })
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.35)" }}
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
          Agregar VOD
        </h2>
        <p className="text-[12px] m-0 mb-5" style={{ color: "var(--text)" }}>
          en <strong>{columnLabel}</strong>
        </p>

        <Field label="Título *">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="ej: Stream 22 jun — ranked"
            className={inputCls}
          />
        </Field>

        <div className="flex gap-2.5">
          <Field label="Duración" className="flex-1">
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="ej: 2h 30m"
              className={inputCls}
            />
          </Field>
          <Field label="Fecha" className="flex-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Notas">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ideas, momentos importantes, contexto..."
            rows={2}
            className={`${inputCls} resize-y`}
          />
        </Field>

        <Field label="Tipo de contenido">
          <div className="flex gap-1.5 flex-wrap">
            {TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-150"
                style={{
                  borderColor: tags.includes(tag.id)
                    ? "transparent"
                    : "var(--border)",
                  background: tags.includes(tag.id)
                    ? "transparent"
                    : "var(--code-bg)",
                  color: tags.includes(tag.id) ? "inherit" : "var(--text)",
                }}
              >
                {tags.includes(tag.id) ? (
                  <TagBadge tagId={tag.id} />
                ) : (
                  tag.label
                )}
              </button>
            ))}
          </div>
        </Field>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border transition-colors duration-150 hover:bg-(--code-bg)"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--bg)",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer text-white border-none transition-opacity duration-150 disabled:opacity-40"
            style={{ background: "var(--sf-green)" }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`mb-3 ${className}`}>
      <label
        className="block text-[11px] font-semibold mb-1"
        style={{ color: "var(--text)" }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  "w-full px-2.5 py-1.5 text-[13px] rounded-lg border outline-none font-[inherit] transition-colors duration-150 focus:border-(--accent)"
