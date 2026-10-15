export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "bg-white/80 backdrop-blur-sm p-6",
        "shadow-[var(--shadow-soft)]",
        className,
      ].join(" ")}
      style={{ borderRadius: "var(--radius-card)" }}
    >
      {children}
    </div>
  );
}
