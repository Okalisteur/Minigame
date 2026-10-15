import { motion } from "framer-motion";

/**
 * Grande zone tactile (Fitts's law : plus une cible est grande, moins
 * l'effort mental+moteur pour l'atteindre est coûteux — clé pour ne pas
 * fatiguer une attention déjà courte). État visuel net après réponse :
 * le cerveau n'a pas à se demander "est-ce bon ou pas".
 */
export default function AnswerOption({ label, state = "neutre", onClick, disabled }) {
  const styles = {
    neutre: "bg-white border-2 border-brume-200 hover:border-lavande text-encre",
    correcte: "bg-ravinala-100 border-2 border-ravinala text-ravinala-700",
    incorrecte: "bg-alerte-100 border-2 border-alerte text-alerte",
    estompe: "bg-white border-2 border-brume-200 text-encre-soft/40",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.98 }}
      animate={state === "incorrecte" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
      className={[
        "w-full text-left px-6 py-5 rounded-2xl font-medium text-base",
        "transition-colors duration-200",
        styles[state],
      ].join(" ")}
    >
      {label}
    </motion.button>
  );
}
