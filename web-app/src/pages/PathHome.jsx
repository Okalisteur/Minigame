import { motion } from "framer-motion";
import LessonNode from "../components/LessonNode";
import StatPill from "../components/StatPill";
import Maky from "../components/Maky";
import Card from "../components/Card";

const UNITE = {
  title: "Unité 1 — Repérer une rumeur",
  nodes: [
    { label: "Qu'est-ce qu'une source ?", icon: "source", status: "complete" },
    { label: "Titre choc, info creuse", icon: "loupe", status: "complete" },
    { label: "Une image ment aussi", icon: "image", status: "disponible", isCurrent: true },
    { label: "Chiffres trompeurs", icon: "chiffre", status: "verrouille" },
    { label: "Avant de partager", icon: "reseaux", status: "verrouille" },
    { label: "Défi : la rumeur du marché", icon: "rumeur", status: "verrouille" },
  ],
};

// Décalage horizontal alterné pour dessiner le sentier en lacets
const OFFSETS = [0, 70, 110, 70, 0, -70];

export default function PathHome() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Collines de fond, silhouettes douces en dégradé de brume */}
      <div className="absolute inset-0 -z-10">
        <svg viewBox="0 0 400 900" preserveAspectRatio="none" className="w-full h-full">
          <rect width="400" height="900" fill="var(--color-brume)" />
          <path d="M0 260 Q100 220 200 260 T400 250 V900 H0 Z" fill="var(--color-brume-200)" opacity="0.6" />
          <path d="M0 420 Q120 380 220 420 T400 410 V900 H0 Z" fill="var(--color-ravinala-100)" opacity="0.5" />
          <path d="M0 620 Q140 580 240 620 T400 610 V900 H0 Z" fill="var(--color-brume-50)" />
        </svg>
      </div>

      {/* Nuages flottants d'ambiance */}
      {[{ top: 60, left: "10%", d: 14 }, { top: 140, left: "70%", d: 18 }, { top: 40, left: "45%", d: 11 }].map(
        (c, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-70"
            style={{ top: c.top, left: c.left }}
            animate={{ x: [0, 14, 0] }}
            transition={{ duration: c.d, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.div>
        )
      )}

      {/* En-tête : stats de gamification */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-brume/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Maky size={40} bob={false} />
          <span className="font-display font-bold text-lg text-encre">Maky</span>
        </div>
        <div className="flex items-center gap-2">
          <StatPill icon="🔥" value={7} tone="kabary" />
          <StatPill icon="💎" value={240} tone="lavande" />
          <StatPill icon="❤️" value={5} tone="alerte" />
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pb-24 pt-6">
        <Card className="mb-10 text-center">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-corail mb-1">
            Unité 1
          </p>
          <h1 className="font-display text-xl font-bold text-encre">{UNITE.title}</h1>
        </Card>

        <div className="flex flex-col items-center gap-14">
          {UNITE.nodes.map((n, i) => (
            <div key={i} style={{ transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)` }}>
              <LessonNode {...n} onClick={() => {}} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
