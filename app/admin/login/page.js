"use client";
import { useState } from "react";
import { auth, db } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const jurusanList = {
    "admin.kayu@smkn5mlg.sch.id": "kayu",
    "admin.pplg@smkn5mlg.sch.id": "pplg",
    "admin.animasi@smkn5mlg.sch.id": "animasi",
    "admin.tjkt@smkn5mlg.sch.id": "tjkt",
    "admin.tekstil@smkn5mlg.sch.id": "tekstil",
    "admin.keramik@smkn5mlg.sch.id": "keramik",
    "admin.busana@smkn5mlg.sch.id": "busana",
    "admin.dkv@smkn5mlg.sch.id": "dkv",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const jurusan = jurusanList[email];
      if (jurusan) {
        router.push(`/admin/dashboard?jurusan=${jurusan}`);
      } else {
        setError("Email tidak terdaftar sebagai admin jurusan.");
      }
    } catch (err) {
      setError("Email atau password salah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: "20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .input-field {
          width: 100%;
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          color: #FAFAFA;
          padding: 14px 16px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          border-radius: 4px;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #555; }
        .input-field::placeholder { color: #444; }
        .btn-login {
          width: 100%;
          background: #FAFAFA;
          color: #0A0A0A;
          border: none;
          padding: 14px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s;
          font-family: inherit;
        }
        .btn-login:hover { background: #E0E0E0; }
        .btn-login:disabled { background: #333; color: #666; cursor: not-allowed; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ width: "48px", height: "48px", background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span style={{ color: "#888", fontSize: "20px" }}>⚙</span>
          </div>
          <h1 style={{ color: "#FAFAFA", fontSize: "20px", fontWeight: "500", marginBottom: "6px" }}>Admin Panel</h1>
          <p style={{ color: "#555", fontSize: "13px", letterSpacing: "0.05em" }}>SMK NEGERI 5 MALANG</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ color: "#666", fontSize: "11px", letterSpacing: "0.12em", display: "block", marginBottom: "8px" }}>EMAIL</label>
            <input type="email" className="input-field" placeholder="admin.jurusan@smkn5mlg.sch.id" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label style={{ color: "#666", fontSize: "11px", letterSpacing: "0.12em", display: "block", marginBottom: "8px" }}>PASSWORD</label>
            <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && (
            <div style={{ background: "#1A0A0A", border: "1px solid #3A1A1A", borderRadius: "4px", padding: "12px 16px" }}>
              <p style={{ color: "#FF6B6B", fontSize: "13px" }}>{error}</p>
            </div>
          )}

          <button type="submit" className="btn-login" disabled={loading} style={{ marginTop: "8px" }}>
            {loading ? "MEMPROSES..." : "MASUK →"}
          </button>
        </form>

        {/* Back link */}
        <p style={{ textAlign: "center", marginTop: "32px" }}>
          <a href="/" style={{ color: "#444", fontSize: "12px", textDecoration: "none", letterSpacing: "0.08em" }}>
            ← Kembali ke Portal
          </a>
        </p>
      </div>
    </div>
  );
}
