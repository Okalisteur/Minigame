import { motion } from "framer-motion";

/**
 * Barre flottante en verre dépoli : Retour à gauche, identité Maky au
 * centre, Passer à droite. Les deux actions sont de vrais boutons
 * (focus clavier visible) et glissent légèrement au survol.
 */
export default function TopBar({ onBack, onSkip, backLabel = "Retour", skipLabel = "Passer" }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-between rounded-[28px] bg-white/75 backdrop-blur-xl px-5 py-3.5 shadow-[0_18px_40px_-22px_rgba(10,126,168,0.45)] border border-white"
    >
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 text-xs font-bold text-aqua-700 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-aqua-500"
      >
        <span className="w-8 h-8 rounded-full bg-aqua-100 grid place-items-center text-aqua-700 text-sm">
          ←
        </span>
        {backLabel}
      </motion.button>

      <div className="flex items-center gap-2">
        <span className="font-display font-extrabold text-ciel-ink text-[15px]">Maky</span>
        <span className="font-mono text-[9px] font-bold tracking-widest text-white bg-[linear-gradient(180deg,#2bd0f8,#0aa8e2)] px-2.5 py-1 rounded-full">
          MIL
        </span>
      </div>

      <motion.button
        type="button"
        onClick={onSkip}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2 text-xs font-bold text-aqua-700 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-aqua-500"
      >
        {skipLabel}
        <span className="text-sm">→</span>
      </motion.button>
    </motion.header>
  );
}
