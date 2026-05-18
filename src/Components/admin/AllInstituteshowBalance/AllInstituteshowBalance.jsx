import React, { useState, useEffect } from "react";
import axios from "axios";

const AV = {
  purple: { bg: "#EEEDFE", fg: "#3C3489" },
  teal:   { bg: "#E1F5EE", fg: "#085041" },
  amber:  { bg: "#FAEEDA", fg: "#633806" },
  coral:  { bg: "#FAECE7", fg: "#712B13" },
};
const COLORS = ["purple", "teal", "amber", "coral"];

const getInitials = (name = "") => {
  const p = name.trim().split(" ").filter(Boolean);
  if (!p.length) return "?";
  if (p.length === 1) return p[0][0]?.toUpperCase() ?? "?";
  return (p[0][0] + p[p.length - 1][0]).toUpperCase();
};

const Avatar = ({ name, color = "purple", size = 40 }) => {
  const c = AV[color] || AV.purple;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: c.fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 500, fontSize: size * 0.32, flexShrink: 0,
    }}>
      {getInitials(name)}
    </div>
  );
};

const Badge = ({ label, color = "purple" }) => {
  const styles = {
    purple: { bg: "#EEEDFE", fg: "#3C3489" },
    teal:   { bg: "#E1F5EE", fg: "#085041" },
    amber:  { bg: "#FAEEDA", fg: "#633806" },
    coral:  { bg: "#FAECE7", fg: "#712B13" },
  };
  const s = styles[color] || styles.purple;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: s.bg, color: s.fg,
      fontSize: 11, fontWeight: 500, padding: "3px 9px",
      borderRadius: 20, letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
};

const HierarchyCard = ({ name, color = "purple", badgeLabel, meta, count, countLabel = "members", onClick }) => {
  const [hov, setHov] = React.useState(false);
  const c = AV[color] || AV.purple;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `0.5px solid ${hov ? c.fg : "#D3D1C7"}`,
        borderRadius: 12, padding: 18, cursor: "pointer",
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <Avatar name={name} color={color} size={42} />
        <Badge label={badgeLabel} color={color} />
      </div>
      <p style={{ fontSize: 15, fontWeight: 500, color: "#2C2C2A", marginBottom: 3, textTransform: "capitalize" }}>
        {name}
      </p>
      {meta && <p style={{ fontSize: 12, color: "#B4B2A9", marginBottom: 14 }}>{meta}</p>}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "0.5px solid #F1EFE8", paddingTop: 12, marginTop: meta ? 0 : 14,
      }}>
        <span style={{ fontSize: 13, color: "#5F5E5A" }}>
          <span style={{ fontWeight: 500, color: "#2C2C2A" }}>{count}</span> {countLabel}
        </span>
        <span style={{ fontSize: 16, color: hov ? c.fg : "#D3D1C7", transition: "color 0.15s" }}>›</span>
      </div>
    </div>
  );
};

const UserRow = ({ user, index }) => {
  const [hov, setHov] = React.useState(false);
  const color = COLORS[index % COLORS.length];
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
        padding: "13px 18px",
        borderBottom: "0.5px solid #F1EFE8",
        background: hov ? "#FAFAF9" : "transparent",
        transition: "background 0.1s", listStyle: "none",
      }}
    >
      <Avatar name={name} color={color} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#2C2C2A", textTransform: "capitalize" }}>{name}</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, background: "#F1EFE8", color: "#888780", padding: "2px 6px", borderRadius: 4 }}>
            #{user.uid}
          </span>
          {designation && <Badge label={designation} color="purple" />}
          {year && <Badge label={year} color="teal" />}
        </div>
        <p style={{ fontSize: 12, color: "#B4B2A9", margin: 0 }}>
          {user.email}{user.phone ? ` · ${user.phone}` : ""}
        </p>
        {(mess || hall) && (
          <p style={{ fontSize: 12, color: "#B4B2A9", margin: "1px 0 0" }}>
            {[mess, hall].filter(Boolean).join(" › ")}
          </p>
        )}
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        {room ? (
          <>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>Room {room}</p>
            <p style={{ fontSize: 11, color: "#B4B2A9", margin: "2px 0 0" }}>{user.information?.occupation || "—"}</p>
          </>
        ) : (
          <span style={{ fontSize: 12, color: "#D3D1C7" }}>No room</span>
        )}
      </div>
    </li>
  );
};

export default function InstituteUserBrowser() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("institutes");
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedMess, setSelectedMess] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/instituteuser-approved-user")
      .then((r) => setUsers(r.data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const institutes = React.useMemo(() => {
    if (!users) return [];
    const map = {};
    users.forEach((u) => {
      const id = u.institute_id;
      if (!map[id]) map[id] = { id, name: u.information?.name_of_institute || u.information?.name_of_the_mess || `Institute ${id?.slice(-4)}`, type: u.information?.instituteType, users: [] };
      map[id].users.push(u);
    });
    return Object.values(map);
  }, [users]);

  const getMesses = (id) => [...new Set(users?.filter((u) => u.institute_id === id).map((u) => u.information?.name_of_the_mess).filter(Boolean))];
  const getHalls = (id, mess) => [...new Set(users?.filter((u) => u.institute_id === id && u.information?.name_of_the_mess === mess).map((u) => u.information?.name_of_the_hall).filter(Boolean))];
  const getUsers = (id, mess, hall) => users?.filter((u) => u.institute_id === id && (!mess || u.information?.name_of_the_mess === mess) && (!hall || u.information?.name_of_the_hall === hall)) ?? [];
  const countIn = (id, mess, hall) => getUsers(id, mess, hall).length;

  const goHome = () => { setView("institutes"); setSelectedInstitute(null); setSelectedMess(null); setSelectedHall(null); };
  const goInstitute = (inst) => { setSelectedInstitute(inst); setSelectedMess(null); setSelectedHall(null); setView(getMesses(inst.id).length ? "messes" : "users"); };
  const goMess = (mess) => { setSelectedMess(mess); setSelectedHall(null); setView(getHalls(selectedInstitute.id, mess).length ? "halls" : "users"); };
  const goHall = (hall) => { setSelectedHall(hall); setView("users"); };
  const handleBack = () => {
    if (selectedHall) { setSelectedHall(null); setView("halls"); }
    else if (selectedMess && view === "users") { setSelectedMess(null); setView("messes"); }
    else if (view === "halls") { setSelectedMess(null); setView("messes"); }
    else goHome();
  };

  const currentUsers = view === "users" ? getUsers(selectedInstitute?.id, selectedMess, selectedHall) : [];
  const INST_COLORS = ["purple", "teal", "amber"];
  const GRID = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 };

  return (
    <div style={{ minHeight: "100vh", padding: "0 0 48px" }}>

      <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "0.5px solid #F1EFE8" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>Institute browser</h1>
          {users && <Badge label={`${users.length} members`} color="purple" />}
        </div>
        <p style={{ fontSize: 13, color: "#B4B2A9", margin: 0 }}>Explore institutes, messes, halls and their members</p>
      </div>

      {selectedInstitute && (
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, fontSize: 13, flexWrap: "wrap" }}>
          <button onClick={goHome} style={{ background: "none", border: "none", color: "#534AB7", cursor: "pointer", padding: 0, fontWeight: 500, fontSize: 13 }}>All institutes</button>
          <span style={{ color: "#D3D1C7" }}>›</span>
          <button onClick={() => goInstitute(selectedInstitute)} style={{ background: "none", border: "none", padding: 0, fontSize: 13, cursor: selectedMess ? "pointer" : "default", color: selectedMess ? "#534AB7" : "#2C2C2A", fontWeight: selectedMess ? 400 : 500 }}>
            {selectedInstitute.name}
          </button>
          {selectedMess && (
            <>
              <span style={{ color: "#D3D1C7" }}>›</span>
              <button onClick={() => goMess(selectedMess)} style={{ background: "none", border: "none", padding: 0, fontSize: 13, cursor: selectedHall ? "pointer" : "default", color: selectedHall ? "#534AB7" : "#2C2C2A", fontWeight: selectedHall ? 400 : 500 }}>
                {selectedMess}
              </button>
            </>
          )}
          {selectedHall && (
            <>
              <span style={{ color: "#D3D1C7" }}>›</span>
              <span style={{ fontSize: 13, color: "#2C2C2A", fontWeight: 500 }}>{selectedHall}</span>
            </>
          )}
        </nav>
      )}

      {view !== "institutes" && (
        <button
          onClick={handleBack}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "0.5px solid #D3D1C7", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#5F5E5A", cursor: "pointer", marginBottom: 20, fontFamily: "inherit" }}
        >
          ← Back
        </button>
      )}

      {view === "institutes" && (
        <>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B4B2A9", margin: "0 0 4px" }}>Institutes</p>
          <p style={{ fontSize: 13, color: "#888780", margin: "0 0 16px" }}>Select an institute to explore its structure</p>
          {loading && <p style={{ color: "#D3D1C7", fontSize: 13 }}>Loading…</p>}
          <div style={GRID}>
            {institutes.map((inst, i) => {
              const messes = getMesses(inst.id);
              const halls = messes.flatMap((m) => getHalls(inst.id, m));
              const meta = [messes.length ? `${messes.length} mess${messes.length > 1 ? "es" : ""}` : null, halls.length ? `${halls.length} hall${halls.length > 1 ? "s" : ""}` : null].filter(Boolean).join(" · ");
              return (
                <HierarchyCard key={inst.id} name={inst.name} color={INST_COLORS[i % 3]} badgeLabel={inst.type || "Institute"} meta={meta || null} count={inst.users.length} countLabel="members" onClick={() => goInstitute(inst)} />
              );
            })}
          </div>
        </>
      )}

      {view === "messes" && (
        <>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B4B2A9", margin: "0 0 4px" }}>Messes</p>
          <p style={{ fontSize: 13, color: "#888780", margin: "0 0 16px" }}>Inside {selectedInstitute?.name}</p>
          <div style={GRID}>
            {getMesses(selectedInstitute?.id).map((mess) => {
              const halls = getHalls(selectedInstitute.id, mess);
              return (
                <HierarchyCard key={mess} name={mess} color="teal" badgeLabel="Mess" meta={halls.length ? `${halls.length} hall${halls.length > 1 ? "s" : ""}` : null} count={countIn(selectedInstitute.id, mess, null)} countLabel="members" onClick={() => goMess(mess)} />
              );
            })}
          </div>
        </>
      )}

      {view === "halls" && (
        <>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B4B2A9", margin: "0 0 4px" }}>Halls</p>
          <p style={{ fontSize: 13, color: "#888780", margin: "0 0 16px" }}>{selectedMess} · {selectedInstitute?.name}</p>
          <div style={GRID}>
            {getHalls(selectedInstitute?.id, selectedMess).map((hall) => (
              <HierarchyCard key={hall} name={hall} color="amber" badgeLabel="Hall" meta={selectedMess} count={countIn(selectedInstitute.id, selectedMess, hall)} countLabel="members" onClick={() => goHall(hall)} />
            ))}
          </div>
        </>
      )}

      {view === "users" && (
        <>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B4B2A9", margin: "0 0 3px" }}>Members</p>
              <p style={{ fontSize: 13, color: "#888780", margin: 0 }}>{[selectedInstitute?.name, selectedMess, selectedHall].filter(Boolean).join(" › ")}</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {selectedMess && <Badge label={selectedMess} color="teal" />}
              {selectedHall && <Badge label={selectedHall} color="amber" />}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Total members", value: currentUsers.length },
              { label: "With rooms", value: currentUsers.filter((u) => u.information?.room_number).length },
            ].map((s) => (
              <div key={s.label} style={{ background: "#F1EFE8", borderRadius: 8, padding: "10px 14px" }}>
                <p style={{ fontSize: 11, color: "#888780", margin: "0 0 2px" }}>{s.label}</p>
                <p style={{ fontSize: 20, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "0.5px solid #D3D1C7", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "11px 18px", borderBottom: "0.5px solid #F1EFE8" }}>
              <span style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B4B2A9" }}>
                {currentUsers.length} member{currentUsers.length !== 1 ? "s" : ""}
              </span>
            </div>
            <ul style={{ padding: 0, margin: 0 }}>
              {currentUsers.length === 0 && (
                <li style={{ padding: 36, textAlign: "center", color: "#D3D1C7", fontSize: 13, listStyle: "none" }}>No members found</li>
              )}
              {currentUsers.map((user, i) => <UserRow key={user._id} user={user} index={i} />)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
