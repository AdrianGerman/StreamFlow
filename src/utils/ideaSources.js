export function generateSourceId() {
  return `src_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`
}

export function createSource(vodRef = "", moments = []) {
  return { id: generateSourceId(), vodRef, moments }
}

export function normalizeSources(idea) {
  if (idea?.sources?.length > 0) return idea.sources
  if (idea?.vodRef || idea?.moments?.length > 0) {
    return [createSource(idea.vodRef ?? "", idea.moments ?? [])]
  }
  return [createSource()]
}
