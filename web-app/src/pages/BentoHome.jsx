import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import BentoCard from "../components/BentoCard";
import ProgressRing from "../components/ProgressRing";
import Maky from "../components/Maky";
import Button from "../components/Button";
import TutorialSpotlight from "../components/TutorialSpotlight";
import { nextIncomplete } from "../lib/progress";

const LESSONS = [
  {
    key: "defs",
    tone: "degrade",
    unite: "Unité 1",
    titre: "Les bases du MIL",
    desc: "Définitions et repères essentiels.",
    tutoTitre: "Commence ici",
    tutoMessage: "Cette première leçon pose les bases : appuie sur ce bouton pour démarrer.",
  },
  {
    key: "manip",
    tone: "kabary",
    unite: "Unité 2",
    titre: "Repérer la manipulation",
    desc: "Les techniques à connaître au quotidien.",
    tutoTitre: "Deuxième étape",
    tutoMessage: "Bravo ! Continue avec cette leçon sur les techniques de manipulation.",
  },
  {
    key: "fouille",
    tone: "ravinala",
    unite: "Unité 3",
    titre: "Fouille MIL",
    desc: "Un terrain à creuser, indice par indice.",
    tutoTitre: "Dernière étape",
    tutoMessage: "Presque fini ! Fouille le terrain pour débloquer les derniers repères.",
  },
];

export default function BentoHome({ progress, onOpenLesson, onResetTuto }) {
  const cardRefs = useRef({});
  const doneCount = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((doneCount / LESSONS.length) * 100);

  const tutorialKey = useMemo(() => nextIncomplete(progress), [progress]);
  const tutorialStep = LESSONS.findIndex((l) => l.key === tutorialKey);
  const tutorialLesson = tutorialStep >= 0 ? LESSONS[tutorialStep] : null;

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <header className="flex items-center justify-between px-6 md:px-10 py-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-2xl text-encre">Maky</span>
          <span className="font-mono text-[10px] uppercase tracking-widest bg-encre text-brume-50 px-2 py-1 rounded-full">
            MIL
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-encre-soft">
          <a href="#" className="hover:text-lavande transition-colors">Parcours</a>
          <a href="#" className="hover:text-lavande transition-colors">Défis</a>
          <a href="#" className="hover:text-lavande transition-colors">Classe</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={onResetTuto}
            className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-lavande-700 bg-lavande-100 hover:bg-lavande-100/70 px-3 py-2 rounded-full transition-colors"
          >
            <span aria-hidden="true">↺</span> Revoir le tuto
          </button>
          <Button variant="primary" className="!py-2.5 !px-5 !text-xs">Se connecter</Button>
        </div>
      </header>

      {/* Bloc titre */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 mb-8 flex items-center justify-between gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-3xl md:text-4xl text-encre"
          >
            Salut ! On continue ?
          </motion.h1>
          <p className="text-encre-soft mt-1">
            {doneCount === LESSONS.length
              ? "Les 3 apprentissages sont terminés, bravo !"
              : "Ton tableau de bord MIL du jour."}
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-center shrink-0">
          <ProgressRing percent={percent} size={64} stroke={6} color="var(--color-lavande)" />
          <span className="font-mono text-[10px] text-encre-soft mt-1">{doneCount}/3</span>
        </div>
      </div>

      {/* Grille bento */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 pb-24 grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-5 [grid-auto-flow:dense]">
        {/* Les 3 cartes de lancement des méthodes d'apprentissage */}
        {LESSONS.map((lesson, i) => {
          const isDone = progress[lesson.key];
          return (
            <BentoCard
              key={lesson.key}
              ref={(el) => (cardRefs.current[lesson.key] = el)}
              tone={lesson.tone}
              span={i === 0 ? "col-span-2 row-span-2" : "col-span-2 md:col-span-1 row-span-1"}
              delay={i * 0.05}
              onClick={() => onOpenLesson(lesson.key)}
              className="!cursor-pointer"
            >
              <div className="flex flex-col justify-between h-full w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest opacity-80">
                      {lesson.unite}
                    </p>
                    <h2 className="font-display font-bold text-lg md:text-xl mt-1 leading-tight">
                      {lesson.titre}
                    </h2>
                    {i === 0 && (
                      <p className="text-sm opacity-80 mt-1">{lesson.desc}</p>
                    )}
                  </div>
                  {isDone && (
                    <span className="text-xl bg-white/70 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between">
                  {i === 0 ? <Maky size={56} bob={false} /> : <span />}
                  <Button
                    variant="ghost"
                    className="!bg-white !text-lavande-700 !border-none !shadow-none !py-2 !px-4 !text-[11px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLesson(lesson.key);
                    }}
                  >
                    {isDone ? "Revoir →" : "Commencer →"}
                  </Button>
                </div>
              </div>
            </BentoCard>
          );
        })}

        {/* Série */}
        <BentoCard tone="lavande" delay={0.2}>
          <span className="text-3xl">🔥</span>
          <div>
            <p className="font-mono text-3xl font-bold tabular-nums">7</p>
            <p className="text-xs font-medium opacity-70">jours de série</p>
          </div>
        </BentoCard>

        {/* Défi du jour — micro-leçon chronométrée */}
        <BentoCard tone="alerte" span="col-span-2" delay={0.25}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">Défi du jour</p>
              <h3 className="font-display font-bold text-lg mt-1">La rumeur du marché</h3>
              <p className="text-xs opacity-70 mt-1">3 questions rapides</p>
            </div>
            <span className="font-mono text-xs bg-white/60 px-3 py-1.5 rounded-full">⏱ 3 min</span>
          </div>
        </BentoCard>

        {/* Citation kabary */}
        <BentoCard tone="cyan" delay={0.3}>
          <span className="text-2xl">🗣️</span>
          <p className="font-display font-medium text-sm leading-snug">
            « Ny teny nefa tsy azo tarihina intsony » — une parole lâchée ne se rattrape plus.
          </p>
        </BentoCard>
      </main>

      {tutorialLesson && (
        <TutorialSpotlight
          targetsRef={cardRefs}
          targetKey={tutorialLesson.key}
          step={tutorialStep}
          totalSteps={LESSONS.length}
          title={tutorialLesson.tutoTitre}
          message={tutorialLesson.tutoMessage}
        />
      )}
    </div>
  );
}
