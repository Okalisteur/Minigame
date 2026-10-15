import { motion } from "framer-motion";

/**
 * Révèle une phrase mot par mot avec un léger fondu + montée.
 * Pourquoi mot par mot (pas lettre par lettre) : lisible sans fatigue —
 * la lecture lettre par lettre ralentit la compréhension et frustre ;
 * le mot est la plus petite unité que le cerveau traite d'un coup.
 */
export default function RevealText({ text, className = "", delay = 0, wordDelay = 0.09 }) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: delay + i * wordDelay, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.28em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}
