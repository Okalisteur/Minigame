import { motion } from "framer-motion";
import Maky from "./Maky";

const ICONS = {
  loupe: "🔍",
  source: "📰",
  reseaux: "📱",
  rumeur: "🗣️",
  image: "🖼️",
  chiffre: "📊",
};

/**
 * Un "terrasse" du sentier — status: verrouillé / disponible / en_cours / complete
 */
export default function LessonNode({ label, icon = "loupe", status = "disponible", isCurrent = false, onClick }) {
  const locked = status === "verrouille";
  const done = status === "complete";

  const fill = done ? "var(--color-ravinala)" : locked ? "var(--color-brume-200)" : "var(--color-corail)";
  const shadowColor = done ? "#2f7a52" : locked ? "#c9d9d7" : "#f2704a";

  return (
    <div className="relative flex flex-col items-center gap-2">
      {isCurrent && (
        <motion.div
          className="absolute -top-24"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Maky size={72} bob={false} />
        </motion.div>
      )}

      <motion.button
        onClick={locked ? undefined : onClick}
        disabled={locked}
        whileHover={locked ? {} : { scale: 1.06 }}
        whileTap={locked ? {} : { y: 3 }}
        style={{
          background: fill,
          boxShadow: locked ? "none" : `0 6px 0 0 ${shadowColor}`,
          borderRadius: "var(--radius-node)",
        }}
        className={[
          "w-20 h-20 grid place-items-center text-3xl relative",
          locked ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        ].join(" ")}
      >
        {locked ? "🔒" : done ? "✓" : ICONS[icon] ?? "🔍"}
        {isCurrent && !locked && (
          <span className="absolute -inset-2 rounded-[inherit] border-2 border-dashed border-white/70 animate-pulse" />
        )}
      </motion.button>

      <span
        className={[
          "font-display text-xs font-semibold text-center max-w-[92px] leading-tight",
          locked ? "text-encre-soft/50" : "text-encre",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}
