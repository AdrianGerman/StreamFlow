import { useDataBackup } from "../hooks/useDataBackup"
import DeleteSection from "./DeleteSection"

export default function DataManager({ onClose }) {
  const { exportBackup, importBackup } = useDataBackup()

  const handleImport = (e) => {
    importBackup(e.target.files?.[0], () => window.location.reload())
    e.target.value = ""
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl p-6 w-[400px] max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow)" }}
      >
        <h2
          className="text-[15px] font-semibold mb-1"
          style={{ color: "var(--text-h)" }}
        >
          Datos y backup
        </h2>
        <p className="text-[12px] mb-5" style={{ color: "var(--text)" }}>
          Exporta, restaura o borra tus datos de StreamFlow.
        </p>

        <div
          className="rounded-xl p-4 border mb-3"
          style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
        >
          <p
            className="text-[13px] font-semibold mb-0.5"
            style={{ color: "var(--text-h)" }}
          >
            📤 Exportar backup
          </p>
          <p className="text-[12px] mb-3" style={{ color: "var(--text)" }}>
            Descarga un archivo JSON con todos tus VODs y su estado actual.
          </p>
          <button
            onClick={exportBackup}
            className="w-full py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--sf-primary)" }}
          >
            Descargar backup
          </button>
        </div>

        <div
          className="rounded-xl p-4 border mb-3"
          style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
        >
          <p
            className="text-[13px] font-semibold mb-0.5"
            style={{ color: "var(--text-h)" }}
          >
            📥 Restaurar backup
          </p>
          <p className="text-[12px] mb-3" style={{ color: "var(--text)" }}>
            Carga un archivo de backup previo. Reemplaza todos los datos
            actuales.
          </p>
          <label
            className="block w-full py-2 rounded-lg text-[13px] font-semibold cursor-pointer border text-center transition-colors duration-150 hover:bg-(--code-bg)"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-h)",
              background: "var(--bg)",
            }}
          >
            Seleccionar archivo
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-5">
          <DeleteSection onDeleted={() => window.location.reload()} />
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border transition-colors duration-150"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
            background: "var(--bg)",
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
