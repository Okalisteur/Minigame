import { motion } from "framer-motion";

/**
 * Petite touche décorative posée en fond des BentoCard : une bulle floue
 * en coin + un semis de points, façon confettis discrets. Purement
 * ornemental (aria-hidden, pointer-events désactivés) — n'affecte jamais
 * la mise en page du contenu au-dessus.
 *
 * `variant="dark"` pour les cartes à fond dégradé/saturé (les pastilles
 * passent en blanc translucide) ; `variant="light"` (défaut) pour les
 * cartes à fond clair (pastilles bleu/cyan).
 */
export default function CardDecor({ variant = "light" }) {
  const dark = variant === "dark";
  const blobColor = dark ? "rgba(255,255,255,0.4)" : "var(--color-cyan)";
  const dotA = dark ? "rgba(255,255,255,0.9)" : "var(--color-lavande)";
  const dotB = dark ? "rgba(255,255,255,0.6)" : "var(--color-cyan)";

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* bulle floue, ambiance douce en coin haut-droit */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${blobColor} 0%, transparent 70%)`, opacity: dark ? 0.55 : 0.4 }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* semis de points, coin bas-droit */}
      <svg
        className="absolute bottom-3 right-3"
        width="48" height="28" viewBox="0 0 48 28" fill="none"
        style={{ opacity: dark ? 0.55 : 0.5 }}
      >
        <circle cx="5" cy="5" r="3" fill={dotB} />
        <circle cx="19" cy="14" r="2.5" fill={dotA} />
        <circle cx="35" cy="5" r="2" fill={dotB} />
        <circle cx="43" cy="19" r="3" fill={dotA} />
      </svg>
    </div>
  );
}
