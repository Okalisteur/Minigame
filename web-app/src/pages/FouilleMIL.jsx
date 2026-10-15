import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DirtMound from "../components/DirtMound";
import Celebration from "../components/Celebration";
import Maky from "../components/Maky";
import Button from "../components/Button";
import Card from "../components/Card";
import AquaBackdrop from "../components/AquaBackdrop";
import TopBar from "../components/TopBar";

// Chaque motte creusée révèle une information sur le MIL — un mélange
// de synthèse (liens avec les 2 premières parties) et d'infos nouvelles.
const MOTTES = [
  {
    id: "m1",
    icone: "🧠",
    titre: "Mésinfo vs désinfo",
    fait: "Une fausse info partagée sans le savoir, c'est de la mésinformation. La même fausse info partagée exprès pour tromper, c'est de la désinformation.",
  },
  {
    id: "m2",
    icone: "📶",
    titre: "Le contexte d'abord",
    fait: "Une info exacte présentée hors contexte — mauvaise date, mauvais lieu — peut induire en erreur autant qu'un mensonge complet.",
  },
  {
    id: "m3",
    icone: "🚨",
    titre: "L'urgence, un signal",
    fait: "Un message qui pousse à agir « tout de suite, sinon... » cherche souvent à empêcher de réfléchir. C'est un signal d'alerte à repérer partout, pas seulement dans les arnaques en ligne.",
  },
  {
    id: "m4",
    icone: "🗣️",
    titre: "L'autorité ne suffit pas",
    fait: "Se faire appeler « agent officiel », « docteur » ou « professeur » ne rend pas une affirmation automatiquement vraie — l'autorité invoquée doit aussi être vérifiable.",
  },
  {
    id: "m5",
    icone: "🤝",
    titre: "L'effet de groupe",
    fait: "« Tout le monde le fait déjà » rassure, mais ce n'est pas une preuve. Le nombre de personnes qui croient une chose ne la rend pas vraie.",
  },
  {
    id: "m6",
    icone: "⏳",
    titre: "Le bon réflexe",
    fait: "Avant de croire ou de partager, trois questions suffisent souvent : qui le dit, comment il le sait, et qu'est-ce que j'y gagne à le croire vite ?",
  },
];

export default function FouilleMIL({ onFinish, onBack, onSkip }) {
  const [creusees, setCreusees] = useState([]);
  const [actif, setActif] = useState(null);
  const [termine, setTermine] = useState(false);

  const total = MOTTES.length;
  const toutesCreusees = creusees.length === total;

  function creuser(motte) {
    if (creusees.includes(motte.id)) return;
    setCreusees((prev) => [...prev, motte.id]);
    setActif(motte);
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
          <h1 className="font-display font-bold text-2xl text-encre">Terrain fouillé !</h1>
          <p className="text-encre-soft">
            Tu as déterré {total} informations sur le MIL. Direction ton tableau de bord.
          </p>
          <div className="flex gap-3 font-mono text-sm mt-2">
            <span className="bg-kabary-100 text-kabary-700 px-3 py-1.5 rounded-full">
              +{total * 10} 💎
            </span>
          </div>
          <Button variant="primary" onClick={onFinish} className="mt-4">
            Voir mon tableau de bord →
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AquaBackdrop />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-5">
        <TopBar onBack={onBack} onSkip={onSkip} />
      </div>

      <header className="relative z-10 flex flex-col items-center gap-2 px-6 pt-8 pb-2 text-center">
        <Maky size={64} mood={actif ? "bravo" : "veille"} bob={false} />
        <h1 className="font-display font-bold text-xl text-encre">Fouille le terrain du MIL</h1>
        <p className="text-encre-soft text-sm max-w-xs">
          Touche une motte de terre pour la creuser et découvrir une nouvelle information.
        </p>
        <span className="font-mono text-xs text-aqua-700 bg-white/80 border border-white px-3 py-1 rounded-full mt-1">
          {creusees.length}/{total} fouillées
        </span>
      </header>

      <main className="relative z-10 max-w-md mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-x-2 gap-y-8 place-items-center py-6">
          {MOTTES.map((m) => (
            <DirtMound key={m.id} dug={creusees.includes(m.id)} onDig={() => creuser(m)} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {actif && (
            <motion.div
              key={actif.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="text-center">
                <span className="text-3xl">{actif.icone}</span>
                <p className="font-display font-bold text-encre mt-2 mb-1">{actif.titre}</p>
                <p className="text-sm text-encre-soft leading-relaxed">{actif.fait}</p>
              </Card>
              {toutesCreusees && (
                <Button variant="aqua" onClick={() => setTermine(true)} className="mt-5 w-full">
                  Terminer →
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
