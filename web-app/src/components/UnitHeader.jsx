import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

/**
 * Carte d'en-tête de l'unité : étiquette, titre, consigne, pastille de
 * progression (pourcentage qui grimpe) et barre segmentée fine.
 * `done` = nombre de cartes déjà traitées ; `current` = numéro (1-based)
 * de la carte affichée.
 */
export default function UnitHeader({
  unite = 1,
  emoji = "📦",
  titre,
  description,
  total,
  done,
  current,
  termine = false,
  className = "",
}) {
  const percent = Math.round((done / total) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "rounded-[30px] bg-white/80 backdrop-blur-xl p-6 sm:p-7 border border-white",
        "shadow-[0_26px_50px_-28px_rgba(10,126,168,0.5)]",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-aqua-700 bg-aqua-100 px-3 py-1.5 rounded-full">
            <span className="text-xs">{emoji}</span>
            Unité {unite}
          </span>
          <h1 className="font-display font-extrabold text-ciel-ink text-[1.75rem] sm:text-[2rem] leading-tight mt-3">
            {titre}
          </h1>
          <p className="text-[13px] text-ciel-soft mt-1.5 leading-relaxed">{description}</p>
        </div>

        <motion.div
          key={percent}
          initial={{ scale: 0.88 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 14 }}
          className="shrink-0 w-[84px] h-[72px] sm:w-[92px] sm:h-[78px] rounded-[22px] grid place-content-center text-center text-white bg-[linear-gradient(135deg,#2bd0f8,#0a9fd1)] shadow-[0_14px_28px_-10px_rgba(10,159,209,0.6)]"
        >
          <span className="font-display font-extrabold text-xl leading-none">
            <AnimatedNumber value={percent} />%
          </span>
          <span className="font-mono text-[7px] tracking-[0.16em] uppercase opacity-80 mt-1">
            Progression
          </span>
        </motion.div>
      </div>

      {/* Barre segmentée : un segment par carte */}
      <div className="flex gap-2 mt-6" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-[#e3ebf2] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#2f6bdc,#1ab6ee)]"
              initial={{ width: "0%" }}
              animate={{ width: i < done ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ciel-soft">
          Carte {Math.min(current, total)} sur {total}
        </span>
        <span className="flex items-center gap-2 text-xs text-ciel-soft font-medium">
          <span
            className={[
              "w-2 h-2 rounded-full",
              termine ? "bg-ravinala" : "bg-aqua-500 mil-pulse-dot",
            ].join(" ")}
          />
          {termine ? "Terminé" : "En cours"}
        </span>
      </div>
    </motion.section>
  );
}
