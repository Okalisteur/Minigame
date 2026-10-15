// Listes à enrichir toi-même au fil du temps (médias malgaches + internationaux)
export const TRUSTED_DOMAINS = [
  "lexpress.mg",
  "midi-madagasikara.mg",
  "newsmada.com",
  "rfi.fr",
  "lemonde.fr",
  "afp.com",
  "bbc.com",
  "reuters.com"
];

// Domaines connus pour diffuser régulièrement de fausses informations.
// À compléter avec tes propres recherches / signalements communautaires.
export const UNTRUSTED_DOMAINS = [];

export function classifyDomain(domain) {
  if (!domain) return "unknown";
  const d = domain.replace(/^www\./, "");
  if (TRUSTED_DOMAINS.some((t) => d.endsWith(t))) return "trusted";
  if (UNTRUSTED_DOMAINS.some((t) => d.endsWith(t))) return "untrusted";
  return "unknown";
}
