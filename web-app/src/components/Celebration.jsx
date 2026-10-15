import { motion } from "framer-motion";

const EMOJIS = ["✨", "🎉", "💎", "🔥", "⭐"];

/**
 * Effet "pic final" (peak-end rule) : ce qu'on ressent à la toute fin
 * d'une expérience pèse plus lourd dans le souvenir que sa durée totale.
 * Une explosion brève et satisfaisante rend toute la leçon mémorable
 * en positif — sans notification culpabilisante le lendemain.
 */
export default function Celebration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const dist = 140 + Math.random() * 90;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 text-2xl"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist - 30,
              opacity: 0,
              scale: 1.1,
              rotate: Math.random() * 180,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            {EMOJIS[i % EMOJIS.length]}
          </motion.span>
        );
      })}
    </div>
  );
}
