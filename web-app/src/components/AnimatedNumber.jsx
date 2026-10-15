import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

/**
 * Le chiffre grimpe au lieu de sauter directement à la valeur finale —
 * un score qui "compte" visuellement déclenche plus de satisfaction
 * qu'un chiffre statique (même mécanisme que les compteurs de calories
 * ou de cagnotte dans les jeux mobiles).
 */
export default function AnimatedNumber({ value, className = "" }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return <span className={className}>{display}</span>;
}
