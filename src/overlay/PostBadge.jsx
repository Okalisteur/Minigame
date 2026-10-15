import { useState } from "react";

function colorFor(score) {
  if (score >= 70) return "#2e7d32";
  if (score >= 40) return "#f9a825";
  return "#c62828";
}

function labelFor(score) {
  if (score >= 70) return "Fiabilité probable";
  if (score >= 40) return "À vérifier";
  return "Signaux suspects";
}

export default function PostBadge({ score, tip, signals }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        fontFamily: "system-ui, sans-serif",
        fontSize: "13px",
        margin: "6px 0",
        border: `1px solid ${colorFor(score)}`,
        borderRadius: "8px",
        padding: "6px 10px",
        background: "#fff",
        maxWidth: "420px"
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: colorFor(score)
          }}
        />
        <strong>{labelFor(score)}</strong>
        <span style={{ color: "#666" }}>({score}/100)</span>
        <span style={{ marginLeft: "auto", color: "#888" }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div style={{ marginTop: "6px", color: "#333" }}>
          <p style={{ margin: "4px 0" }}>{tip}</p>
          {signals.length > 0 && (
            <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>
              {signals.map((s, i) => (
                <li key={i} style={{ color: s.type === "negative" ? "#c62828" : "#2e7d32" }}>
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
