const KEY = "mil_web_progress";

/**
 * Progression des 3 méthodes d'apprentissage du dashboard.
 * Persistée en localStorage pour que le tuto reprenne au bon endroit
 * si l'utilisateur ferme l'onglet en cours de route.
 */
const DEFAULT_PROGRESS = {
  defs: false, // Partie 1 — définitions & bases (SwipeLesson)
  manip: false, // Partie 2 — techniques de manipulation (Enquete)
  fouille: false, // Partie 3 — fouille MIL (jeu des mottes)
};

export function getProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function markDone(lessonKey) {
  const current = getProgress();
  const updated = { ...current, [lessonKey]: true };
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Efface la progression sauvegardée — utilisé par le bouton "Revoir le
 * tuto" pour refaire apparaître le tuto pas-à-pas depuis la première carte.
 */
export function resetProgress() {
  localStorage.removeItem(KEY);
  return { ...DEFAULT_PROGRESS };
}

/**
 * Renvoie la clé de la première méthode non terminée (ordre 1 -> 2 -> 3),
 * ou null si tout est terminé. Sert à savoir quel bouton le tuto doit
 * mettre en valeur.
 */
export function nextIncomplete(progress) {
  if (!progress.defs) return "defs";
  if (!progress.manip) return "manip";
  if (!progress.fouille) return "fouille";
  return null;
}
