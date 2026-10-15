import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Maky from "./Maky";

const PAD = 10; // marge autour de l'élément mis en valeur

/**
 * Tuto pas-à-pas : le reste de l'appli est flouté, seul l'élément pointé
 * par `targetRef` reste net et cliquable. On calcule son rectangle en
 * continu (rAF) pendant que le tuto est affiché, pour rester calé même
 * si la mise en page bouge (animation d'entrée des cartes, resize...).
 *
 * `step` doit changer à chaque nouvelle cible : ça sert de clé pour
 * réinitialiser proprement l'animation de la bulle entre deux étapes.
 */
export default function TutorialSpotlight({
  targetsRef,
  targetKey,
  step,
  totalSteps,
  title,
  message,
}) {
  const [rect, setRect] = useState(null);
  const frameRef = useRef(null);

  useEffect(() => {
    function measure() {
      const el = targetsRef.current?.[targetKey];
      if (el) {
        const r = el.getBoundingClientRect();
        setRect({
          top: r.top - PAD,
          left: r.left - PAD,
          width: r.width + PAD * 2,
          height: r.height + PAD * 2,
        });
      }
      frameRef.current = requestAnimationFrame(measure);
    }
    measure();
    return () => cancelAnimationFrame(frameRef.current);
  }, [targetsRef, targetKey, step]);

  if (!rect) return null;

  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const holeBottom = rect.top + rect.height;
  const holeRight = rect.left + rect.width;

  // Bulle sous la cible si elle a la place, sinon au-dessus.
  const bubbleBelow = holeBottom + 210 < winH;

  const blurPanelStyle = {
    position: "fixed",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    background: "rgba(20, 18, 31, 0.35)",
    zIndex: 60,
    pointerEvents: "auto",
  };

  return (
    <div aria-hidden={false}>
      {/* 4 bandes qui recouvrent tout sauf le trou autour de la cible */}
      <div style={{ ...blurPanelStyle, top: 0, left: 0, width: "100%", height: Math.max(rect.top, 0) }} />
      <div
        style={{
          ...blurPanelStyle,
          top: holeBottom,
          left: 0,
          width: "100%",
          height: Math.max(winH - holeBottom, 0),
        }}
      />
      <div
        style={{
          ...blurPanelStyle,
          top: rect.top,
          left: 0,
          width: Math.max(rect.left, 0),
          height: rect.height,
        }}
      />
      <div
        style={{
          ...blurPanelStyle,
          top: rect.top,
          left: holeRight,
          width: Math.max(winW - holeRight, 0),
          height: rect.height,
        }}
      />

      {/* anneau de mise en valeur autour de la cible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: "var(--radius-bento)",
          boxShadow: "0 0 0 3px var(--color-lavande), 0 0 32px 4px rgba(124, 92, 255, 0.55)",
          zIndex: 61,
          pointerEvents: "none",
        }}
      />

      {/* bulle de conseil */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: bubbleBelow ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            zIndex: 62,
            top: bubbleBelow ? holeBottom + 16 : undefined,
            bottom: bubbleBelow ? undefined : winH - rect.top + 16,
            left: Math.min(Math.max(rect.left, 16), winW - 340),
            width: 320,
          }}
          className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-float)] p-5"
        >
          <div className="flex items-start gap-3">
            <Maky size={44} bob={false} mood="veille" />
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-lavande-700">
                Étape {step + 1} / {totalSteps}
              </p>
              <h3 className="font-display font-bold text-base text-encre mt-0.5">{title}</h3>
              <p className="text-sm text-encre-soft mt-1 leading-snug">{message}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
