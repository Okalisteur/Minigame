import { motion } from "framer-motion";

/**
 * Indice épinglé au dossier — une note de papier crème punaisée. Elle
 * "tombe" depuis le haut et se plante avec un petit rebond de la
 * punaise, pour que repérer un indice ait un vrai poids physique.
 */
export default function ClueChip({ texte, rotation = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -46, scale: 1.25, rotate: rotation * 3 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      exit={{ opacity: 0, scale: 0.6, y: -20 }}
      transition={{ type: "spring", stiffness: 340, damping: 16 }}
      className="relative max-w-[260px] text-[#2a2115] text-[15px] leading-snug px-4 py-3 rounded-[3px] shadow-[0_14px_24px_-10px_rgba(0,0,0,0.65)] bg-[linear-gradient(180deg,#f7f0de,#efe5c9)]"
      style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 12 }}
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe58a,#c9a227_60%,#8a6d10)] shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
      />
      « {texte} »
    </motion.div>
  );
}
