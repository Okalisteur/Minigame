import { motion } from "framer-motion";

/**
 * Le "verdict" se rend en tamponnant. Au choix, le tampon arrive de
 * haut (grand, flou) et s'écrase avec un rebond, puis une onde d'encre
 * se propage : cyan si le verdict est juste, rose sinon.
 * `result` : null avant le choix, "juste" ou "faux" pour le tampon choisi.
 */
export default function VerdictStamp({ label, onClick, stamped, chosen, result }) {
  const bon = result === "juste";
  const couleur = bon ? "#35cdf3" : "#ff5d86";

  return (
    <div className="relative">
      {chosen && stamped && (
        <motion.span
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: couleur }}
        />
      )}
      <motion.button
        type="button"
        onClick={onClick}
        disabled={stamped}
        whileHover={!stamped ? { scale: 1.06, borderColor: "#35cdf3", color: "#bfeaff" } : {}}
        whileTap={!stamped ? { scale: 0.88, rotate: -8 } : {}}
        animate={
          stamped && chosen
            ? { scale: [2.1, 0.9, 1], rotate: [-18, 4, -5], opacity: [0, 1, 1], filter: ["blur(6px)", "blur(0px)", "blur(0px)"] }
            : stamped
              ? { opacity: 0.3 }
              : {}
        }
        transition={{ duration: 0.45, ease: [0.2, 0.9, 0.3, 1] }}
        className={[
          "relative w-28 h-28 md:w-32 md:h-32 rounded-full border-[3px] border-[#3f6190] text-[#7f9cc4]",
          "grid place-items-center text-center px-3 uppercase tracking-wide leading-tight",
          "bg-[#0d2750]/40 backdrop-blur-sm cursor-pointer disabled:cursor-default",
        ].join(" ")}
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: "0.78rem",
          ...(chosen && stamped
            ? {
                borderColor: couleur,
                color: couleur,
                background: `${couleur}1f`,
                boxShadow: `0 0 34px -6px ${couleur}99`,
              }
            : {}),
        }}
      >
        {label}
      </motion.button>
    </div>
  );
}
