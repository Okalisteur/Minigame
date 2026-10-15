/**
 * Fond "verre dépoli" de l'écran des cartes : dégradé cyan très clair,
 * grosses taches floues qui dérivent lentement et quelques formes
 * (anneau, carré arrondi) qui flottent. Purement décoratif : aria-hidden
 * et pointer-events-none pour ne jamais gêner le geste de swipe.
 */
export default function AquaBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, #c6f0fc 0%, #e8f8fd 30%, #f7fbfe 58%, #def4fc 100%)",
      }}
    >
      <div className="mil-drift absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#7fdcf7]/40 blur-3xl" />
      <div
        className="mil-drift absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-[#5fc8f4]/35 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="mil-drift absolute top-1/3 left-1/2 w-[320px] h-[320px] rounded-full bg-white/70 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      {/* Anneau, à droite */}
      <div
        className="mil-float absolute right-[9%] top-[24%] w-28 h-28 rounded-full border-[14px] border-[#bfe6f7]/60"
        style={{ animationDelay: "-2s" }}
      />
      {/* Carré arrondi, à gauche */}
      <div
        className="mil-float absolute left-[8%] top-[52%] w-24 h-24 rounded-[30px] border-[10px] border-[#b9f1de]/70"
        style={{ animationDelay: "-5s" }}
      />
      {/* Petit anneau bas droite */}
      <div
        className="mil-float absolute right-[18%] bottom-[12%] w-14 h-14 rounded-full border-[8px] border-[#c9e9fa]/70"
        style={{ animationDelay: "-7s" }}
      />
    </div>
  );
}
