import { useEffect, useState } from "react";
import { getHistory, getStats, clearHistory } from "../lib/storage.js";

export default function Popup() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, suspectPct: 0, avgScore: 0 });

  async function refresh() {
    const h = await getHistory();
    setHistory(h);
    setStats(getStats(h));
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px" }}>MIL Education</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <StatBox label="Posts analysés" value={stats.total} />
        <StatBox label="% suspects" value={`${stats.suspectPct}%`} />
        <StatBox label="Score moyen" value={stats.avgScore} />
      </div>

      <h3 style={{ fontSize: "13px", margin: "0 0 6px" }}>Historique récent</h3>
      <div style={{ maxHeight: "220px", overflowY: "auto" }}>
        {history.length === 0 && (
          <p style={{ fontSize: "12px", color: "#888" }}>
            Ouvre Facebook pour commencer l'analyse.
          </p>
        )}
        {history.slice(0, 20).map((h, i) => (
          <div
            key={i}
            style={{
              fontSize: "12px",
              borderBottom: "1px solid #eee",
              padding: "6px 0"
            }}
          >
            <strong>{h.score}/100</strong> — {h.domain || "sans source"}
            <div style={{ color: "#666" }}>{h.excerpt}...</div>
          </div>
        ))}
      </div>

      <button
        onClick={async () => {
          await clearHistory();
          refresh();
        }}
        style={{
          marginTop: "12px",
          fontSize: "12px",
          padding: "6px 10px",
          cursor: "pointer"
        }}
      >
        Réinitialiser l'historique
      </button>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "8px",
        textAlign: "center"
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "bold" }}>{value}</div>
      <div style={{ fontSize: "10px", color: "#666" }}>{label}</div>
    </div>
  );
}
