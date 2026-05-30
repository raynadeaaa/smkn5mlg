"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

const jurusanConfig = {
  kayu: { nama: "Kriya Kayu", warna: "#2C1A0E", aksen: "#DABC87" },
  pplg: { nama: "PPLG", warna: "#0A0E1A", aksen: "#5B8CFF" },
  animasi: { nama: "Animasi", warna: "#1A1200", aksen: "#FFD600" },
  tjkt: { nama: "TJKT", warna: "#003D1F", aksen: "#2ECC71" },
  tekstil: { nama: "Tekstil", warna: "#1A1A1A", aksen: "#C8B89A" },
  keramik: { nama: "Keramik", warna: "#002744", aksen: "#7DB8D8" },
  busana: { nama: "Tata Busana", warna: "#4A1500", aksen: "#E85D04" },
  dkv: { nama: "DKV", warna: "#1A0A00", aksen: "#FF3C00" },
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [jurusan, setJurusan] = useState("kayu");
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const j = params.get("jurusan") || "kayu";
      setJurusan(j);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/admin/login");
        return;
      }
      setUser(u);
      try {
        const snap = await getDoc(doc(db, "jurusan", jurusan));
        if (snap.exists()) setData(snap.data());
      } catch (e) {
        console.log(e);
      }
    });
    return () => unsub();
  }, [jurusan]);

  const config = jurusanConfig[jurusan] || jurusanConfig.kayu;

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "jurusan", jurusan), data, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert("Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const updateData = (path, value) => {
    const keys = path.split(".");
    setData((prev) => {
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateArrayItem = (key, index, field, value) => {
    setData((prev) => {
      const arr = [...(prev[key] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  };

  const addArrayItem = (key, template) => {
    setData((prev) => ({ ...prev, [key]: [...(prev[key] || []), template] }));
  };

  const removeArrayItem = (key, index) => {
    setData((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "sejarah", label: "Sejarah" },
    { id: "stats", label: "Statistik" },
    { id: "karya", label: "Karya" },
    { id: "prestasi", label: "Prestasi" },
    { id: "guru", label: "Guru" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", fontFamily: "'Inter', sans-serif", color: "#FAFAFA" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .field-input {
          width: 100%; background: #1A1A1A; border: 1px solid #2A2A2A;
          color: #FAFAFA; padding: 10px 14px; font-size: 14px;
          font-family: inherit; outline: none; border-radius: 4px;
          transition: border-color 0.2s;
        }
        .field-input:focus { border-color: #444; }
        .field-input::placeholder { color: #333; }
        .field-label { color: #666; font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 6px; }
        .tab-btn { background: none; border: none; color: #555; font-size: 13px; padding: 10px 16px; cursor: pointer; font-family: inherit; border-radius: 4px; transition: all 0.15s; white-space: nowrap; }
        .tab-btn:hover { color: #999; background: #1A1A1A; }
        .tab-btn.active { color: #FAFAFA; background: #1A1A1A; border: 1px solid #2A2A2A; }
        .card { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 8px; padding: 20px; margin-bottom: 12px; }
        .btn-add { background: none; border: 1px dashed #333; color: #555; padding: 10px; width: 100%; font-size: 13px; cursor: pointer; border-radius: 4px; font-family: inherit; transition: all 0.15s; }
        .btn-add:hover { border-color: #555; color: #999; }
        .btn-remove { background: none; border: none; color: #555; cursor: pointer; font-size: 18px; line-height: 1; padding: 4px; transition: color 0.15s; }
        .btn-remove:hover { color: #FF6B6B; }
        .field-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
      `}</style>

      {/* TOPBAR */}
      <div style={{ background: "#1A1A1A", borderBottom: "1px solid #2A2A2A", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: config.aksen }}></div>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>{config.nama}</span>
          <span style={{ color: "#444", fontSize: "12px" }}>Dashboard Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href={`/jurusan/${jurusan}`} target="_blank" style={{ color: "#555", fontSize: "12px", textDecoration: "none", padding: "6px 12px", border: "1px solid #2A2A2A", borderRadius: "4px" }}>
            Lihat Website ↗
          </a>
          <button
            onClick={() => {
              signOut(auth);
              router.push("/admin/login");
            }}
            style={{ background: "none", border: "none", color: "#555", fontSize: "12px", cursor: "pointer", padding: "6px 12px" }}
          >
            Keluar
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {/* SIDEBAR TABS */}
        <div style={{ width: "180px", background: "#141414", borderRight: "1px solid #2A2A2A", padding: "16px 8px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto", flexShrink: 0 }}>
          {tabs.map((t) => (
            <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* HERO TAB */}
          {activeTab === "hero" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Hero Section</h2>
              <div className="field-group">
                <label className="field-label">TAGLINE BARIS 1</label>
                <input className="field-input" value={data.hero?.tagline || ""} onChange={(e) => updateData("hero.tagline", e.target.value)} placeholder="Contoh: Membentuk Kayu," />
              </div>
              <div className="field-group">
                <label className="field-label">TAGLINE BARIS 2 (italic)</label>
                <input className="field-input" value={data.hero?.tagline2 || ""} onChange={(e) => updateData("hero.tagline2", e.target.value)} placeholder="Contoh: Menciptakan Karya" />
              </div>
              <div className="field-group">
                <label className="field-label">SUBTITLE</label>
                <input className="field-input" value={data.hero?.subtitle || ""} onChange={(e) => updateData("hero.subtitle", e.target.value)} placeholder="Deskripsi singkat jurusan" />
              </div>
              <div className="field-group">
                <label className="field-label">URL FOTO HERO (dari folder /public/images/{jurusan}/)</label>
                <input className="field-input" value={data.hero?.heroImage || ""} onChange={(e) => updateData("hero.heroImage", e.target.value)} placeholder={`/images/${jurusan}/hero.jpg`} />
              </div>
            </div>
          )}

          {/* SEJARAH TAB */}
          {activeTab === "sejarah" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Sejarah Jurusan</h2>
              <div className="field-group">
                <label className="field-label">TAHUN BERDIRI</label>
                <input className="field-input" value={data.sejarah?.tahun || ""} onChange={(e) => updateData("sejarah.tahun", e.target.value)} placeholder="1978" />
              </div>
              <div className="field-group">
                <label className="field-label">JUDUL SEJARAH</label>
                <input className="field-input" value={data.sejarah?.judul || ""} onChange={(e) => updateData("sejarah.judul", e.target.value)} placeholder="Warisan Keahlian Sejati" />
              </div>
              <div className="field-group">
                <label className="field-label">TEKS SEJARAH</label>
                <textarea className="field-input" rows={6} value={data.sejarah?.teks || ""} onChange={(e) => updateData("sejarah.teks", e.target.value)} placeholder="Tulis sejarah jurusan di sini..." style={{ resize: "vertical" }} />
              </div>
              <div className="field-group">
                <label className="field-label">URL FOTO SEJARAH</label>
                <input className="field-input" value={data.sejarah?.image || ""} onChange={(e) => updateData("sejarah.image", e.target.value)} placeholder={`/images/${jurusan}/sejarah.jpg`} />
              </div>
            </div>
          )}

          {/* STATS TAB */}
          {activeTab === "stats" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Statistik / Angka</h2>
              {(data.stats || []).map((s, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ color: "#555", fontSize: "12px" }}>Stat #{i + 1}</span>
                    <button className="btn-remove" onClick={() => removeArrayItem("stats", i)}>
                      ×
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label className="field-label">ANGKA</label>
                      <input className="field-input" value={s.angka} onChange={(e) => updateArrayItem("stats", i, "angka", e.target.value)} placeholder="200+" />
                    </div>
                    <div>
                      <label className="field-label">LABEL</label>
                      <input className="field-input" value={s.label} onChange={(e) => updateArrayItem("stats", i, "label", e.target.value)} placeholder="Alumni Profesional" />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={() => addArrayItem("stats", { angka: "", label: "" })}>
                + Tambah Statistik
              </button>
            </div>
          )}

          {/* KARYA TAB */}
          {activeTab === "karya" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Hasil Karya</h2>
              {(data.karya || []).map((k, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#555", fontSize: "12px" }}>Karya #{i + 1}</span>
                    <button className="btn-remove" onClick={() => removeArrayItem("karya", i)}>
                      ×
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label className="field-label">JUDUL KARYA</label>
                      <input className="field-input" value={k.judul} onChange={(e) => updateArrayItem("karya", i, "judul", e.target.value)} placeholder="Nama karya" />
                    </div>
                    <div>
                      <label className="field-label">TAHUN</label>
                      <input className="field-input" value={k.tahun} onChange={(e) => updateArrayItem("karya", i, "tahun", e.target.value)} placeholder="2024" />
                    </div>
                    <div>
                      <label className="field-label">URL FOTO</label>
                      <input className="field-input" value={k.image} onChange={(e) => updateArrayItem("karya", i, "image", e.target.value)} placeholder={`/images/${jurusan}/karya${i + 1}.jpg`} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={() => addArrayItem("karya", { judul: "", tahun: "", image: "" })}>
                + Tambah Karya
              </button>
            </div>
          )}

          {/* PRESTASI TAB */}
          {activeTab === "prestasi" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Prestasi</h2>
              {(data.prestasi || []).map((p, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#555", fontSize: "12px" }}>Prestasi #{i + 1}</span>
                    <button className="btn-remove" onClick={() => removeArrayItem("prestasi", i)}>
                      ×
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label className="field-label">NAMA PRESTASI</label>
                      <input className="field-input" value={p.judul} onChange={(e) => updateArrayItem("prestasi", i, "judul", e.target.value)} placeholder="Juara 1 LKS Nasional" />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label className="field-label">TAHUN</label>
                        <input className="field-input" value={p.tahun} onChange={(e) => updateArrayItem("prestasi", i, "tahun", e.target.value)} placeholder="2024" />
                      </div>
                      <div>
                        <label className="field-label">TINGKAT</label>
                        <input className="field-input" value={p.tingkat} onChange={(e) => updateArrayItem("prestasi", i, "tingkat", e.target.value)} placeholder="Nasional / Provinsi / Kota" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={() => addArrayItem("prestasi", { judul: "", tahun: "", tingkat: "" })}>
                + Tambah Prestasi
              </button>
            </div>
          )}

          {/* GURU TAB */}
          {activeTab === "guru" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Guru Pengajar</h2>
              {(data.guru || []).map((g, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#555", fontSize: "12px" }}>Guru #{i + 1}</span>
                    <button className="btn-remove" onClick={() => removeArrayItem("guru", i)}>
                      ×
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label className="field-label">NAMA LENGKAP</label>
                      <input className="field-input" value={g.nama} onChange={(e) => updateArrayItem("guru", i, "nama", e.target.value)} placeholder="Bapak/Ibu ..." />
                    </div>
                    <div>
                      <label className="field-label">JABATAN</label>
                      <input className="field-input" value={g.jabatan} onChange={(e) => updateArrayItem("guru", i, "jabatan", e.target.value)} placeholder="Ketua Jurusan / Guru Praktik" />
                    </div>
                    <div>
                      <label className="field-label">URL FOTO</label>
                      <input className="field-input" value={g.image} onChange={(e) => updateArrayItem("guru", i, "image", e.target.value)} placeholder={`/images/${jurusan}/guru${i + 1}.jpg`} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={() => addArrayItem("guru", { nama: "", jabatan: "", image: "" })}>
                + Tambah Guru
              </button>
            </div>
          )}

          {/* FASILITAS TAB */}
          {activeTab === "fasilitas" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Fasilitas</h2>
              {(data.fasilitas || []).map((f, i) => (
                <div key={i} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ color: "#555", fontSize: "12px" }}>Fasilitas #{i + 1}</span>
                    <button className="btn-remove" onClick={() => removeArrayItem("fasilitas", i)}>
                      ×
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label className="field-label">NAMA FASILITAS</label>
                      <input className="field-input" value={f.nama} onChange={(e) => updateArrayItem("fasilitas", i, "nama", e.target.value)} placeholder="Workshop Kayu" />
                    </div>
                    <div>
                      <label className="field-label">DESKRIPSI</label>
                      <textarea className="field-input" rows={3} value={f.desc} onChange={(e) => updateArrayItem("fasilitas", i, "desc", e.target.value)} placeholder="Deskripsi fasilitas..." style={{ resize: "vertical" }} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={() => addArrayItem("fasilitas", { nama: "", desc: "" })}>
                + Tambah Fasilitas
              </button>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "20px", color: "#999" }}>Informasi Kontak</h2>
              {[
                { key: "contact.alamat", label: "ALAMAT", placeholder: "Jl. ..." },
                { key: "contact.telepon", label: "TELEPON", placeholder: "(0341) ..." },
                { key: "contact.email", label: "EMAIL", placeholder: "jurusan@smkn5malang.sch.id" },
                { key: "contact.jamOperasional", label: "JAM OPERASIONAL", placeholder: "Senin – Jumat: 07.00 – 16.00 WIB" },
              ].map((f, i) => (
                <div key={i} className="field-group">
                  <label className="field-label">{f.label}</label>
                  <input className="field-input" value={data.contact?.[f.key.split(".")[1]] || ""} onChange={(e) => updateData(f.key, e.target.value)} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAVE PANEL */}
        <div style={{ width: "200px", background: "#141414", borderLeft: "1px solid #2A2A2A", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: saved ? "#1A3A1A" : config.aksen,
              color: saved ? "#4ADE80" : config.warna,
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              letterSpacing: "0.05em",
            }}
          >
            {saving ? "Menyimpan..." : saved ? "✓ Tersimpan!" : "Simpan"}
          </button>
          <div style={{ borderTop: "1px solid #2A2A2A", paddingTop: "12px" }}>
            <p style={{ color: "#444", fontSize: "11px", lineHeight: 1.6 }}>Perubahan akan langsung tampil di website setelah disimpan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
