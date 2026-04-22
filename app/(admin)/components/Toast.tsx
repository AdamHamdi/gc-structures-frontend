"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  title: string;
  detail?: string;
}

interface ToastContextValue {
  show: (type: ToastType, title: string, detail?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ICONS: Record<ToastType, JSX.Element> = {
  success: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  info: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const STYLES: Record<ToastType, { bg: string; icon: string; border: string }> = {
  success: { bg: "#f0fdf4", icon: "#16a34a", border: "#bbf7d0" },
  error:   { bg: "#fff1f2", icon: "#dc2626", border: "#fecdd3" },
  warning: { bg: "#fffbeb", icon: "#d97706", border: "#fde68a" },
  info:    { bg: "#eff6ff", icon: "#2563eb", border: "#bfdbfe" },
};

const LABELS: Record<ToastType, string> = {
  success: "Succès",
  error:   "Erreur",
  warning: "Attention",
  info:    "Info",
};

function ToastItem({ item, onRemove }: { item: ToastItem; onRemove: (id: number) => void }) {
  const s = STYLES[item.type];
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(item.id), 4000);
    return () => clearTimeout(timerRef.current);
  }, [item.id, onRemove]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: "12px",
        padding: "14px 16px",
        minWidth: "300px",
        maxWidth: "380px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
        animation: "toastIn 0.3s ease",
      }}
    >
      <span style={{ color: s.icon, flexShrink: 0, marginTop: "1px" }}>{ICONS[item.type]}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "15px", color: "#1e293b" }}>{item.title}</p>
        {item.detail && <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#475569" }}>{item.detail}</p>}
      </div>
      <button
        onClick={() => onRemove(item.id)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "0", lineHeight: 1, flexShrink: 0 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const show = useCallback((type: ToastType, title: string, detail?: string) => {
    const id = ++counterRef.current;
    setToasts((prev) => [...prev, { id, type, title: title || LABELS[type], detail }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        <style>{`
          @keyframes toastIn {
            from { opacity: 0; transform: translateX(40px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
