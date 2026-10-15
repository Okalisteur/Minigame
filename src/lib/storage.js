const HISTORY_KEY = "mil_history";
const MAX_HISTORY = 200;

export async function addToHistory(entry) {
  const { [HISTORY_KEY]: history = [] } = await chrome.storage.local.get(HISTORY_KEY);
  const updated = [{ ...entry, timestamp: Date.now() }, ...history].slice(0, MAX_HISTORY);
  await chrome.storage.local.set({ [HISTORY_KEY]: updated });
  return updated;
}

export async function getHistory() {
  const { [HISTORY_KEY]: history = [] } = await chrome.storage.local.get(HISTORY_KEY);
  return history;
}

export async function clearHistory() {
  await chrome.storage.local.set({ [HISTORY_KEY]: [] });
}

export function getStats(history) {
  if (!history.length) return { total: 0, suspectPct: 0, avgScore: 0 };
  const suspect = history.filter((h) => h.score < 40).length;
  const avgScore = Math.round(
    history.reduce((sum, h) => sum + h.score, 0) / history.length
  );
  return {
    total: history.length,
    suspectPct: Math.round((suspect / history.length) * 100),
    avgScore
  };
}
