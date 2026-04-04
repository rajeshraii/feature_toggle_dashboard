import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#080C14", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "#3B82F6", borderRadius: "50%", filter: "blur(80px)", opacity: 0.12, top: -150, left: -100 }} />
        <div style={{ position: "absolute", width: 300, height: 300, background: "#8B5CF6", borderRadius: "50%", filter: "blur(80px)", opacity: 0.12, bottom: -100, right: -50 }} />
      </div>

      {/* Card */}
      <div style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}>
          <div style={{ width: 7, height: 7, background: "#3B82F6", borderRadius: "50%", boxShadow: "0 0 8px #3B82F6" }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Feature Toggle</span>
        </div>

        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: "0.3rem" }}>Create account</h2>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>Start managing your feature flags</p>

        {error && <p style={{ fontSize: "0.8rem", color: "#F87171", marginBottom: "1rem", background: "rgba(239,68,68,0.08)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.15)" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="email" placeholder="Email"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", color: "#E2E8F0", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password" placeholder="Password"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", color: "#E2E8F0", fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit" disabled={loading}
            style={{ background: "#3B82F6", border: "none", borderRadius: 8, padding: "10px", color: "#fff", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginTop: 4, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", marginTop: "1.2rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#60A5FA", textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}