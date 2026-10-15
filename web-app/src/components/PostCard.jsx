import { motion, useTransform } from "framer-motion";

/**
 * Carte "affirmation" qu'on juge en la faisant glisser — vrai ou faux.
 *
 * `dragX` est un MotionValue partagé avec la page : les boutons ✕ / ✓
 * en dessous s'agrandissent pendant le glissement. `custom` (la
 * direction du dernier choix) pilote l'animation de sortie, y compris
 * quand on répond avec un bouton ou le clavier plutôt qu'au doigt.
 */
const VARIANTS = {
  out: (dir) => ({
    x: dir === "vrai" ? 460 : -460,
    rotate: dir === "vrai" ? 18 : -18,
    opacity: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 0.9, 0.6] },
  }),
};

export default function PostCard({ post, onSwipe, active, stackIndex = 0, dragX, dir }) {
  const rotate = useTransform(dragX, [-220, 220], [-12, 12]);
  const vraiOpacity = useTransform(dragX, [30, 150], [0, 1]);
  const fauxOpacity = useTransform(dragX, [-150, -30], [1, 0]);

  function handleDragEnd(_, info) {
    if (info.offset.x > 120 || info.velocity.x > 600) onSwipe("vrai");
    else if (info.offset.x < -120 || info.velocity.x < -600) onSwipe("faux");
  }

  return (
    <motion.div
      custom={dir}
      variants={VARIANTS}
      style={{
        x: active ? dragX : 0,
        rotate: active ? rotate : 0,
        zIndex: 10 - stackIndex,
      }}
      initial={{ scale: 0.9, y: 40, opacity: 0 }}
      animate={{
        scale: 1 - stackIndex * 0.05,
        y: stackIndex * 14,
        opacity: stackIndex > 1 ? 0 : 1 - stackIndex * 0.35,
      }}
      exit="out"
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      drag={active ? "x" : false}
      dragSnapToOrigin
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      className="absolute inset-0 rounded-[30px] bg-white border border-white shadow-[0_34px_60px_-26px_rgba(10,100,140,0.5)] flex flex-col select-none touch-none cursor-grab overflow-hidden"
    >
      {/* Voile "vrai" — apparaît en glissant à droite */}
      <motion.div
        style={{ opacity: vraiOpacity }}
        className="absolute inset-0 z-10 bg-ravinala/15 border-4 border-ravinala rounded-[30px] grid place-items-center pointer-events-none"
      >
        <span className="font-display font-extrabold text-3xl text-ravinala-700 -rotate-12 border-4 border-ravinala-700 rounded-2xl px-5 py-1 bg-white/70">
          VRAI
        </span>
      </motion.div>
      {/* Voile "faux" — apparaît en glissant à gauche */}
      <motion.div
        style={{ opacity: fauxOpacity }}
        className="absolute inset-0 z-10 bg-alerte/15 border-4 border-alerte rounded-[30px] grid place-items-center pointer-events-none"
      >
        <span className="font-display font-extrabold text-3xl text-alerte rotate-12 border-4 border-alerte rounded-2xl px-5 py-1 bg-white/70">
          FAUX
        </span>
      </motion.div>

      {/* Léger reflet en haut, effet verre */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(214,244,253,0.7),transparent)] pointer-events-none" />

      {/* Catégorie */}
      <div className="relative flex items-center gap-3 px-6 pt-6">
        <div className="w-11 h-11 rounded-full bg-[#e6eefb] grid place-items-center text-lg shrink-0">
          {post.icone}
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#3d5fa8] bg-[#e4edfb] px-3 py-1.5 rounded-full">
          {post.categorie}
        </span>
      </div>

      {/* L'affirmation à juger */}
      <p className="relative flex-1 flex items-end px-6 pb-8 font-display font-bold text-[1.3rem] sm:text-[1.4rem] text-ciel-ink leading-snug">
        {/* espaces insécables dans les guillemets : « » ne reste jamais seul en bout de ligne */}
        <span className="text-balance">
          {post.enonce.replace(/« /g, "«\u00A0").replace(/ »/g, "\u00A0»")}
        </span>
      </p>

      {/* Pied de carte */}
      <div className="relative flex items-center justify-between px-6 py-4 border-t border-slate-100">
        <span className="text-[11px] text-ciel-soft font-medium">Glisse ou choisis : vrai ou faux ?</span>
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="mil-twinkle w-1 h-1 rounded-full bg-aqua-400"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
