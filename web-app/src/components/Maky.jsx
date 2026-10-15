import { motion } from "framer-motion";

/**
 * Maky — mascotte lémurien à lunettes rondes.
 * Les grands yeux cerclés symbolisent le regard critique qu'on développe.
 * mood: "veille" (par défaut), "bravo" (succès), "hmm" (doute à encourager)
 */
export default function Maky({ mood = "veille", size = 96, bob = true, mug = false, className = "" }) {
  const eyeY = mood === "bravo" ? 0 : mood === "hmm" ? 2 : 0;

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      animate={bob ? { y: [0, -6, 0] } : {}}
      transition={bob ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      {/* queue annelée */}
      <path
        d="M40 150 C10 140, 10 100, 35 95 C55 91, 60 115, 45 118 C35 120, 33 108, 42 106"
        fill="none"
        stroke="#B9A8DD"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* corps */}
      <ellipse cx="100" cy="132" rx="52" ry="46" fill="#EDE9F6" />
      {/* oreilles */}
      <circle cx="55" cy="55" r="22" fill="#3B3245" />
      <circle cx="145" cy="55" r="22" fill="#3B3245" />
      <circle cx="55" cy="55" r="12" fill="#C9B6E4" />
      <circle cx="145" cy="55" r="12" fill="#C9B6E4" />
      {/* tête */}
      <ellipse cx="100" cy="92" rx="58" ry="52" fill="#F4F1FB" />
      {/* masque facial sombre autour des yeux, typique du lémur */}
      <path
        d="M60 78 C60 60, 80 50, 100 52 C120 50, 140 60, 140 78 C140 100, 120 108, 100 108 C80 108, 60 100, 60 78 Z"
        fill="#3B3245"
      />
      {/* lunettes rondes — signature "regard critique" */}
      <g stroke="#26333A" strokeWidth="4" fill="#FFFFFF">
        <circle cx="78" cy="80" r="20" />
        <circle cx="122" cy="80" r="20" />
        <line x1="98" y1="80" x2="102" y2="80" />
      </g>
      {/* pupilles */}
      <circle cx="78" cy={80 + eyeY} r="7" fill="#26333A" />
      <circle cx="122" cy={80 + eyeY} r="7" fill="#26333A" />
      {/* museau */}
      <ellipse cx="100" cy="98" rx="12" ry="8" fill="#FBFAFE" />
      <circle cx="100" cy="96" r="3.5" fill="#26333A" />
      {mood === "bravo" ? (
        <path d="M92 104 Q100 110 108 104" stroke="#26333A" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M94 104 Q100 107 106 104" stroke="#26333A" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {/* tasse de café fumante (écran détective) */}
      {mug && (
        <g>
          <rect x="128" y="138" width="38" height="34" rx="8" fill="#FFFFFF" stroke="#26333A" strokeWidth="4" />
          <path d="M166 148 q16 0 16 12 q0 12 -16 12" fill="none" stroke="#26333A" strokeWidth="4" strokeLinecap="round" />
          <rect x="132" y="142" width="30" height="7" rx="3" fill="#8B5E3C" />
          {[138, 147, 156].map((x, i) => (
            <path
              key={x}
              className="mil-steam"
              style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${x}px 132px` }}
              d={`M${x} 132 q-4 -6 0 -12`}
              fill="none"
              stroke="#9db2cf"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </g>
      )}
    </motion.svg>
  );
}
