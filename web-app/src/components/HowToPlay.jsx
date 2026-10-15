import { motion } from "framer-motion";

const ITEM = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** Panneau "Comment jouer ?" + encart "Conseil MIL" (colonne de droite). */
export default function HowToPlay({ conseil }) {
  return (
    <motion.aside
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
      className="flex flex-col gap-5 w-full"
    >
      <motion.div
        variants={ITEM}
        className="rounded-[28px] bg-white/70 backdrop-blur-xl p-5 border border-white shadow-[0_22px_44px_-28px_rgba(10,126,168,0.5)]"
      >
        <div className="flex items-center gap-3.5">
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5 }}
            className="w-12 h-12 rounded-2xl grid place-items-center text-xl bg-[linear-gradient(135deg,#2bd0f8,#0aa8e2)] shadow-[0_10px_20px_-8px_rgba(10,159,209,0.6)]"
          >
            💡
          </motion.div>
          <div>
            <p className="font-display font-bold text-ciel-ink text-[15px] leading-tight">Comment jouer ?</p>
            <p className="text-xs text-ciel-soft mt-0.5">Observe, réfléchis, puis réponds.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <motion.div
            variants={ITEM}
            whileHover={{ x: -4 }}
            className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-[0_8px_20px_-14px_rgba(10,100,140,0.5)]"
          >
            <span className="w-9 h-9 rounded-xl bg-[#ffe9ee] text-alerte grid place-items-center font-bold text-sm">←</span>
            <div>
              <p className="font-bold text-[13px] text-ciel-ink">Vers la gauche</p>
              <p className="text-[11px] text-ciel-soft">L'affirmation est fausse.</p>
            </div>
          </motion.div>
          <motion.div
            variants={ITEM}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-[0_8px_20px_-14px_rgba(10,100,140,0.5)]"
          >
            <span className="w-9 h-9 rounded-xl bg-ravinala-100 text-ravinala-700 grid place-items-center font-bold text-sm">→</span>
            <div>
              <p className="font-bold text-[13px] text-ciel-ink">Vers la droite</p>
              <p className="text-[11px] text-ciel-soft">L'affirmation est vraie.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={ITEM}
        className="rounded-[26px] bg-white/55 backdrop-blur-xl p-5 border border-white/80"
      >
        <p className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-aqua-700">Conseil MIL</p>
        <motion.p
          key={conseil}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[13px] text-ciel-soft mt-2.5 leading-relaxed"
        >
          {conseil}
        </motion.p>
      </motion.div>
    </motion.aside>
  );
}
