export default function DataManager({ onClose }) {
  const handleExport = () => {
    try {
      const raw = localStorage.getItem("streamflow:vods") ?? "{}"
      const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        vods: JSON.parse(raw),
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `streamflow-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("No se pudo exportar el backup.")
    }
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)

        if (!data.vods || typeof data.vods !== "object") {
          alert("El archivo no es un backup válido de StreamFlow.")
          return
        }

        if (
          !confirm(
            "¿Reemplazar todos los datos actuales con este backup? Esta acción no se puede deshacer.",
          )
        )
          return

        localStorage.setItem("streamflow:vods", JSON.stringify(data.vods))
        window.location.reload()
      } catch {
        alert(
          "No se pudo leer el archivo. Asegúrate de que sea un backup válido de StreamFlow.",
        )
      }
    }
    reader.readAsText(file)
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
        className="rounded-2xl p-6 w-[380px]"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow)" }}
      >
        <h2
          className="text-[15px] font-semibold mb-1"
          style={{ color: "var(--text-h)" }}
        >
          Datos y backup
        </h2>
        <p className="text-[12px] mb-5" style={{ color: "var(--text)" }}>
          Exporta tus datos para hacer un backup o restaurarlos en otro
          dispositivo.
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
            onClick={handleExport}
            className="w-full py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--sf-green)" }}
          >
            Descargar backup
          </button>
        </div>

        <div
          className="rounded-xl p-4 border mb-5"
          style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
        >
          <p
            className="text-[13px] font-semibold mb-0.5"
            style={{ color: "var(--text-h)" }}
          >
            📥 Restaurar backup
          </p>
          <p className="text-[12px] mb-3" style={{ color: "var(--text)" }}>
            Carga un archivo de backup previo. Esto reemplazará todos los datos
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
