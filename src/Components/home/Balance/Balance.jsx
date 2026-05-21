import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, Clock, ArrowUpRight, ArrowDownLeft, RotateCcw, ChevronRight, Zap } from "lucide-react";

const transactions = [
  { id: 1, title: "Meal Order Payment", subtitle: "Campus Cafeteria", amount: -120, type: "debit", icon: "🍱", time: "2h ago" },
  { id: 2, title: "Ride Payment", subtitle: "Pathao · 3.2km", amount: -80, type: "debit", icon: "🛵", time: "5h ago" },
  { id: 3, title: "Refund Added", subtitle: "Order #4821 cancelled", amount: 200, type: "credit", icon: "↩", time: "Yesterday" },
  { id: 4, title: "Meal Order Payment", subtitle: "Dorm Kitchen", amount: -95, type: "debit", icon: "🍛", time: "2d ago" },
];

const CountUp = ({ target, duration = 1200 }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <>{val.toLocaleString("bn-BD")}</>;
};

const BalancePage = () => {
  const [sosHover, setSosHover] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#0f172a",
      padding: "10",
      width: "100%",
    }}>

      <div style={{ width: "100%", padding: "2rem 16rem 4rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px", margin: 0 }}>
              My Wallet
            </p>
            <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#0f172a", margin: "4px 0 0 0" }}>Balance Overview</h1>
          </div>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Wallet size={18} color="#6366f1" />
          </div>
        </div>

        {/* Hero Balance Card */}
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          borderRadius: "24px",
          padding: "1.75rem",
          marginBottom: "1rem",
          border: "1px solid rgba(99,102,241,0.25)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }} />
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "rgba(129,140,248,0.08)",
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "12px", color: "rgba(165,180,252,0.7)", marginBottom: "12px", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
                Current Balance
              </p>
              <div style={{ fontSize: "42px", fontWeight: "700", letterSpacing: "-2px", lineHeight: 1, color: "#fff" }}>
                ৳ <CountUp target={12450} />
              </div>
            </div>
            <span style={{
              background: "rgba(16,185,129,0.2)",
              color: "#34d399",
              fontSize: "12px", fontWeight: "600",
              padding: "5px 10px", borderRadius: "99px",
              border: "1px solid rgba(52,211,153,0.3)",
              display: "flex", alignItems: "center", gap: "4px",
              flexShrink: 0,
            }}>
              <ArrowUpRight size={12} /> +12%
            </span>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            {[
              { label: "Income", value: "৳32,800", color: "#34d399", bg: "rgba(52,211,153,0.1)", icon: <TrendingUp size={12}/> },
              { label: "Pending", value: "৳2,300", color: "#fb923c", bg: "rgba(251,146,60,0.1)", icon: <Clock size={12}/> },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: s.bg,
                borderRadius: "12px", padding: "10px 12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: s.color, fontSize: "11px", marginBottom: "4px" }}>
                  {s.icon} {s.label}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#fff" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "1.5rem" }}>
          {[
            { label: "Add Money", icon: <ArrowUpRight size={18}/>, color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
            { label: "Send", icon: <ArrowDownLeft size={18}/>, color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
            { label: "History", icon: <RotateCcw size={18}/>, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
          ].map(a => (
            <button key={a.label} style={{
              background: a.bg,
              border: `1px solid ${a.border}`,
              borderRadius: "14px", padding: "14px 8px",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "8px", cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{ color: a.color }}>{a.icon}</span>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* SOS Section */}
        <div
          onMouseEnter={() => setSosHover(true)}
          onMouseLeave={() => setSosHover(false)}
          style={{
            background: sosHover
              ? "linear-gradient(135deg, #be123c 0%, #db2777 100%)"
              : "linear-gradient(135deg, #9f1239 0%, #be185d 100%)",
            borderRadius: "20px",
            padding: "1.25rem 1.5rem",
            marginBottom: "1.5rem",
            border: "1px solid rgba(251,113,133,0.3)",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "background 0.3s",
          }}>
          <div style={{
            position: "absolute", top: "-20px", right: "-20px",
            width: "100px", height: "100px", borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>Emergency SOS</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                  Meal, ride & crisis support · Coming soon
                </div>
              </div>
            </div>
            <span style={{
              fontSize: "10px", fontWeight: "700",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "4px 10px", borderRadius: "99px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}>Soon</span>
          </div>
          <div style={{ marginTop: "12px", height: "1px", background: "rgba(255,255,255,0.1)" }} />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", marginTop: "10px", lineHeight: "1.6", margin: "10px 0 0 0" }}>
            One-tap emergency requests for students in critical situations — food, transport, or urgent help.
          </p>
        </div>

        {/* Transactions */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Recent Transactions</h2>
            <button style={{
              fontSize: "12px", color: "#6366f1",
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "3px",
              padding: 0,
            }}>
              See all <ChevronRight size={13} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {transactions.map((tx, i) => (
              <div key={tx.id} style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                animation: `fadeUp 0.4s ease ${i * 0.08}s both`,
              }}>
                <div style={{
                  width: "42px", height: "42px",
                  borderRadius: "12px",
                  background: tx.type === "credit" ? "#ecfdf5" : "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                }}>
                  {tx.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "#0f172a", marginBottom: "2px" }}>
                    {tx.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                    {tx.subtitle} · {tx.time}
                  </div>
                </div>
                <div style={{
                  fontSize: "14px", fontWeight: "600",
                  color: tx.type === "credit" ? "#059669" : "#e11d48",
                }}>
                  {tx.type === "credit" ? "+" : "−"}৳{Math.abs(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BalancePage;
