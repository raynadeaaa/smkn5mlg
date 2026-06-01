"use client";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const defaultData = {
  hero: {
    tagline: "Bergerak.",
    tagline2: "Bercerita.",
    tagline3: "Berdampak.",
    subtitle: "Jurusan Animasi — SMK Negeri 5 Malang",
    heroImage: "/images/animasi/awal.jpeg",
  },
  sejarah: {
    tahun: "2010",
    judul: "Studio Animasi di Jantung Malang",
    teks: "Jurusan Animasi SMK Negeri 5 Malang hadir untuk mencetak animator profesional yang siap terjun ke industri kreatif. Kami mengajarkan animasi 2D, 3D, desain karakter, storyboard, hingga game art — semua dalam ekosistem belajar yang dinamis dan penuh kreativitas.",
    image: "/images/animasi/sejarah.jpeg",
  },
  stats: [
    { angka: "15+", label: "Tahun Berdiri" },
    { angka: "6", label: "Guru Kreatif" },
    { angka: "4", label: "Karya Unggulan" },
    { angka: "2", label: "Juara LKS" },
  ],
  karya: [
    { judul: "Animasi 2D Pendek", tahun: "2025", image: "/images/animasi/karya1.jpeg" },
    { judul: "3D Character Design", tahun: "2025", image: "/images/animasi/karya2.jpeg" },
    { judul: "Game Art 3D", tahun: "2024", image: "/images/animasi/karya3.jpeg" },
    { judul: "Motion Graphics", tahun: "2024", image: "/images/animasi/karya4.jpeg" },
  ],
  prestasi: [
    { judul: "Juara 1 LKS Animasi", tingkat: "Nasional", keterangan: "Kompetisi Animasi", image: "/images/animasi/prestasi1.jpeg" },
    { judul: "Juara 1 LKS 3D Game Art", tahun: "2026", tingkat: "Nasional", keterangan: "3D Game Art", image: "/images/animasi/prestasi2.jpeg" },
  ],
  guru: [
    { nama: "Bu Arie", jabatan: "Kepala Jurusan Animasi", image: "" },
    { nama: "Pak Risky", jabatan: "Guru Animasi 3D", image: "" },
    { nama: "Bu Rosa", jabatan: "Guru Desain Karakter", image: "/images/animasi/guru3.jpg" },
    { nama: "Pak Agung", jabatan: "Guru Animasi 2D", image: "/images/animasi/guru4.jpg" },
    { nama: "Pak Dennis", jabatan: "Guru Game Art", image: "/images/animasi/guru5.jpg" },
    { nama: "Bu Widya", jabatan: "Guru Storyboard & Visual", image: "/images/animasi/guru6.jpg" },
  ],
  keahlian: [
    { nama: "Animasi 2D", desc: "Membuat animasi frame-by-frame dan motion menggunakan software industri seperti Adobe Animate.", icon: "▶" },
    { nama: "Animasi 3D", desc: "Modeling, rigging, texturing, dan rendering karakter dan objek 3D dengan Blender & Maya.", icon: "◈" },
    { nama: "Game Art", desc: "Merancang aset visual untuk game — karakter, environment, UI, dan efek visual.", icon: "◉" },
    { nama: "Motion Graphics", desc: "Membuat konten gerak untuk media sosial, iklan, dan presentasi visual.", icon: "◎" },
    { nama: "Storyboard", desc: "Visualisasi cerita frame by frame sebagai panduan produksi animasi dan film.", icon: "▣" },
    { nama: "Desain Karakter", desc: "Menciptakan karakter orisinal dari konsep awal hingga siap diproduksi.", icon: "◇" },
  ],
  fasilitas: [
    { nama: "Studio Animasi", desc: "Ruang produksi animasi dengan workstation bertenaga tinggi dan software Adobe Creative Cloud", icon: "🎬" },
    { nama: "Lab 3D & Game", desc: "Lab khusus pembuatan aset 3D dan game art dengan Blender, Maya, dan Unity", icon: "🎮" },
    { nama: "Ruang Storyboard", desc: "Area brainstorming dan visual storytelling dengan papan cerita besar dan peralatan menggambar", icon: "✏️" },
    { nama: "Screening Room", desc: "Ruang pemutaran karya animasi siswa dengan layar besar dan sistem audio berkualitas", icon: "🖥️" },
  ],
  contact: {
    alamat: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142",
    telepon: "(0341) 478195",
    email: "animasi@smkn5malang.sch.id",
    jamOperasional: "Senin – Jumat: 07.00 – 16.00 WIB",
  },
};

export default function JurusanAnimasi() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "jurusan", "animasi"));
        if (snap.exists()) setData({ ...defaultData, ...snap.data() });
      } catch (e) {
        console.log("data default");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleKirimWA = () => {
    const { nama, hp, keperluan, pesan } = formData;
    if (!nama || !hp) {
      alert("Nama dan nomor HP wajib diisi.");
      return;
    }
    const text = `Halo Animasi SMK Negeri 5 Malang!%0A%0A*Nama:* ${nama}%0A*No. HP:* ${hp}%0A*Keperluan:* ${keperluan || "-"}%0A*Pesan:* ${pesan || "-"}`;
    window.open(`https://wa.me/6285732453696?text=${text}`, "_blank");
  };

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D0D" }}>
        <p style={{ color: "#FF6B2B", letterSpacing: "0.3em", fontSize: "12px", fontFamily: "monospace" }}>LOADING...</p>
      </div>
    );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D0D0D", color: "#F5F5F5", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .section { padding: 120px 0; }
        .nav-link { color: #F5F5F5; text-decoration: none; font-size: 12px; letter-spacing: 0.08em; opacity: 0.4; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; color: #FF6B2B; }
        .karya-card { position: relative; overflow: hidden; cursor: pointer; }
        .karya-card img { transition: transform 0.6s ease; }
        .karya-card:hover img { transform: scale(1.08); }
        .karya-card:hover .karya-overlay { opacity: 1; }
        .karya-overlay { opacity: 0; transition: opacity 0.4s; }
        .guru-card:hover { background: #1A1A1A !important; transform: translateY(-4px); }
        .guru-card { transition: transform 0.3s, background 0.3s; }
        .keahlian-item:hover { background: #FF6B2B !important; }
        .keahlian-item:hover p { color: #fff !important; opacity: 1 !important; }
        .keahlian-item { transition: background 0.25s; cursor: pointer; }
        @media (max-width: 768px) {
          .container { padding: 0 24px; }
          .section { padding: 60px 0; }
          .hero-title { font-size: 64px !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .karya-grid { grid-template-columns: 1fr !important; }
          .guru-grid { grid-template-columns: repeat(2,1fr) !important; }
          .keahlian-grid { grid-template-columns: repeat(2,1fr) !important; }
          .fasilitas-grid { grid-template-columns: 1fr !important; }
          .prestasi-img { display: none !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(13,13,13,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,107,43,0.1)",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "24px", background: "#FF6B2B", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif" }}>AN</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700, color: "#F5F5F5", letterSpacing: "0.08em" }}>ANIMASI</p>
            <p style={{ fontSize: "9px", color: "#FF6B2B", letterSpacing: "0.12em", opacity: 0.7 }}>SMKN 5 MALANG</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Tentang", "Keahlian", "Karya", "Prestasi", "Guru", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/admin/login?jurusan=animasi" style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "#FF6B2B", textDecoration: "none", border: "1px solid rgba(255,107,43,0.4)", padding: "6px 14px", letterSpacing: "0.08em" }}>
          ADMIN
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "56px", position: "relative", overflow: "hidden", background: "#0D0D0D" }}>
        {data.hero.heroImage && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={data.hero.heroImage} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0D0D0D 30%, rgba(13,13,13,0.3) 100%)" }}></div>
          </div>
        )}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.15) 0%, transparent 70%)", zIndex: 1 }}></div>
        <div style={{ position: "absolute", top: "30%", left: "60%", width: "2px", height: "200px", background: "linear-gradient(to bottom, transparent, #FF6B2B, transparent)", zIndex: 1 }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "80px" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", letterSpacing: "0.3em", color: "#FF6B2B", marginBottom: "24px", opacity: 0.8 }}>SMK NEGERI 5 MALANG — JURUSAN ANIMASI</p>
          <h1 className="hero-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: "120px", fontWeight: 800, color: "#F5F5F5", lineHeight: 0.9, marginBottom: "0" }}>
            {data.hero.tagline}
          </h1>
          <h1 className="hero-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: "120px", fontWeight: 800, color: "#FF6B2B", lineHeight: 0.9, marginBottom: "0" }}>
            {data.hero.tagline2}
          </h1>
          <h1 className="hero-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: "120px", fontWeight: 800, color: "#F5F5F5", lineHeight: 0.9, marginBottom: "48px" }}>
            {data.hero.tagline3}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
            <p style={{ color: "rgba(245,245,245,0.5)", fontSize: "15px", lineHeight: 1.7, maxWidth: "400px", fontWeight: 300 }}>{data.hero.subtitle}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#FF6B2B", color: "#fff", border: "none", padding: "13px 32px", fontSize: "12px", letterSpacing: "0.15em", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}
              >
                LIHAT KARYA
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#F5F5F5", border: "1px solid rgba(245,245,245,0.2)", padding: "12px 32px", fontSize: "12px", letterSpacing: "0.15em", cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
              >
                KONTAK
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,107,43,0.15)", background: "rgba(13,13,13,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
              {data.stats.map((s, i) => (
                <div key={i} style={{ padding: "24px 32px", borderRight: i < 3 ? "1px solid rgba(255,107,43,0.1)" : "none", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 800, color: "#FF6B2B", lineHeight: 1 }}>{s.angka}</p>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(245,245,245,0.4)", marginTop: "4px" }}>{s.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="section">
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "#FF6B2B", marginBottom: "20px" }}>TENTANG KAMI</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, lineHeight: 1.1, marginBottom: "28px" }}>{data.sejarah.judul}</h2>
              <div style={{ width: "40px", height: "3px", background: "#FF6B2B", marginBottom: "24px" }}></div>
              <p style={{ color: "rgba(245,245,245,0.6)", lineHeight: 1.9, fontSize: "15px", fontWeight: 300 }}>{data.sejarah.teks}</p>
              <p style={{ marginTop: "32px", fontSize: "10px", letterSpacing: "0.2em", color: "#FF6B2B", opacity: 0.7 }}>BERDIRI SEJAK {data.sejarah.tahun}</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", background: "#1A1A1A", overflow: "hidden" }}>
                {data.sejarah.image ? (
                  <img src={data.sejarah.image} alt="Sejarah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1A1A1A, #2A1500)" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "80px", fontWeight: 800, color: "rgba(255,107,43,0.1)" }}>ANIM</span>
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", bottom: "24px", right: "-24px", background: "#FF6B2B", padding: "20px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{data.sejarah.tahun}</p>
                <p style={{ fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>EST.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEAHLIAN */}
      <section id="keahlian" style={{ background: "#111111", padding: "120px 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "#FF6B2B", marginBottom: "20px" }}>YANG DIPELAJARI</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, marginBottom: "56px" }}>Keahlian Kami</h2>
          <div className="keahlian-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
            {data.keahlian.map((k, i) => (
              <div key={i} className="keahlian-item" style={{ background: "#1A1A1A", padding: "40px 32px" }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", color: "#FF6B2B", marginBottom: "16px", opacity: 0.7 }}>{k.icon}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#F5F5F5", marginBottom: "10px" }}>{k.nama}</p>
                <p style={{ color: "rgba(245,245,245,0.45)", fontSize: "13px", lineHeight: 1.7, fontWeight: 300 }}>{k.desc}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "#FF6B2B", marginTop: "20px", opacity: 0.4 }}>0{i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="section">
        <div className="container">
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "#FF6B2B", marginBottom: "20px" }}>PORTOFOLIO</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, marginBottom: "48px" }}>Hasil Karya</h2>

          {/* Baris 1: 1 besar + 1 kecil */}
          <div className="karya-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "3px", marginBottom: "3px" }}>
            <div className="karya-card" style={{ background: "#1A1A1A", minHeight: "420px" }}>
              {data.karya[0]?.image ? (
                <img src={data.karya[0].image} alt={data.karya[0].judul} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "420px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1A1A1A, #2A1500)" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, color: "rgba(255,107,43,0.15)" }}>2D</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.75)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px" }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", color: "#FF6B2B", letterSpacing: "0.15em", marginBottom: "8px" }}>{data.karya[0]?.tahun}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 800, color: "#F5F5F5" }}>{data.karya[0]?.judul}</p>
              </div>
            </div>
            <div className="karya-card" style={{ background: "#1A1A1A", minHeight: "420px" }}>
              {data.karya[1]?.image ? (
                <img src={data.karya[1].image} alt={data.karya[1].judul} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "420px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1E1200" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "40px", fontWeight: 800, color: "rgba(255,107,43,0.15)" }}>3D</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.75)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", color: "#FF6B2B", letterSpacing: "0.15em", marginBottom: "8px" }}>{data.karya[1]?.tahun}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "#F5F5F5" }}>{data.karya[1]?.judul}</p>
              </div>
            </div>
          </div>

          {/* Baris 2: 1 kecil + 1 besar */}
          <div className="karya-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3px" }}>
            <div className="karya-card" style={{ background: "#1A1A1A", minHeight: "320px" }}>
              {data.karya[2]?.image ? (
                <img src={data.karya[2].image} alt={data.karya[2].judul} style={{ width: "100%", height: "320px", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1A0E00" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 800, color: "rgba(255,107,43,0.15)" }}>GAME</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.75)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", color: "#FF6B2B", letterSpacing: "0.15em", marginBottom: "8px" }}>{data.karya[2]?.tahun}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "#F5F5F5" }}>{data.karya[2]?.judul}</p>
              </div>
            </div>
            <div className="karya-card" style={{ background: "#1A1A1A", minHeight: "320px" }}>
              {data.karya[3]?.image ? (
                <img src={data.karya[3].image} alt={data.karya[3].judul} style={{ width: "100%", height: "320px", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", background: "#150A00" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "40px", fontWeight: 800, color: "rgba(255,107,43,0.15)" }}>MOTION</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.75)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px" }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", color: "#FF6B2B", letterSpacing: "0.15em", marginBottom: "8px" }}>{data.karya[3]?.tahun}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 800, color: "#F5F5F5" }}>{data.karya[3]?.judul}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section id="prestasi" style={{ background: "#FF6B2B", padding: "80px 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(13,13,13,0.6)", marginBottom: "20px" }}>PENCAPAIAN</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, color: "#0D0D0D", marginBottom: "48px" }}>Prestasi Kami</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {data.prestasi.map((p, i) => (
              <div key={i} style={{ background: "rgba(13,13,13,0.12)", display: "flex", alignItems: "stretch", overflow: "hidden" }}>
                {/* Gambar prestasi */}
                {p.image && (
                  <div className="prestasi-img" style={{ width: "140px", flexShrink: 0, overflow: "hidden" }}>
                    <img src={p.image} alt={p.judul} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                )}
                {/* Konten */}
                <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: "32px", flex: 1 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, color: "rgba(13,13,13,0.15)", minWidth: "80px" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D0D0D", marginBottom: "4px" }}>{p.judul}</p>
                    <p style={{ fontSize: "13px", color: "rgba(13,13,13,0.6)" }}>{p.keterangan}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", padding: "5px 14px", background: "#0D0D0D", color: "#FF6B2B", letterSpacing: "0.1em" }}>{p.tingkat.toUpperCase()}</span>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0D0D0D", marginTop: "6px" }}>{p.tahun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section id="guru" style={{ background: "#111111", padding: "120px 0" }}>
        <div className="container">
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "#FF6B2B", marginBottom: "20px" }}>TIM KREATIF</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, marginBottom: "56px" }}>Guru Pengajar</h2>
          <div className="guru-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
            {data.guru.map((g, i) => (
              <div key={i} className="guru-card" style={{ background: "#1A1A1A", padding: "0", overflow: "hidden" }}>
                <div style={{ aspectRatio: "4/3", background: i === 0 ? "#2A1500" : "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                  {g.image ? (
                    <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, color: i === 0 ? "rgba(255,107,43,0.25)" : "rgba(255,107,43,0.1)" }}>{g.nama.split(" ").pop().charAt(0).toUpperCase()}</span>
                      {i === 0 && <div style={{ position: "absolute", inset: 0, border: "3px solid #FF6B2B", pointerEvents: "none" }}></div>}
                    </>
                  )}
                </div>
                <div style={{ padding: "20px 24px", borderTop: i === 0 ? "3px solid #FF6B2B" : "1px solid rgba(255,107,43,0.1)" }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#F5F5F5", marginBottom: "4px" }}>{g.nama}</p>
                  <p style={{ fontSize: "12px", color: i === 0 ? "#FF6B2B" : "rgba(245,245,245,0.45)", letterSpacing: "0.04em" }}>{g.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" className="section" style={{ background: "#0D0D0D" }}>
        <div className="container">
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "#FF6B2B", marginBottom: "20px" }}>SARANA</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, marginBottom: "48px" }}>Fasilitas</h2>
          <div className="fasilitas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2px" }}>
            {data.fasilitas.map((f, i) => (
              <div key={i} style={{ background: "#111111", padding: "40px", display: "flex", gap: "20px" }}>
                <div style={{ width: "44px", height: "44px", background: "#FF6B2B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{f.nama}</p>
                  <p style={{ color: "rgba(245,245,245,0.45)", fontSize: "14px", lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" style={{ background: "#111111", padding: "120px 0" }}>
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "#FF6B2B", marginBottom: "20px" }}>BERGABUNGLAH</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "48px", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
                Siap jadi <span style={{ color: "#FF6B2B" }}>animator</span> profesional?
              </h2>
              <p style={{ color: "rgba(245,245,245,0.45)", fontSize: "14px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>Hubungi kami untuk informasi pendaftaran atau kunjungan studio animasi kami.</p>
              {[
                { icon: "📍", label: "ALAMAT", val: data.contact.alamat },
                { icon: "📞", label: "TELEPON", val: data.contact.telepon },
                { icon: "🕐", label: "JAM OPERASIONAL", val: data.contact.jamOperasional },
                { icon: "✉️", label: "EMAIL", val: data.contact.email },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", border: "1px solid rgba(255,107,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#FF6B2B", marginBottom: "2px", opacity: 0.6 }}>{c.label}</p>
                    <p style={{ fontSize: "14px", color: "rgba(245,245,245,0.6)", fontWeight: 300 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "NAMA LENGKAP", placeholder: "Masukkan nama Anda", key: "nama" },
                { label: "NOMOR HP / WA", placeholder: "08xxxxxxxxxx", key: "hp" },
                { label: "KEPERLUAN", placeholder: "Pendaftaran / kunjungan / lainnya", key: "keperluan" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#FF6B2B", display: "block", marginBottom: "8px", opacity: 0.6 }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(255,107,43,0.15)", background: "rgba(245,245,245,0.04)", color: "#F5F5F5", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#FF6B2B", display: "block", marginBottom: "8px", opacity: 0.6 }}>PESAN</label>
                <textarea
                  placeholder="Tulis pesan Anda..."
                  rows={4}
                  value={formData.pesan}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pesan: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    border: "1px solid rgba(255,107,43,0.15)",
                    background: "rgba(245,245,245,0.04)",
                    color: "#F5F5F5",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>
              <button
                onClick={handleKirimWA}
                style={{ background: "#FF6B2B", color: "#fff", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "0.15em", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 700, marginTop: "8px" }}
              >
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080808", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "20px", height: "20px", background: "#FF6B2B", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "8px", fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif" }}>AN</span>
          </div>
          <p style={{ color: "rgba(245,245,245,0.25)", fontSize: "11px", letterSpacing: "0.1em", fontFamily: "'Syne', sans-serif" }}>© 2026 ANIMASI — SMK NEGERI 5 MALANG</p>
        </div>
        <p style={{ color: "rgba(245,245,245,0.15)", fontSize: "11px", letterSpacing: "0.1em", fontFamily: "'Syne', sans-serif" }}>2D · 3D · GAME ART · MOTION</p>
      </footer>
    </div>
  );
}
