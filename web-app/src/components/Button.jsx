import { motion } from "framer-motion";

const VARIANTS = {
  primary:
    "bg-corail text-white shadow-[0_6px_0_0_var(--color-corail-600)] active:shadow-[0_2px_0_0_var(--color-corail-600)]",
  success:
    "bg-ravinala text-white shadow-[0_6px_0_0_var(--color-ravinala-700)] active:shadow-[0_2px_0_0_var(--color-ravinala-700)]",
  aqua:
    "bg-[linear-gradient(180deg,#2bd0f8,#0aa8e2)] text-white shadow-[0_6px_0_0_#0884b5,0_16px_30px_-12px_rgba(10,159,209,0.6)] active:shadow-[0_2px_0_0_#0884b5]",
  outline:
    "bg-white text-aqua-700 border-2 border-aqua-200 shadow-none hover:border-aqua-500",
  ghost:
    "bg-transparent text-encre-soft border-2 border-brume-200 shadow-none hover:border-corail hover:text-corail",
};

/**
 * Bouton "à ressort" : léger enfoncement au clic (feedback tactile immédiat,
 * important pour le renforcement positif dans une boucle d'apprentissage).
 */
export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { y: 4 }}
      className={[
        "font-display font-semibold tracking-wide uppercase text-sm px-7 py-3.5 rounded-[var(--radius-pill)]",
        "transition-[box-shadow,transform] duration-100 select-none",
        disabled
          ? "bg-brume-200 text-encre-soft/50 shadow-none cursor-not-allowed"
          : VARIANTS[variant],
        className,
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}
