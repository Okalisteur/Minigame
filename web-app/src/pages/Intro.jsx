import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "../components/RevealText";
import Maky from "../components/Maky";
import Button from "../components/Button";

const LIGNES = [
  "Chaque jour, des milliers d'informations défilent sous tes yeux.",
  "Certaines sont vraies. D'autres sont fabriquées pour te tromper.",
  "Distinguer les deux, ce n'est pas un don. C'est une compétence.",
  "On va l'entraîner ensemble — sans jargon, à ton rythme.",
];

const DUREE_PAR_LIGNE = 3400; // ms — assez pour lire sans presser, sans traîner

export default function Intro({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [termine, setTermine] = useState(false);

  useEffect(() => {
    if (termine) return;
    if (index >= LIGNES.length - 1) {
      const t = setTimeout(() => setTermine(true), DUREE_PAR_LIGNE);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), DUREE_PAR_LIGNE);
    return () => clearTimeout(t);
  }, [index, termine]);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-encre">
      {/* Fond dégradé animé, mouvement lent et ample — ambiance, jamais distrayant */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #2f7ef255, transparent 55%), radial-gradient(circle at 70% 70%, #1fd6d64d, transparent 55%)",
        }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Passer l'intro — l'autonomie prime toujours sur le récit */}
      <button
        onClick={() => onFinish?.()}
        className="absolute top-6 right-6 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
      >
        Passer →
      </button>

      <AnimatePresence mode="wait">
        {!termine ? (
          <motion.div
            key={index}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}
            className="max-w-xl px-8 text-center"
          >
            <RevealText
              text={LIGNES[index]}
              className="font-display font-semibold text-2xl md:text-4xl text-white leading-snug"
            />
          </motion.div>
        ) : (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 px-8 text-center"
          >
            <Maky size={110} />
            <h1 className="font-display font-bold text-3xl text-white">
              Je m'appelle Maky.
            </h1>
            <p className="text-white/70 max-w-sm">
              Je vais t'apprendre à repérer ce qui cloche dans une info — en
              quelques minutes par jour.
            </p>
            <Button variant="primary" onClick={() => onFinish?.()}>
              Commencer →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Points de progression — repère discret, pas une jauge anxiogène */}
      {!termine && (
        <div className="absolute bottom-10 flex gap-2">
          {LIGNES.map((_, i) => (
            <span
              key={i}
              className={[
                "w-2 h-2 rounded-full transition-colors duration-300",
                i === index ? "bg-white" : "bg-white/25",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
