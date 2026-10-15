/**
 * Petite pastille de statistique en haut de l'app (série, points, cœurs).
 * Le chiffre en Space Mono : registre "compteur", distinct du reste du texte.
 */
export default function StatPill({ icon, value, tone = "kabary" }) {
  const tones = {
    kabary: "bg-kabary-100 text-kabary-700",
    ravinala: "bg-ravinala-100 text-ravinala-700",
    alerte: "bg-alerte-100 text-alerte",
    lavande: "bg-lavande-100 text-encre",
  };

  return (
    <div
      className={[
        "flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-pill)] font-semibold",
        tones[tone],
      ].join(" ")}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="font-mono text-sm tabular-nums">{value}</span>
    </div>
  );
}
