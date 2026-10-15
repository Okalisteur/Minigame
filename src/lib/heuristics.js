import { classifyDomain } from "./sourceList.js";

// Mots-clés à forte charge émotionnelle : à compléter (FR + MG)
const EMOTIONAL_WORDS = [
  "urgent", "choquant", "scandale", "alerte", "incroyable",
  "ils cachent", "personne n'en parle", "partagez avant suppression",
  "tsy azo hoe", "mafy be", "atahoranareo"
];

function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function countEmotionalWords(text) {
  const lower = text.toLowerCase();
  return EMOTIONAL_WORDS.reduce(
    (count, word) => (lower.includes(word) ? count + 1 : count),
    0
  );
}

function hasExcessivePunctuation(text) {
  return /[!?]{2,}/.test(text);
}

function isMostlyUppercase(text) {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 15) return false;
  const upper = letters.replace(/[^A-Z]/g, "");
  return upper.length / letters.length > 0.6;
}

/**
 * Calcule un score de fiabilité entre 0 (suspect) et 100 (fiable).
 * @param {{text: string, linkUrl: string|null}} post
 */
export function scorePost(post) {
  let score = 60; // point de départ neutre
  const signals = [];

  const domain = post.linkUrl ? extractDomain(post.linkUrl) : null;
  const domainStatus = classifyDomain(domain);

  if (domainStatus === "trusted") {
    score += 25;
    signals.push({ type: "positive", label: "Source reconnue comme fiable" });
  } else if (domainStatus === "untrusted") {
    score -= 40;
    signals.push({ type: "negative", label: "Source signalée comme peu fiable" });
  } else if (!post.linkUrl) {
    score -= 10;
    signals.push({ type: "negative", label: "Aucune source citée" });
  }

  const emotionalHits = countEmotionalWords(post.text || "");
  if (emotionalHits > 0) {
    score -= emotionalHits * 8;
    signals.push({
      type: "negative",
      label: `Langage à forte charge émotionnelle détecté (${emotionalHits})`
    });
  }

  if (hasExcessivePunctuation(post.text || "")) {
    score -= 5;
    signals.push({ type: "negative", label: "Ponctuation excessive (!!! ???)" });
  }

  if (isMostlyUppercase(post.text || "")) {
    score -= 10;
    signals.push({ type: "negative", label: "Texte majoritairement en majuscules" });
  }

  score = Math.max(0, Math.min(100, score));

  return { score, signals, domain, domainStatus };
}

/**
 * Retourne un petit conseil pédagogique MIL selon les signaux détectés.
 */
export function getTipFor(result) {
  if (result.domainStatus === "untrusted") {
    return "Cette source a déjà été identifiée comme peu fiable. Cherche si d'autres médias reconnus relaient la même information avant de la croire.";
  }
  if (!result.domain) {
    return "Ce post ne cite aucune source vérifiable. Une information sans origine claire doit toujours être vérifiée avant d'être partagée.";
  }
  if (result.signals.some((s) => s.label.includes("émotionnelle"))) {
    return "Ce post utilise un langage qui cherche à provoquer une réaction émotionnelle forte. Prends un moment avant de partager : la peur ou l'indignation poussent à réagir sans vérifier.";
  }
  return "Réflexe MIL : vérifie toujours qui a écrit l'information, quand, et si d'autres sources indépendantes la confirment.";
}
