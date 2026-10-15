import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import ClueChip from "../components/ClueChip";
import VerdictStamp from "../components/VerdictStamp";
import Maky from "../components/Maky";
import Button from "../components/Button";

// Le texte de l'affaire, découpé en segments. Les segments `clue` sont
// touchables ; le reste est du texte de liaison, non interactif.
// Ici : un faux appel/message d'un "agent officiel" — une manipulation
// de la vie de tous les jours, pas une info de presse.
const SEGMENTS = [
  { texte: "Bonjour, ici l'agence Mvola officielle.", clue: true, id: "c1", explication: "Se faire passer pour une autorité connue (banque, opérateur) pousse à obéir sans réfléchir. Un vrai agent ne demande jamais ton code secret." },
  { texte: " Nous avons détecté une activité suspecte sur votre compte : " },
  { texte: "il sera bloqué dans 10 minutes si vous ne confirmez pas votre code secret maintenant", clue: true, id: "c2", explication: "Le compte à rebours empêche de réfléchir calmement. Aucune institution sérieuse n'exige une action « immédiate » sous cette pression." },
  { texte: ". " },
  { texte: "Ne partagez cette information à personne, même pas à votre famille", clue: true, id: "c3", explication: "Isoler la victime pour l'empêcher de demander conseil est une technique classique : un proche pourrait justement repérer l'arnaque." },
  { texte: ", pour la sécurité de votre compte. " },
  { texte: "Plusieurs clients ont déjà réglé leur souci comme ça aujourd'hui", clue: true, id: "c4", explication: "Faire croire que « tout le monde le fait déjà » (preuve sociale) rassure à tort et pousse à suivre le mouvement sans vérifier." },
  { texte: "." },
];

const VERDICT_CORRECT = "manipulation";

const VERDICTS = [
  { id: "authentique", label: "Authentique" },
  { id: "verifier", label: "À vérifier" },
  { id: "manipulation", label: "Manipulation" },
];

const EASE = [0.16, 1, 0.3, 1];
const LABEL = { fontFamily: '"Space Mono", monospace' };
const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

/**
 * Passage suspect touchable. À la sélection, un surligneur cyan balaie
 * le texte de gauche à droite (background-size animé) et le soulignement
 * apparaît — l'indice est "marqué" au stylo, pas juste recoloré.
 */
function ClueSpan({ texte, selected, onToggle }) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-pressed={selected}
      className="cursor-pointer rounded-[3px] px-0.5 text-[#eef3fb] hover:bg-white/10 transition-colors"
      style={{
        backgroundImage: "linear-gradient(rgba(53,205,243,0.26), rgba(53,205,243,0.26))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: selected ? "100% 100%" : "0% 100%",
        transition: "background-size 0.5s cubic-bezier(0.16, 1, 0.3, 1), text-decoration-color 0.3s",
        textDecorationLine: "underline",
        textDecorationThickness: "2px",
        textUnderlineOffset: "5px",
        textDecorationColor: selected ? "#35cdf3" : "transparent",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {texte}
    </span>
  );
}

export default function Enquete({ onFinish, onBack }) {
  const [indicesTrouves, setIndicesTrouves] = useState([]);
  const [phaseVerdict, setPhaseVerdict] = useState(false);
  const [verdictChoisi, setVerdictChoisi] = useState(null);

  // Projecteur qui suit le curseur : ambiance "bureau d'enquête dans le noir"
  const mx = useMotionValue(420);
  const my = useMotionValue(220);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(53,205,243,0.10), transparent 65%)`;

  const clues = SEGMENTS.filter((s) => s.clue);
  const totalIndices = clues.length;

  function toggleIndice(id) {
    setIndicesTrouves((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function rendreVerdict(id) {
    if (verdictChoisi) return;
    setVerdictChoisi(id);
  }

  const verdictJuste = verdictChoisi === VERDICT_CORRECT;
  // On épingle dans l'ordre où l'enquêteur les a trouvés
  const epingles = indicesTrouves.map((id) => clues.find((c) => c.id === id));

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% -10%, #14396f 0%, #0a2248 38%, #061631 78%)" }}
      onPointerMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      {/* Projecteur + halos qui dérivent + grain */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spot }} />
      <div className="mil-drift absolute -top-40 -left-32 w-[460px] h-[460px] rounded-full bg-[#1b5fb8]/25 blur-3xl pointer-events-none" />
      <div
        className="mil-drift absolute bottom-0 -right-32 w-[420px] h-[420px] rounded-full bg-[#0aa8e2]/15 blur-3xl pointer-events-none"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24 relative">
        {/* Retour au tableau de bord */}
        <motion.button
          type="button"
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 inline-flex items-center gap-2.5 text-xs font-bold text-[#8fd8f5] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-[#35cdf3]"
        >
          <span className="w-8 h-8 rounded-full bg-white/10 border border-white/15 grid place-items-center text-sm">←</span>
          Retour
        </motion.button>

        {/* En-tête dossier */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-start justify-between mb-8"
        >
          <div>
            <p className="text-[#38b6ff] text-[11px] tracking-[0.28em] uppercase" style={LABEL}>
              Dossier N°04
            </p>
            <h1
              className="text-white text-[2rem] sm:text-4xl mt-2 leading-tight"
              style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}
            >
              L'appel du faux agent
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
              className="h-[3px] rounded-full mt-3 bg-[linear-gradient(90deg,#35cdf3,#2f6bdc)]"
            />
          </div>
          <Maky size={64} mug bob />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-nuit-text text-[13.5px] mb-9 leading-relaxed max-w-xl"
        >
          Touche, dans le message ci-dessous, chaque passage qui te semble suspect.
          Chaque indice repéré s'épingle à ton dossier.
        </motion.p>

        {/* Pièce à conviction */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="rounded-xl p-7 sm:p-8 mb-10 border border-nuit-line relative bg-nuit-800/50 backdrop-blur-sm shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
        >
          <p
            className="absolute -top-2.5 left-6 text-[9.5px] tracking-[0.2em] uppercase px-2 text-[#6f8fb8] bg-[#0a2248]"
            style={LABEL}
          >
            Pièce à conviction — message reçu
          </p>
          <p className="text-[#eef3fb] text-[1.35rem] sm:text-[1.5rem] leading-[1.7]" style={SERIF}>
            {SEGMENTS.map((s, i) =>
              s.clue ? (
                <ClueSpan
                  key={s.id}
                  texte={s.texte}
                  selected={indicesTrouves.includes(s.id)}
                  onToggle={() => toggleIndice(s.id)}
                />
              ) : (
                <span key={i}>{s.texte}</span>
              )
            )}
          </p>
        </motion.div>

        {/* Tableau de liège / indices épinglés */}
        <div className="mb-10">
          <p className="text-[#6f8fb8] text-[11px] tracking-[0.2em] uppercase mb-4" style={LABEL}>
            Indices épinglés ({indicesTrouves.length}/{totalIndices})
          </p>
          <div className="flex flex-wrap gap-5 min-h-[64px] items-start pt-2">
            <AnimatePresence>
              {epingles.map((s, i) => (
                <ClueChip key={s.id} texte={s.texte} rotation={i % 2 === 0 ? -3 : 3} />
              ))}
            </AnimatePresence>
            {/* Emplacements vides : montrent ce qu'il reste à trouver */}
            {Array.from({ length: totalIndices - indicesTrouves.length }).map((_, i) => (
              <div
                key={`vide-${i}`}
                className="w-20 h-14 rounded-[3px] border border-dashed border-nuit-line/80 grid place-items-center text-nuit-line text-lg"
              >
                ?
              </div>
            ))}
          </div>
        </div>

        {/* Passage au verdict */}
        <AnimatePresence>
          {!phaseVerdict && indicesTrouves.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <Button variant="aqua" onClick={() => setPhaseVerdict(true)}>
                Rendre mon verdict →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tampons de verdict */}
        <AnimatePresence>
          {phaseVerdict && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-2"
            >
              <p className="text-nuit-text mb-6" style={{ ...SERIF, fontSize: "1.3rem" }}>
                Au vu des indices, quel est ton verdict ?
              </p>
              <div className="flex gap-6 flex-wrap">
                {VERDICTS.map((v) => (
                  <VerdictStamp
                    key={v.id}
                    label={v.label}
                    stamped={!!verdictChoisi}
                    chosen={verdictChoisi === v.id}
                    result={verdictChoisi === v.id ? (verdictJuste ? "juste" : "faux") : null}
                    onClick={() => rendreVerdict(v.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rapport final */}
        <AnimatePresence>
          {verdictChoisi && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
              className="mt-10 rounded-xl border border-[#35cdf3]/35 p-6 sm:p-7 bg-nuit-800/60 backdrop-blur-sm"
            >
              <p
                className={["text-sm tracking-widest uppercase mb-3", verdictJuste ? "text-[#35cdf3]" : "text-[#ff5d86]"].join(" ")}
                style={LABEL}
              >
                {verdictJuste ? "Verdict confirmé" : "Verdict à revoir"}
              </p>
              <p className="text-[#eef3fb] mb-5" style={{ ...SERIF, fontSize: "1.3rem" }}>
                Tu as repéré {indicesTrouves.length} indice
                {indicesTrouves.length > 1 ? "s" : ""} sur {totalIndices}. Ce message est en
                réalité une manipulation classique.
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                {clues.map((s, i) => (
                  <motion.p
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.12 }}
                    className="text-nuit-text text-sm leading-relaxed"
                  >
                    <span className={indicesTrouves.includes(s.id) ? "text-[#35cdf3]" : "text-[#6f8fb8]"}>
                      {indicesTrouves.includes(s.id) ? "✓" : "○"}
                    </span>{" "}
                    {s.explication}
                  </motion.p>
                ))}
              </div>
              <Button variant="aqua" onClick={onFinish}>
                Continuer →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
