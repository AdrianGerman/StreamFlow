import { useState } from "react"
import CountSelector from "./CountSelector"
import ModalShell, { ModalHeader, ModalBody, ModalFooter } from "./ModalShell"

export default function ShortsModal({ vod, onConfirm, onClose }) {
  const [count, setCount] = useState(1)

  return (
    <ModalShell onClose={onClose} width={380}>
      <ModalHeader
        title="¿Cuántos shorts salieron?"
        sub={vod.videoTitle || vod.title}
        accentColor="#5b21b6"
      />
      <ModalBody>
        <CountSelector value={count} onChange={setCount} />
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
            background: "transparent",
          }}
        >
          Cancelar
        </button>
        <button
          onClick={() => onConfirm(count)}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white"
          style={{ background: "var(--sf-primary)" }}
        >
          Mover al pool →
        </button>
      </ModalFooter>
    </ModalShell>
  )
}
