import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SegmentedProgress from "../components/SegmentedProgress";
import AnswerOption from "../components/AnswerOption";
import Celebration from "../components/Celebration";
import Maky from "../components/Maky";
import Button from "../components/Button";

const ETAPES = [
  {
    prompt: "Ce titre te semble-t-il fiable ?",
    // Élément isolé en gras (effet Von Restorff) : l'œil va direct au bon endroit
    artefact: (
      <>
        « Ce fruit <mark className="bg-kabary-100 px-1 rounded">GUÉRIT</mark>{" "}
        le diabète, les médecins vous cachent la vérité »
      </>
    ),
    options: [
      { label: "Oui, ça a l'air sérieux", correcte: false },
      { label: "Non, c'est une alerte classique", correcte: true },
      { label: "Je ne sais pas encore", correcte: false },
    ],
    explication:
      "Un mot en majuscules + « les médecins vous cachent » = deux signaux classiques de désinformation santé : émotion forte, et accusation vague sans preuve.",
  },
  {
    prompt: "Avant de partager, le premier réflexe utile est de vérifier…",
    artefact: <>Un ami t'envoie une info choquante sur WhatsApp.</>,
    options: [
      { label: "Le nombre de partages déjà reçus", correcte: false },
      { label: "Qui est la source d'origine", correcte: true },
      { label: "Si la photo est jolie", correcte: false },
    ],
    explication:
      "Le nombre de partages ne dit rien sur la véracité — une rumeur se partage souvent plus vite qu'un fait vérifié.",
  },
  {
    prompt: "Cette image virale te semble retouchée. Que fais-tu ?",
    artefact: <>Une photo « preuve » d'un événement récent, très nette et parfaite.</>,
    options: [
      { label: "Je la partage, elle est impressionnante", correcte: false },
      { label: "Je cherche si d'autres médias la publient", correcte: true },
      { label: "Je l'ignore complètement", correcte: false },
    ],
    explication:
      "Chercher des recoupements (autres sources, recherche d'image inversée) prend 30 secondes et évite de relayer un montage.",
  },
];

export default function Lesson({ onFinish }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [termine, setTermine] = useState(false);

  const etape = ETAPES[step];
  const aRepondu = selected !== null;

  function repondre(opt, i) {
    if (aRepondu) return;
    setSelected(i);
  }

  function suivant() {
    if (step < ETAPES.length - 1) {
      setStep((s) => s + 1);
      setSelected(null);
    } else {
      setTermine(true);
    }
  }

  if (termine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brume relative px-6">
        <Celebration />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 text-center max-w-sm"
        >
          <Maky size={100} mood="bravo" />
          <h1 className="font-display font-bold text-2xl text-encre">Première leçon terminée !</h1>
          <p className="text-encre-soft">
            Tu viens de gagner un premier réflexe de vérification. On continue demain ?
          </p>
          <div className="flex gap-3 font-mono text-sm mt-2">
            <span className="bg-kabary-100 text-kabary-700 px-3 py-1.5 rounded-full">+30 💎</span>
            <span className="bg-ravinala-100 text-ravinala-700 px-3 py-1.5 rounded-full">🔥 série : 1</span>
          </div>
          <Button variant="primary" onClick={onFinish} className="mt-4">
            Voir mon tableau de bord →
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brume flex flex-col">
      <div className="max-w-lg w-full mx-auto px-6 pt-8">
        <SegmentedProgress total={ETAPES.length} current={step + (aRepondu ? 1 : 0)} />
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg w-full"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-lavande-700 mb-2">
              Question {step + 1} / {ETAPES.length}
            </p>
            <h1 className="font-display font-bold text-2xl text-encre mb-4 leading-snug">
              {etape.prompt}
            </h1>

            <div className="bg-white rounded-3xl p-5 mb-6 shadow-[var(--shadow-soft)] text-encre-soft italic">
              {etape.artefact}
            </div>

            <div className="flex flex-col gap-3">
              {etape.options.map((opt, i) => {
                let state = "neutre";
                if (aRepondu) {
                  if (i === selected) state = opt.correcte ? "correcte" : "incorrecte";
                  else if (opt.correcte) state = "correcte";
                  else state = "estompe";
                }
                return (
                  <AnswerOption
                    key={i}
                    label={opt.label}
                    state={state}
                    disabled={aRepondu}
                    onClick={() => repondre(opt, i)}
                  />
                );
              })}
            </div>

            <AnimatePresence>
              {aRepondu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 overflow-hidden"
                >
                  <div className="bg-lavande-100 rounded-2xl p-4 text-sm text-encre">
                    {etape.explication}
                  </div>
                  <Button variant="primary" onClick={suivant} className="mt-4 w-full">
                    {step < ETAPES.length - 1 ? "Continuer →" : "Terminer →"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
