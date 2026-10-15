import { motion } from "framer-motion";

/**
 * Barre segmentée plutôt qu'un pourcentage continu : le cerveau perçoit
 * des étapes concrètes ("2 sur 5 faites") plus motivantes qu'un nombre
 * abstrait — et l'effet Zeigarnik (une tâche presque finie donne envie
 * de la terminer) joue à plein sur les derniers segments.
 */
export default function SegmentedProgress({ total, current }) {
  return (
    <div className="flex gap-1.5 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-2 rounded-full bg-brume-200 overflow-hidden">
          <motion.div
            className="h-full bg-lavande rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: i < current ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      ))}
    </div>
  );
}
