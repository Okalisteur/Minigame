import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Une motte de terre qu'on creuse en cliquant. Le petit délai de
 * "creusage" avant la révélation crée une attente courte — plus
 * mémorable qu'une carte d'info qui s'affiche d'un coup.
 */
export default function DirtMound({ dug, onDig }) {
  const [creusage, setCreusage] = useState(false);

  function handleClick() {
    if (dug || creusage) return;
    setCreusage(true);
    setTimeout(() => {
      setCreusage(false);
      onDig();
    }, 480);
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={dug}
      whileTap={!dug ? { scale: 0.94 } : {}}
      animate={creusage ? { x: [0, -5, 5, -4, 4, 0], y: [0, 2, -2, 1, 0] } : {}}
      transition={{ duration: 0.45 }}
      className="relative w-24 h-20 grid place-items-center select-none cursor-pointer disabled:cursor-default"
    >
      <AnimatePresence mode="wait">
        {!dug ? (
          <motion.div
            key="motte"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 grid place-items-center"
          >
            <div
              className="w-20 h-16 bg-gradient-to-b from-[#a9744f] to-[#7a5238] shadow-[var(--shadow-soft)]"
              style={{ borderRadius: "var(--radius-blob)" }}
            />
            <span className="absolute -top-2 text-xl">🌿</span>
            {creusage &&
              Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-[#7a5238] text-xs"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 70,
                    y: -20 - Math.random() * 30,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  •
                </motion.span>
              ))}
            {!creusage && <span className="absolute -bottom-1 text-lg">⛏️</span>}
          </motion.div>
        ) : (
          <motion.div
            key="trou"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-9 bg-[#5c3d29] rounded-[50%] mt-7"
            style={{ boxShadow: "inset 0 6px 10px rgba(0,0,0,0.35)" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
