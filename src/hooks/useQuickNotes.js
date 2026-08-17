import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "streamflow:notes"

const NOTE_COLORS = [
  null, // sin color
  "#fef08a", // amarillo
  "#bbf7d0", // verde
  "#bfdbfe", // azul
  "#fecaca", // rojo
  "#e9d5ff", // morado
  "#fed7aa", // naranja
  "#fbcfe8", // rosa
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    /* empty */
  }
}

function generateId() {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`
}

export { NOTE_COLORS }

export function useQuickNotes() {
  const [notes, setNotes] = useState(load)

  useEffect(() => {
    save(notes)
  }, [notes])

  const addNote = useCallback((text, color = null) => {
    if (!text.trim()) return
    setNotes((prev) => [
      {
        id: generateId(),
        text: text.trim(),
        color,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }, [])

  const updateNote = useCallback((id, changes) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes } : n)),
    )
  }, [])

  const removeNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    if (confirm("¿Borrar todas las notas rápidas?")) setNotes([])
  }, [])

  return { notes, addNote, updateNote, removeNote, clearAll }
}
