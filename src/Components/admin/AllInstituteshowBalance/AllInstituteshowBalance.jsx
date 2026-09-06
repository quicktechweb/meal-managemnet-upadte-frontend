import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";

/* ─── Palette ─────────────────────────────────────── */
const C = {
  bg: "#F7F6F2",
  surface: "#FFFFFF",
  border: "#E4E2D9",
  borderHov: "#A8A49A",
  text: "#1C1B18",
  muted: "#7A7870",
  faint: "#B8B5AC",
  purple: { bg: "#EEEDFE", fg: "#3C3489", border: "#C4C1F8" },
  teal:   { bg: "#E1F5EE", fg: "#085041", border: "#A8DFCc" },
  amber:  { bg: "#FAEEDA", fg: "#633806", border: "#F0CC8E" },
  coral:  { bg: "#FAECE7", fg: "#712B13", border: "#F0B8A0" },
  green:  { bg: "#E6F9F0", fg: "#065F3A", border: "#86EFAC" },
};

/* ─── Tiny helpers ─────────────────────────────────── */
const getInitials = (name = "") => {
  const p = name.trim().split(" ").filter(Boolean);
  if (!p.length) return "?";
  if (p.length === 1) return p[0][0]?.toUpperCase() ?? "?";
  return (p[0][0] + p[p.length - 1][0]).toUpperCase();
};

const AV_COLORS = ["purple", "teal", "amber", "coral"];
const Avatar = ({ name, color = "purple", size = 36 }) => {
  const c = C[color] || C.purple;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: c.fg, border: `1.5px solid ${c.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: size * 0.33, flexShrink: 0,
      fontFamily: "'DM Mono', monospace",
    }}>{getInitials(name)}</div>
  );
};

const Badge = ({ label, color = "purple", small }) => {
  const s = C[color] || C.purple;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: s.bg, color: s.fg, border: `1px solid ${s.border}`,
      fontSize: small ? 10 : 11, fontWeight: 600,
      padding: small ? "2px 7px" : "3px 9px",
      borderRadius: 20, letterSpacing: "0.03em", whiteSpace: "nowrap",
      fontFamily: "'DM Mono', monospace",
    }}>{label}</span>
  );
};

/* ─── Custom Select Dropdown ───────────────────────── */
const Select = ({ value, onChange, options, placeholder, color = "purple", disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const c = C[color] || C.purple;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", minWidth: 180 }}>
      <button
        onClick={() => !disabled && setOpen(p => !p)}
        disabled={disabled}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 8, padding: "9px 14px", background: disabled ? "#F7F6F2" : C.surface,
          border: `1.5px solid ${open ? c.fg : C.border}`,
          borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 13, color: selected ? C.text : C.faint,
          fontFamily: "inherit", transition: "border-color 0.15s",
          opacity: disabled ? 0.55 : 1,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 7, overflow: "hidden" }}>
          {selected ? (
            <>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: c.fg,
              }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected.label}</span>
            </>
          ) : placeholder}
        </span>
        <span style={{ fontSize: 10, color: C.faint, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 100,
          background: C.surface, border: `1.5px solid ${c.fg}`,
          borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          overflow: "hidden", maxHeight: 220, overflowY: "auto",
        }}>
          {value && (
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              style={{
                width: "100%", padding: "9px 14px", textAlign: "left",
                background: "none", border: "none", fontSize: 12,
                color: C.faint, cursor: "pointer", fontFamily: "inherit",
                borderBottom: `1px solid ${C.border}`,
              }}
            >✕ Clear</button>
          )}
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                width: "100%", padding: "9px 14px", textAlign: "left",
                background: opt.value === value ? c.bg : "none",
                border: "none", fontSize: 13,
                color: opt.value === value ? c.fg : C.text,
                cursor: "pointer", fontFamily: "inherit",
                fontWeight: opt.value === value ? 600 : 400,
                borderBottom: `1px solid ${C.border}`,
              }}
            >{opt.label}</button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Balance Modal ────────────────────────────────── */
const BalanceModal = ({ user, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) { setErr("Enter a valid amount"); return; }
    setLoading(true); setErr("");
    try {
      await axios.post(`https://alabadanbackendpart.alabadan.com/api/add-balance/${user._id}`, {
        amount: num, note,
      });
      onSuccess(num);
      onClose();
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to add balance");
    } finally {
      setLoading(false);
    }
  };

  const name = user.information?.full_name || "Unknown";
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(28,27,24,0.45)", backdropFilter: "blur(3px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: C.surface, borderRadius: 16, padding: 28,
        width: "100%", maxWidth: 380,
        border: `1.5px solid ${C.border}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <Avatar name={name} color="green" size={44} />
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: 0, textTransform: "capitalize" }}>{name}</p>
            <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>
              Current balance: <strong style={{ color: C.teal?.fg }}>৳ {(user.balance ?? 0).toLocaleString()}</strong>
            </p>
          </div>
        </div>

        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
          Amount (৳)
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00"
          style={{
            width: "100%", padding: "10px 14px", fontSize: 18, fontWeight: 600,
            border: `1.5px solid ${C.border}`, borderRadius: 10, outline: "none",
            fontFamily: "'DM Mono', monospace", color: C.text,
            background: "#FAFAF8", boxSizing: "border-box", marginBottom: 12,
          }}
        />

        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
          Note (optional)
        </label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. Monthly recharge"
          style={{
            width: "100%", padding: "9px 14px", fontSize: 13,
            border: `1.5px solid ${C.border}`, borderRadius: 10, outline: "none",
            fontFamily: "inherit", color: C.text,
            background: "#FAFAF8", boxSizing: "border-box", marginBottom: 16,
          }}
        />

        {err && <p style={{ fontSize: 12, color: "#B91C1C", marginBottom: 12 }}>{err}</p>}

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: `1.5px solid ${C.border}`,
            background: "none", fontSize: 13, color: C.muted, cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 2, padding: "10px 0", borderRadius: 10, border: "none",
            background: loading ? "#86EFAC" : "#065F3A",
            fontSize: 13, fontWeight: 600, color: "#fff",
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
            transition: "background 0.15s",
          }}>
            {loading ? "Adding…" : "Add Balance ৳"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Student Row ──────────────────────────────────── */
const StudentRow = ({ user, index, onAddBalance }) => {
  const [hov, setHov] = useState(false);
  const color = AV_COLORS[index % AV_COLORS.length];
  const name = user.information?.full_name ?? "Unknown";
  const designation = user.information?.designation;
  const year = user.information?.year;
  const mess = user.information?.name_of_the_mess;
  const hall = user.information?.name_of_the_hall;
  const room = user.information?.room_number;

  return (
    <li
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "13px 18px", listStyle: "none",
        borderBottom: `1px solid ${C.border}`,
        background: hov ? "#FAFAF9" : "transparent",
        transition: "background 0.1s",
      }}
    >
      <Avatar name={name} color={color} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, textTransform: "capitalize" }}>{name}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, background: "#F1EFE8", color: "#888780", padding: "2px 6px", borderRadius: 4 }}>
            #{user.uid}
          </span>
          {designation && <Badge label={designation} color="purple" small />}
          {year && <Badge label={year} color="teal" small />}
        </div>
        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>
          {user.email}{user.phone ? ` · ${user.phone}` : ""}
        </p>
        {(mess || hall) && (
          <p style={{ fontSize: 11, color: C.faint, margin: "1px 0 0" }}>
            {[mess, hall].filter(Boolean).join(" › ")}
          </p>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          {room ? (
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: 0 }}>Room {room}</p>
          ) : (
            <span style={{ fontSize: 12, color: C.faint }}>No room</span>
          )}
          <p style={{ fontSize: 12, color: C[C.green?.fg] || "#065F3A", margin: "2px 0 0", fontFamily: "'DM Mono', monospace" }}>
            ৳ {(user.balance ?? 0).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => onAddBalance(user)}
          style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: "5px 11px", borderRadius: 8,
            border: `1.5px solid ${C.green?.border || "#86EFAC"}`,
            background: hov ? C.green?.bg || "#E6F9F0" : "transparent",
            color: C.green?.fg || "#065F3A",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit", transition: "background 0.15s",
          }}
        >
          + Balance
        </button>
      </div>
    </li>
  );
};

/* ─── Main Component ───────────────────────────────── */
export default function InstituteUserBrowser() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedMess, setSelectedMess] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [search, setSearch] = useState("");
  const [balanceTarget, setBalanceTarget] = useState(null);

  useEffect(() => {
    axios.get("https://alabadanbackendpart.alabadan.com/api/instituteuser-approved-user-all")
      .then(r => setUsers(r.data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ── Derived options ── */
  const instituteOptions = useMemo(() => {
    if (!users) return [];
    const map = {};
    users.forEach(u => {
      const id = u.institute_id;
      if (!map[id]) {
        map[id] = {
          value: id,
          label: u.information?.name_of_institute || u.information?.name_of_the_mess || `Institute …${id?.slice(-4)}`,
          type: u.information?.instituteType,
        };
      }
    });
    return Object.values(map);
  }, [users]);

  const messOptions = useMemo(() => {
    if (!users || !selectedInstitute) return [];
    const set = new Set(
      users.filter(u => u.institute_id === selectedInstitute)
           .map(u => u.information?.name_of_the_mess).filter(Boolean)
    );
    return [...set].map(m => ({ value: m, label: m }));
  }, [users, selectedInstitute]);

  const hallOptions = useMemo(() => {
    if (!users || !selectedInstitute || !selectedMess) return [];
    const set = new Set(
      users.filter(u => u.institute_id === selectedInstitute && u.information?.name_of_the_mess === selectedMess)
           .map(u => u.information?.name_of_the_hall).filter(Boolean)
    );
    return [...set].map(h => ({ value: h, label: h }));
  }, [users, selectedInstitute, selectedMess]);

  /* ── Filtered students ── */
  const filteredUsers = useMemo(() => {
    if (!users || !selectedInstitute) return [];
    let list = users.filter(u => u.institute_id === selectedInstitute);
    if (selectedMess) list = list.filter(u => u.information?.name_of_the_mess === selectedMess);
    if (selectedHall) list = list.filter(u => u.information?.name_of_the_hall === selectedHall);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(u =>
        u.information?.full_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.includes(q) ||
        String(u.uid)?.includes(q)
      );
    }
    return list;
  }, [users, selectedInstitute, selectedMess, selectedHall, search]);

  /* ── When institute changes, reset downstream ── */
  const handleInstituteChange = (v) => {
    setSelectedInstitute(v);
    setSelectedMess(null);
    setSelectedHall(null);
    setSearch("");
  };
  const handleMessChange = (v) => {
    setSelectedMess(v);
    setSelectedHall(null);
    setSearch("");
  };

  const handleBalanceSuccess = (userId, amount) => {
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, balance: (u.balance ?? 0) + amount } : u));
  };

  const institInstitute = instituteOptions.find(o => o.value === selectedInstitute);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        input:focus { border-color: #3C3489 !important; outline: none; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D3D1C7; border-radius: 10px; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: C.text, margin: 0 }}>Institute User Browser</h1>
            {users && <Badge label={`${users.length} total`} color="purple" />}
          </div>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Browse by institute → mess → hall, search students and manage balance</p>
        </div>

        {/* ── Filter Row ── */}
        <div style={{
          background: C.surface, border: `1.5px solid ${C.border}`,
          borderRadius: 14, padding: "18px 20px", marginBottom: 20,
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: C.faint, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Filter by Location
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Institute */}
            <div style={{ flex: "1 1 200px", minWidth: 180 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Institute
              </label>
              {loading ? (
                <div style={{ padding: "9px 14px", fontSize: 13, color: C.faint, border: `1.5px solid ${C.border}`, borderRadius: 10, background: "#F7F6F2" }}>
                  Loading…
                </div>
              ) : (
                <Select
                  value={selectedInstitute}
                  onChange={handleInstituteChange}
                  options={instituteOptions}
                  placeholder="Select institute"
                  color="purple"
                />
              )}
            </div>

            {/* Mess */}
            <div style={{ flex: "1 1 180px", minWidth: 160 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Mess
              </label>
              <Select
                value={selectedMess}
                onChange={handleMessChange}
                options={messOptions}
                placeholder={selectedInstitute ? (messOptions.length ? "Select mess" : "No messes") : "Select institute first"}
                color="teal"
                disabled={!selectedInstitute || !messOptions.length}
              />
            </div>

            {/* Hall */}
            <div style={{ flex: "1 1 180px", minWidth: 160 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Hall
              </label>
              <Select
                value={selectedHall}
                onChange={setSelectedHall}
                options={hallOptions}
                placeholder={selectedMess ? (hallOptions.length ? "Select hall" : "No halls") : "Select mess first"}
                color="amber"
                disabled={!selectedMess || !hallOptions.length}
              />
            </div>
          </div>
        </div>

        {/* ── Search + active filters ── */}
        {selectedInstitute && (
          <div style={{ marginBottom: 16 }}>
            {/* Active filter breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: C.faint }}>Showing:</span>
              <Badge label={institInstitute?.label || "Institute"} color="purple" />
              {selectedMess && <><span style={{ color: C.faint }}>›</span><Badge label={selectedMess} color="teal" /></>}
              {selectedHall && <><span style={{ color: C.faint }}>›</span><Badge label={selectedHall} color="amber" /></>}
              {search && <><span style={{ color: C.faint }}>·</span><Badge label={`"${search}"`} color="coral" /></>}
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.faint }}>⌕</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email, phone, or UID…"
                style={{
                  width: "100%", padding: "10px 14px 10px 36px",
                  fontSize: 13, border: `1.5px solid ${C.border}`,
                  borderRadius: 10, background: C.surface,
                  color: C.text, fontFamily: "inherit",
                }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, color: C.faint, padding: 0,
                }}>✕</button>
              )}
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!selectedInstitute && !loading && (
          <div style={{
            background: C.surface, border: `1.5px dashed ${C.border}`,
            borderRadius: 14, padding: "48px 24px", textAlign: "center",
          }}>
            <p style={{ fontSize: 32, margin: "0 0 8px" }}>🏛️</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Select an institute to begin</p>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Use the dropdowns above to filter by institute, mess, and hall</p>
          </div>
        )}

        {/* ── Results ── */}
        {selectedInstitute && (
          <>
            {/* Stats bar */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              {[
                { label: "Members shown", value: filteredUsers.length, color: "purple" },
                { label: "With rooms", value: filteredUsers.filter(u => u.information?.room_number).length, color: "teal" },
                { label: "Total balance", value: `৳ ${filteredUsers.reduce((s, u) => s + (u.balance ?? 0), 0).toLocaleString()}`, color: "amber" },
              ].map(s => (
                <div key={s.label} style={{
                  flex: "1 1 130px", background: C.surface,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 10, padding: "10px 16px",
                }}>
                  <p style={{ fontSize: 11, color: C.muted, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.label}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0, fontFamily: "'DM Mono', monospace" }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* List */}
            <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "11px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.faint }}>
                  {filteredUsers.length} member{filteredUsers.length !== 1 ? "s" : ""}
                </span>
                {search && <span style={{ fontSize: 12, color: C.muted }}>Filtered by "{search}"</span>}
              </div>
              <ul style={{ padding: 0, margin: 0 }}>
                {filteredUsers.length === 0 && (
                  <li style={{ padding: "40px 24px", textAlign: "center", color: C.faint, fontSize: 13, listStyle: "none" }}>
                    {search ? `No members match "${search}"` : "No members found"}
                  </li>
                )}
                {filteredUsers.map((user, i) => (
                  <StudentRow
                    key={user._id}
                    user={user}
                    index={i}
                    onAddBalance={setBalanceTarget}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Balance Modal */}
      {balanceTarget && (
        <BalanceModal
          user={balanceTarget}
          onClose={() => setBalanceTarget(null)}
          onSuccess={(amount) => {
            handleBalanceSuccess(balanceTarget._id, amount);
            setBalanceTarget(null);
          }}
        />
      )}
    </div>
  );
}
