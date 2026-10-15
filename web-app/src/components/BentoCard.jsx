import { forwardRef } from "react";
import { motion } from "framer-motion";
import CardDecor from "./CardDecor";

const TONES = {
  blanc: { bg: "var(--color-carte)", text: "var(--color-encre)", shadow: "var(--shadow-soft)" },
  degrade: { bg: "var(--gradient-hero)", text: "#ffffff", shadow: "var(--shadow-glow-lavande)" },
  lavande: { bg: "var(--color-lavande-100)", text: "var(--color-encre)", shadow: "var(--shadow-soft)" },
  kabary: { bg: "var(--color-kabary-100)", text: "var(--color-kabary-700)", shadow: "var(--shadow-soft)" },
  ravinala: { bg: "var(--color-ravinala-100)", text: "var(--color-ravinala-700)", shadow: "var(--shadow-soft)" },
  alerte: { bg: "var(--color-alerte-100)", text: "var(--color-alerte)", shadow: "var(--shadow-soft)" },
  cyan: { bg: "var(--color-cyan-100)", text: "var(--color-encre)", shadow: "var(--shadow-soft)" },
};

/**
 * Cellule de la grille bento. `delay` échelonne l'entrée (effet cascade,
 * agréable et pas surchargé — un seul mouvement orchestré au chargement).
 *
 * La ref pointe directement sur cet élément racine (pas un enfant interne
 * avec du padding) : c'est important pour TutorialSpotlight, qui calcule
 * son anneau lumineux à partir de cette ref et doit matcher exactement le
 * bord réel et le rayon de la carte.
 */
const BentoCard = forwardRef(function BentoCard(
  { children, tone = "blanc", span = "", delay = 0, onClick, className = "", decor = true },
  ref
) {
  const t = TONES[tone];

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      style={{
        background: t.bg,
        color: t.text,
        borderRadius: "var(--radius-bento)",
        boxShadow: t.shadow,
      }}
      className={[
        "relative p-6 flex flex-col justify-between overflow-hidden cursor-default",
        "transition-shadow duration-300",
        onClick ? "cursor-pointer" : "",
        span,
        className,
      ].join(" ")}
    >
      {decor && <CardDecor variant={tone === "degrade" ? "dark" : "light"} />}
      {children}
    </motion.div>
  );
});

export default BentoCard;
