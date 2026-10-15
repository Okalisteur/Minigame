import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import PostCard from "../components/PostCard";
import AquaBackdrop from "../components/AquaBackdrop";
import TopBar from "../components/TopBar";
import UnitHeader from "../components/UnitHeader";
import HowToPlay from "../components/HowToPlay";
import Celebration from "../components/Celebration";
import Maky from "../components/Maky";
import Button from "../components/Button";

// Transforme les segments **entourés d'astérisques** en <strong> — permet
// de mettre en avant l'info clé de chaque explication sans dupliquer le texte.
function withBold(text) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-encre">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

// Notions de base du MIL — vrai ou faux, avec l'explication qui donne
// la vraie définition derrière chaque affirmation.
const AFFIRMATIONS = [
  {
    icone: "🧭",
    categorie: "Définition",
    enonce: "Le MIL, ça veut dire seulement « savoir utiliser un ordinateur ».",
    vrai: false,
    explication:
      "**MIL = Maîtrise de l'Information et des Médias.** C'est la capacité à trouver, comprendre, analyser et utiliser l'information de façon critique — pas une compétence technique sur les outils.",
    conseil:
      "Ne réponds pas uniquement avec ton intuition. Cherche le mot important dans l'affirmation et demande-toi s'il est toujours vrai.",
  },
  {
    icone: "📰",
    categorie: "Info vs opinion",
    enonce: "Une information vérifiable et une opinion personnelle, ce n'est pas la même chose.",
    vrai: true,
    explication:
      "**Un fait peut se vérifier avec des preuves.** Une opinion exprime un point de vue — elle peut être partagée honnêtement, mais elle ne « prouve » rien en soi.",
    conseil:
      "Demande-toi : peut-on prouver cette phrase avec un document, un chiffre ou un témoin ? Si oui, c'est un fait.",
  },
  {
    icone: "🔍",
    categorie: "Source fiable",
    enonce: "Une source est fiable dès qu'elle a beaucoup d'abonnés.",
    vrai: false,
    explication:
      "**La popularité ne garantit rien.** Une source fiable s'identifie clairement, cite d'où viennent ses informations et peut être recoupée avec d'autres sources indépendantes.",
    conseil:
      "Regarde qui parle, d'où vient l'info et si d'autres sources la confirment — pas le nombre d'abonnés.",
  },
  {
    icone: "🎭",
    categorie: "Désinformation",
    enonce: "Désinformation et mésinformation, c'est exactement pareil.",
    vrai: false,
    explication:
      "La désinformation est diffusée volontairement pour tromper. La mésinformation, c'est partager une fausse info sans savoir qu'elle est fausse — **l'intention change tout.**",
    conseil:
      "Le mot clé ici, c'est l'intention : la personne sait-elle que c'est faux quand elle le partage ?",
  },
  {
    icone: "🖼️",
    categorie: "Images & vidéos",
    enonce: "Une photo authentique, non retouchée, peut quand même induire en erreur.",
    vrai: true,
    explication:
      "Une vraie image sortie de son contexte (mauvaise date, mauvais lieu, mauvaise légende) **trompe autant qu'un montage** : le problème n'est pas toujours l'image elle-même.",
    conseil:
      "Une image peut être vraie et trompeuse à la fois. Pense à la date, au lieu et à la légende.",
  },
  {
    icone: "🤔",
    categorie: "Esprit critique",
    enonce: "Douter d'une information avant d'y croire, c'est être parano.",
    vrai: false,
    explication:
      "Douter n'est pas rejeter en bloc : c'est se donner le temps de vérifier avant de croire ou de partager. **C'est la base même de l'esprit critique.**",
    conseil:
      "Méfie-toi des mots extrêmes (« parano », « toujours », « jamais ») : ils cachent souvent une exagération.",
  },
  {
    icone: "📢",
    categorie: "Portée du MIL",
    enonce: "Le MIL sert seulement à repérer les fausses infos dans les journaux.",
    vrai: false,
    explication:
      "**Le MIL s'applique partout** : publicités, messages privés, réseaux sociaux, discussions du quotidien. Dès qu'une information circule, l'esprit critique s'applique.",
    conseil:
      "Repère le mot « seulement » : il restreint beaucoup. Le MIL est-il vraiment limité à ça ?",
  },
  {
    icone: "⏱️",
    categorie: "Réflexe utile",
    enonce: "Vérifier une information prend souvent moins d'une minute.",
    vrai: true,
    explication:
      "Recouper une info — chercher la source, comparer avec d'autres contenus — **prend souvent très peu de temps**, bien moins que les conséquences de partager une fausse info.",
    conseil:
      "Compare le temps de vérification avec le temps qu'une rumeur met à se propager.",
  },
];

const EASE = [0.16, 1, 0.3, 1];

export default function SwipeLesson({ onFinish, onBack, onSkip }) {
  const [index, setIndex] = useState(0);
  // phase : "jeu" (carte affichée) -> "sortie" (carte qui s'envole) -> "verdict"
  const [phase, setPhase] = useState("jeu");
  const [feedback, setFeedback] = useState(null); // { correct, explication, choix }
  const [dir, setDir] = useState("faux");
  const [bonnes, setBonnes] = useState(0);
  const [termine, setTermine] = useState(false);
  const dragX = useMotionValue(0);

  const total = AFFIRMATIONS.length;
  const affirmation = AFFIRMATIONS[index];
  const repondu = phase !== "jeu";

  const handleSwipe = useCallback(
    (choix) => {
      if (phase !== "jeu") return;
      const correct = (choix === "vrai") === affirmation.vrai;
      setDir(choix);
      setFeedback({ correct, explication: affirmation.explication, choix });
      if (correct) setBonnes((b) => b + 1);
      setPhase("sortie");
    },
    [phase, affirmation]
  );

  const suivante = useCallback(() => {
    setFeedback(null);
    setPhase("jeu");
    dragX.set(0);
    if (index < total - 1) setIndex((i) => i + 1);
    else setTermine(true);
  }, [index, total, dragX]);

  function revoir() {
    // On retire le point gagné pour ne pas le compter deux fois
    if (feedback?.correct) setBonnes((b) => Math.max(0, b - 1));
    setFeedback(null);
    setPhase("jeu");
    dragX.set(0);
  }

  function retour() {
    if (index > 0 && phase === "jeu") {
      setIndex((i) => i - 1);
    } else if (phase !== "jeu") {
      revoir();
    } else {
      onBack?.();
    }
  }

  // Clavier : ← faux, → vrai ; Entrée / → pour passer au verdict suivant
  useEffect(() => {
    function onKey(e) {
      if (termine) return;
      if (phase === "jeu") {
        if (e.key === "ArrowLeft") handleSwipe("faux");
        if (e.key === "ArrowRight") handleSwipe("vrai");
      } else if (phase === "verdict" && (e.key === "Enter" || e.key === "ArrowRight")) {
        suivante();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, termine, handleSwipe, suivante]);

  // Boutons ✕ / ✓ qui réagissent au glissement
  const fauxScale = useTransform(dragX, [-160, 0], [1.22, 1]);
  const vraiScale = useTransform(dragX, [0, 160], [1, 1.22]);

  // Cartes visibles : la courante + 2 derrières. Une fois répondu, la
  // courante sort (animation d'envol) mais les suivantes restent en place.
  const pile = AFFIRMATIONS.slice(index, index + 3)
    .map((p, offset) => ({ p, offset }))
    .filter(({ offset }) => !(offset === 0 && repondu));

  const header = (
    <UnitHeader
      className="max-w-2xl mx-auto w-full"
      unite={1}
      emoji="📦"
      titre="Les bases du MIL"
      description="Analyse chaque affirmation et choisis si elle est vraie ou fausse."
      total={total}
      done={index + (phase === "verdict" ? 1 : 0)}
      current={index + 1}
      termine={termine}
    />
  );

  if (termine) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <AquaBackdrop />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <Celebration />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-center gap-4 text-center max-w-sm rounded-[32px] bg-white/80 backdrop-blur-xl border border-white p-8 shadow-[0_30px_60px_-30px_rgba(10,126,168,0.55)]"
          >
            <Maky size={100} mood="bravo" />
            <h1 className="font-display font-extrabold text-2xl text-ciel-ink">Bases du MIL acquises !</h1>
            <p className="text-ciel-soft text-sm">
              Tu connais maintenant les notions clés du MIL. Direction les techniques de manipulation.
            </p>
            <div className="flex gap-3 font-mono text-sm mt-1">
              <span className="bg-aqua-100 text-aqua-700 px-3 py-1.5 rounded-full">
                {bonnes}/{total} ✓
              </span>
              <span className="bg-kabary-100 text-kabary-700 px-3 py-1.5 rounded-full">+{bonnes * 5} 💎</span>
            </div>
            <Button variant="aqua" onClick={onFinish} className="mt-3">
              Continuer →
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AquaBackdrop />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-14 flex flex-col gap-6">
        <TopBar onBack={retour} onSkip={onSkip ?? suivante} />
        {header}

        {/* ---------- Phase de jeu : carte + aide ---------- */}
        {phase !== "verdict" && (
          <div className="grid lg:grid-cols-[minmax(0,380px)_minmax(0,320px)] gap-8 lg:gap-12 justify-center items-start mt-2">
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-[380px] h-[330px] sm:h-[350px]">
                <AnimatePresence custom={dir} onExitComplete={() => phase === "sortie" && setPhase("verdict")}>
                  {pile.map(({ p, offset }) => (
                    <PostCard
                      key={index + offset}
                      post={p}
                      active={offset === 0}
                      stackIndex={offset}
                      dragX={dragX}
                      dir={dir}
                      onSwipe={handleSwipe}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Boutons ✕ / pastille / ✓ */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
                className="flex items-center gap-6 mt-9"
              >
                <motion.button
                  type="button"
                  aria-label="Faux"
                  onClick={() => handleSwipe("faux")}
                  style={{ scale: fauxScale }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-white grid place-items-center text-alerte text-xl font-bold cursor-pointer shadow-[0_0_0_5px_rgba(255,62,112,0.12),0_16px_26px_-10px_rgba(255,62,112,0.55)]"
                >
                  ✕
                </motion.button>
                <div className="text-center rounded-full bg-white/85 backdrop-blur px-5 py-2.5 shadow-[0_10px_20px_-14px_rgba(10,100,140,0.5)]">
                  <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-ciel-soft">Choisis</p>
                  <p className="font-display font-bold text-[13px] text-ciel-ink leading-tight">Faux ou vrai</p>
                </div>
                <motion.button
                  type="button"
                  aria-label="Vrai"
                  onClick={() => handleSwipe("vrai")}
                  style={{ scale: vraiScale }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-white grid place-items-center text-ravinala-700 text-xl font-bold cursor-pointer shadow-[0_0_0_5px_rgba(20,199,140,0.14),0_16px_26px_-10px_rgba(20,199,140,0.55)]"
                >
                  ✓
                </motion.button>
              </motion.div>
            </div>

            <HowToPlay conseil={affirmation.conseil} />
          </div>
        )}

        {/* ---------- Phase verdict ---------- */}
        <AnimatePresence>
          {phase === "verdict" && feedback && (
            <motion.div
              key="verdict"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center mt-4"
            >
              {/* Pastille résultat : ressort + onde */}
              <div className="relative">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0.55 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className={[
                    "absolute inset-0 rounded-full",
                    feedback.correct ? "bg-ravinala" : "bg-[#ff6a2b]",
                  ].join(" ")}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14 }}
                  className={[
                    "relative w-[76px] h-[76px] rounded-full grid place-items-center text-white text-4xl font-bold",
                    feedback.correct
                      ? "bg-[linear-gradient(135deg,#2ee6a6,#0fb383)] shadow-[0_16px_30px_-10px_rgba(15,179,131,0.7)]"
                      : "bg-[linear-gradient(135deg,#ff9a3d,#ff4d2e)] shadow-[0_16px_30px_-10px_rgba(255,77,46,0.7)]",
                  ].join(" ")}
                >
                  {feedback.correct ? "✓" : "✕"}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                className={[
                  "mt-6 w-full max-w-md rounded-[26px] px-7 py-6 text-center border",
                  feedback.correct
                    ? "bg-[#d9f8ec] border-[#b6efd9] shadow-[0_24px_44px_-26px_rgba(15,179,131,0.6)]"
                    : "bg-[#ffdfe6] border-[#ffc9d6] shadow-[0_24px_44px_-26px_rgba(255,62,112,0.55)]",
                ].join(" ")}
              >
                <p className="font-display font-extrabold text-ciel-ink text-lg">
                  {feedback.correct ? "Bon réflexe !" : "Pas tout à fait"}
                </p>
                <p className="text-[13px] text-ciel-ink/80 leading-relaxed mt-2.5">
                  {withBold(feedback.explication)}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
                className="mt-6 w-full max-w-md flex flex-col gap-3"
              >
                <Button variant="aqua" onClick={suivante} className="w-full">
                  {index < total - 1 ? "Carte suivante →" : "Terminer →"}
                </Button>
                <Button variant="outline" onClick={revoir} className="w-full">
                  ↺ Revoir cette carte
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
