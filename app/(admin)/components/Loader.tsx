"use client";

const TEXT = "GC Structures";

export default function Loader({ inline = false }: { inline?: boolean }) {
  return (
    <div style={{
      position: inline ? "relative" : "fixed",
      inset: inline ? "auto" : 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      zIndex: inline ? "auto" : 9999,
      minHeight: inline ? "60vh" : undefined,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {TEXT.split("").map((char, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(40px, 8vw, 80px)",
                fontWeight: 800,
                color: i % 2 === 0 ? "#1e293b" : "#28a951",
                fontFamily: "Poppins, sans-serif",
                opacity: 0,
                animation: `letterPop 0.4s ease forwards`,
                animationDelay: `${i * 0.08}s`,
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <span style={{
          fontSize: "15px",
          color: "#94a3b8",
          letterSpacing: "3px",
          textTransform: "uppercase",
          opacity: 0,
          animation: `letterPop 0.4s ease forwards`,
          animationDelay: `${TEXT.length * 0.08 + 0.1}s`,
        }}>
          Chargement...
        </span>
      </div>
      <style>{`
        @keyframes letterPop {
          0%   { opacity: 0; transform: translateY(20px); }
          60%  { opacity: 1; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
