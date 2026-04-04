import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", background: "#080C14", height: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", color: "#E2E8F0" },
  bg: { position: "fixed", inset: 0, zIndex: 0 },
  grid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" },
  orb1: { position: "absolute", width: 400, height: 400, background: "#3B82F6", borderRadius: "50%", filter: "blur(80px)", opacity: 0.12, top: -150, left: -100 },
  orb2: { position: "absolute", width: 300, height: 300, background: "#8B5CF6", borderRadius: "50%", filter: "blur(80px)", opacity: 0.12, bottom: -100, right: -50 },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,12,20,0.9)", backdropFilter: "blur(20px)", position: "relative", zIndex: 10 },
  logo: { fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8 },
  logoDot: { width: 7, height: 7, background: "#3B82F6", borderRadius: "50%", boxShadow: "0 0 8px #3B82F6" },
  userBadge: { fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)" },
  btnLogout: { fontSize: "0.75rem", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#F87171", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  body: { display: "grid", gridTemplateColumns: "220px 1fr", flex: 1, overflow: "hidden", position: "relative", zIndex: 1 },
  sidebar: { borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem", overflowY: "auto" },
  sectionLabel: { fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", fontWeight: 600 },
  envAdd: { display: "flex", gap: 6 },
  inputSm: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, padding: "6px 10px", color: "#E2E8F0", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", flex: 1, outline: "none" },
  btnBlue: { background: "#3B82F6", border: "none", borderRadius: 7, padding: "6px 12px", color: "#fff", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" },
  envList: { display: "flex", flexDirection: "column", gap: 4 },
  content: { padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflow: "hidden" },
  contentHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  contentTitle: { fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#fff" },
  stats: { display: "flex", gap: 6 },
  stat: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "5px 14px", textAlign: "center" },
  statNum: { fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff" },
  statLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" },
  addForm: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "0.8rem 1rem", display: "flex", gap: 8, alignItems: "center" },
  inputNum: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, padding: "6px 10px", color: "#E2E8F0", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", width: 90, outline: "none" },
  features: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 7 },
  featCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 11, padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
  featName: { fontFamily: "'Syne', sans-serif", fontSize: "0.88rem", fontWeight: 500, color: "#E2E8F0" },
  featDesc: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: 2 },
  rolloutPill: { fontSize: "0.68rem", padding: "2px 8px", borderRadius: 20, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.18)", color: "#A78BFA", marginTop: 4, display: "inline-block" },
  featActions: { display: "flex", alignItems: "center", gap: 10 },
  btnDel: { background: "none", border: "none", color: "rgba(255,255,255,0.18)", cursor: "pointer", fontSize: "0.85rem", padding: 3 },
  empty: { textAlign: "center", padding: "2rem", color: "rgba(255,255,255,0.18)", fontSize: "0.85rem" },
};

function EnvItem({ env, selected, onClick, count }) {
  return (
    <div onClick={onClick} style={{ padding: "7px 10px", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem", border: `1px solid ${selected ? "rgba(59,130,246,0.2)" : "transparent"}`, background: selected ? "rgba(59,130,246,0.1)" : "transparent", color: selected ? "#93C5FD" : "#E2E8F0", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: selected ? "#3B82F6" : "rgba(255,255,255,0.15)", boxShadow: selected ? "0 0 5px #3B82F6" : "none", flexShrink: 0 }} />
      {env.name}
      <span style={{ marginLeft: "auto", fontSize: "0.68rem", background: "rgba(255,255,255,0.07)", padding: "1px 7px", borderRadius: 10, color: "rgba(255,255,255,0.35)" }}>{count}</span>
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width: 42, height: 23, borderRadius: 12, background: on ? "#3B82F6" : "rgba(255,255,255,0.1)", boxShadow: on ? "0 0 10px rgba(59,130,246,0.35)" : "none", cursor: "pointer", position: "relative", transition: "all 0.3s", flexShrink: 0 }}>
      <div style={{ position: "absolute", width: 17, height: 17, borderRadius: "50%", background: "#fff", top: 3, left: on ? 22 : 3, transition: "left 0.3s" }} />
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [environments, setEnvironments] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [newEnv, setNewEnv] = useState("");
  const [newFeature, setNewFeature] = useState({ name: "", description: "", enabled: false, rolloutPercentage: 100, environmentId: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchEnvironments(); }, []);
  useEffect(() => { if (selectedEnv) fetchFeatures(selectedEnv); }, [selectedEnv]);

  const fetchEnvironments = async () => {
    const res = await api.get("/environments");
    setEnvironments(res.data);
    if (res.data.length > 0) {
      setSelectedEnv(res.data[0].id);
      setNewFeature(f => ({ ...f, environmentId: res.data[0].id }));
    }
  };

  const fetchFeatures = async (envId) => {
    const res = await api.get(`/features/env/${envId}`);
    setFeatures(res.data);
  };

  const createEnvironment = async () => {
    if (!newEnv.trim()) return;
    await api.post("/environments", { name: newEnv });
    setNewEnv("");
    fetchEnvironments();
  };

  const createFeature = async () => {
    if (!newFeature.name.trim()) return;
    setLoading(true);
    await api.post("/features", newFeature);
    setNewFeature({ name: "", description: "", enabled: false, rolloutPercentage: 100, environmentId: selectedEnv });
    fetchFeatures(selectedEnv);
    setLoading(false);
  };

  const toggleFeature = async (id) => {
    await api.patch(`/features/${id}/toggle`);
    fetchFeatures(selectedEnv);
  };

  const deleteFeature = async (id) => {
    await api.delete(`/features/${id}`);
    fetchFeatures(selectedEnv);
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const activeCount = features.filter(f => f.enabled).length;

  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={s.bg}>
        <div style={s.grid} />
        <div style={s.orb1} />
        <div style={s.orb2} />
      </div>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.logo}><div style={s.logoDot} />Feature Toggle</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={s.userBadge}>{user?.email}</div>
          <button style={s.btnLogout} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div style={s.body}>
        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.sectionLabel}>Environments</div>
          <div style={s.envAdd}>
            <input style={s.inputSm} placeholder="New env..." value={newEnv} onChange={e => setNewEnv(e.target.value)} onKeyDown={e => e.key === "Enter" && createEnvironment()} />
            <button style={s.btnBlue} onClick={createEnvironment}>Add</button>
          </div>
          <div style={s.envList}>
            {environments.map(env => (
              <EnvItem key={env.id} env={env} selected={selectedEnv === env.id} count={selectedEnv === env.id ? features.length : "?"} onClick={() => { setSelectedEnv(env.id); setNewFeature(f => ({ ...f, environmentId: env.id })); }} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={s.content}>
          <div style={s.contentHeader}>
            <div style={s.contentTitle}>{environments.find(e => e.id === selectedEnv)?.name || "Select environment"}</div>
            <div style={s.stats}>
              <div style={s.stat}><div style={s.statNum}>{features.length}</div><div style={s.statLabel}>Total</div></div>
              <div style={s.stat}><div style={s.statNum}>{activeCount}</div><div style={s.statLabel}>Active</div></div>
            </div>
          </div>

          {selectedEnv && (
            <div style={s.addForm}>
              <input style={{ ...s.inputSm, flex: 1 }} placeholder="Feature name" value={newFeature.name} onChange={e => setNewFeature({ ...newFeature, name: e.target.value })} />
              <input style={{ ...s.inputSm, flex: 1 }} placeholder="Description" value={newFeature.description} onChange={e => setNewFeature({ ...newFeature, description: e.target.value })} />
              <input style={s.inputNum} type="number" placeholder="Rollout %" min="0" max="100" value={newFeature.rolloutPercentage} onChange={e => setNewFeature({ ...newFeature, rolloutPercentage: parseInt(e.target.value) })} />
              <button style={s.btnBlue} onClick={createFeature} disabled={loading}>{loading ? "Adding..." : "Add"}</button>
            </div>
          )}

          <div style={s.features}>
            {features.length === 0 ? (
              <div style={s.empty}>{selectedEnv ? "No features yet. Add one above!" : "Select an environment to manage features"}</div>
            ) : (
              features.map(feature => (
                <div key={feature.id} style={s.featCard}>
                  <div>
                    <div style={s.featName}>{feature.name}</div>
                    <div style={s.featDesc}>{feature.description}</div>
                    <span style={s.rolloutPill}>Rollout {feature.rolloutPercentage}%</span>
                  </div>
                  <div style={s.featActions}>
                    <Toggle on={feature.enabled} onClick={() => toggleFeature(feature.id)} />
                    <button style={s.btnDel} onClick={() => deleteFeature(feature.id)}>✕</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}