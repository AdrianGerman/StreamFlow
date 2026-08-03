import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "streamflow:notes"

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

export function useQuickNotes() {
  const [notes, setNotes] = useState(load)

  useEffect(() => {
    save(notes)
  }, [notes])

  const addNote = useCallback((text) => {
    if (!text.trim()) return
    setNotes((prev) => [
      {
        id: generateId(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }, [])

  const removeNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    if (confirm("¿Borrar todas las notas rápidas?")) setNotes([])
  }, [])

  return { notes, addNote, removeNote, clearAll }
}
