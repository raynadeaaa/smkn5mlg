"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const defaultData = {
  hero: {
    tagline: "Membangun Jaringan,",
    tagline2: "Menghubungkan Dunia",
    subtitle: "Jurusan Teknik Jaringan Komputer & Telekomunikasi — SMK Negeri 5 Malang",
    heroImage: "/images/tjkt/awal.jpg",
  },
  sejarah: {
    tahun: "2005",
    judul: "Teknisi Jaringan Masa Depan",
    teks: "Jurusan TJKT SMK Negeri 5 Malang berdiri di pertengahan tahun 2000-an, hadir untuk mencetak teknisi jaringan komputer dan telekomunikasi yang kompeten. Kami melatih siswa dalam instalasi jaringan, pemasangan CCTV, perakitan komputer, dan berbagai keahlian teknologi informasi yang dibutuhkan industri.",
    image: "/images/tjkt/sejarah.jpg",
  },
  stats: [
    { angka: "20+", label: "Tahun Berdiri" },
    { angka: "7", label: "Guru Ahli" },
    { angka: "100+", label: "Alumni Profesional" },
    { angka: "4+", label: "Kompetensi Keahlian" },
  ],
  karya: [
    { judul: "Instalasi Jaringan LAN/WAN", image: "/images/tjkt/karya1.jpg" },
    { judul: "Pemasangan CCTV & Keamanan", image: "/images/tjkt/karya2.jpg" },
    { judul: "Rakit Komputer Spesifikasi Tinggi", image: "/images/tjkt/karya3.jpg" },
    { judul: "Konfigurasi Server & Router", image: "/images/tjkt/karya4.jpg" },
  ],
  prestasi: [
    { judul: "Partisipan LKS Jaringan Komputer", tahun: "2024", tingkat: "Kota", keterangan: "Bidang TJKT" },
    { judul: "Sertifikasi Cisco Networking", tahun: "2023", tingkat: "Nasional", keterangan: "Siswa Berprestasi" },
  ],
  guru: [
    { nama: "Bu Ina", jabatan: "Kepala Jurusan TJKT", image: "" },
    { nama: "Pak Pardi", jabatan: "Guru Jaringan Komputer", image: "/images/tjkt/guru2.jpg" },
    { nama: "Pak Basith", jabatan: "Guru Teknik Komputer", image: "/images/tjkt/guru1.jpg" },
    { nama: "Pak Andi", jabatan: "Guru Telekomunikasi", image: "/images/tjkt/guru4.jpg" },
    { nama: "Pak Ari", jabatan: "Guru Jaringan & CCTV", image: "/images/tjkt/guru5.jpg" },
    { nama: "Pak Win", jabatan: "Guru Teknik Jaringan", image: "/images/tjkt/guru6.jpg" },
    { nama: "Pak Zaky", jabatan: "Guru Komputer & Server", image: "" },
  ],
  fasilitas: [
    { nama: "Lab Jaringan", desc: "Ruang praktik instalasi jaringan LAN, WAN, dan fiber optik dengan peralatan lengkap" },
    { nama: "Lab Komputer", desc: "Laboratorium perakitan dan konfigurasi komputer dengan unit terbaru" },
    { nama: "Studio CCTV", desc: "Area praktik pemasangan dan konfigurasi sistem keamanan CCTV" },
    { nama: "Server Room", desc: "Ruang server untuk praktik konfigurasi dan manajemen jaringan skala enterprise" },
  ],
  contact: {
    alamat: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142",
    telepon: "(0341) 478195",
    email: "tjkt@smkn5malang.sch.id",
    jamOperasional: "Senin – Jumat: 07.00 – 16.00 WIB",
  },
};

export default function JurusanTJKT() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "jurusan", "tjkt"));
        if (snap.exists()) setData({ ...defaultData, ...snap.data() });
      } catch (e) {
        console.log("Menggunakan data default");
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
    const nomorWA = "6285732453696";
    const text = `Halo TJKT SMK Negeri 5 Malang!%0A%0A*Nama:* ${nama}%0A*No. HP:* ${hp}%0A*Keperluan:* ${keperluan || "-"}%0A*Pesan:* ${pesan || "-"}`;
    window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
  };

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0FAF5" }}>
        <p style={{ color: "#007A3D", letterSpacing: "0.2em", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>MEMUAT...</p>
      </div>
    );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F5F9F6", color: "#003D1F", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link { color: #003D1F; text-decoration: none; font-size: 12px; letter-spacing: 0.08em; opacity: 0.5; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; }
        .section { padding: 100px 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
        .label { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #007A3D; margin-bottom: 20px; display: block; }
        .karya-card:hover .karya-overlay { opacity: 1; }
        .karya-overlay { opacity: 0; transition: opacity 0.3s; }
        .keahlian-card:hover { background: #007A3D !important; }
        .keahlian-card:hover p { color: #fff !important; opacity: 1 !important; }
        @media (max-width: 768px) {
          .container { padding: 0 24px; }
          .section { padding: 60px 0; }
          .hero-title { font-size: 48px !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .karya-grid { grid-template-columns: repeat(2,1fr) !important; }
          .guru-grid { grid-template-columns: repeat(2,1fr) !important; }
          .keahlian-grid { grid-template-columns: repeat(2,1fr) !important; }
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
          background: "rgba(245,249,246,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,122,61,0.1)",
          padding: "0 48px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", color: "#003D1F", fontFamily: "'Space Grotesk', sans-serif" }}>TJKT</p>
          <p style={{ fontSize: "10px", color: "#007A3D", letterSpacing: "0.08em" }}>SMKN 5 MALANG</p>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Sejarah", "Keahlian", "Karya", "Guru", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/admin/login?jurusan=tjkt" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#007A3D", textDecoration: "none", border: "1px solid rgba(0,122,61,0.3)", padding: "7px 16px" }}>
          ADMIN
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "#003D1F", display: "flex", alignItems: "center", paddingTop: "60px", position: "relative", overflow: "hidden" }}>
        {data.hero.heroImage && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={data.hero.heroImage} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
          </div>
        )}
        {/* Grid pattern dekorasi */}
        <div
          style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "linear-gradient(rgba(0,122,61,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,61,0.08) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        ></div>
        {/* Aksen hijau neon */}
        <div style={{ position: "absolute", right: "10%", top: "20%", width: "3px", height: "200px", background: "linear-gradient(to bottom, transparent, #00CC66, transparent)", zIndex: 2 }}></div>
        <div style={{ position: "absolute", right: "20%", top: "40%", width: "3px", height: "120px", background: "linear-gradient(to bottom, transparent, #007A3D, transparent)", zIndex: 2 }}></div>
        <div style={{ position: "absolute", right: "5%", bottom: "15%", fontSize: "180px", color: "rgba(0,204,102,0.04)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, lineHeight: 1, userSelect: "none", zIndex: 2 }}>NET</div>
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div style={{ maxWidth: "640px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00CC66", boxShadow: "0 0 12px #00CC66" }}></div>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#7EC8A0", fontFamily: "'Space Grotesk', sans-serif" }}>SMK NEGERI 5 MALANG — TJKT</p>
            </div>
            <h1 className="hero-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "72px", color: "#F5F9F6", lineHeight: 1.0, fontWeight: 700, marginBottom: "8px" }}>
              {data.hero.tagline}
            </h1>
            <h1 className="hero-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "72px", color: "#00CC66", lineHeight: 1.0, fontWeight: 300, marginBottom: "40px" }}>
              {data.hero.tagline2}
            </h1>
            <div style={{ width: "40px", height: "2px", background: "#00CC66", marginBottom: "28px" }}></div>
            <p style={{ color: "rgba(245,249,246,0.5)", fontSize: "15px", lineHeight: 1.8, marginBottom: "52px", maxWidth: "480px", fontWeight: 300 }}>{data.hero.subtitle}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#007A3D", color: "#F5F9F6", border: "none", padding: "14px 36px", fontSize: "12px", letterSpacing: "0.12em", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                LIHAT KARYA
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#F5F9F6", border: "1px solid rgba(0,204,102,0.3)", padding: "13px 36px", fontSize: "12px", letterSpacing: "0.12em", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                HUBUNGI KAMI
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 3 }}>
          <div style={{ width: "1px", height: "48px", background: "rgba(0,204,102,0.3)" }}></div>
          <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(0,204,102,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}>SCROLL</span>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#003D1F", padding: "0", borderTop: "1px solid rgba(0,122,61,0.4)" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < 3 ? "1px solid rgba(0,122,61,0.3)" : "none", textAlign: "center" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "48px", fontWeight: 700, color: "#00CC66", lineHeight: 1 }}>{s.angka}</p>
                <p style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7EC8A0", marginTop: "8px" }}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section id="sejarah" className="section">
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/3", background: "#E0F0E8", overflow: "hidden" }}>
                {data.sejarah.image ? (
                  <img src={data.sejarah.image} alt="Sejarah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "80px", color: "rgba(0,61,31,0.1)", fontWeight: 700 }}>TJKT</span>
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", bottom: "-12px", left: "-12px", width: "80px", height: "80px", border: "2px solid #007A3D", zIndex: -1 }}></div>
            </div>
            <div>
              <span className="label">Tentang Kami</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 600, lineHeight: 1.2, marginBottom: "24px" }}>{data.sejarah.judul}</h2>
              <div style={{ width: "36px", height: "2px", background: "#00CC66", marginBottom: "24px" }}></div>
              <p style={{ color: "#1A4D2E", lineHeight: 1.9, fontSize: "15px", fontWeight: 300 }}>{data.sejarah.teks}</p>
              <p style={{ marginTop: "36px", fontSize: "10px", letterSpacing: "0.2em", color: "#007A3D", opacity: 0.7 }}>BERDIRI SEJAK {data.sejarah.tahun}</p>
            </div>
          </div>
        </div>
      </section>

      {/* KEAHLIAN */}
      <section id="keahlian" style={{ background: "#003D1F", padding: "80px 0" }}>
        <div className="container">
          <span className="label" style={{ color: "#7EC8A0" }}>
            Kompetensi
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 600, color: "#F5F9F6", marginBottom: "48px" }}>Keahlian Kami</h2>
          <div className="keahlian-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px" }}>
            {[
              { keahlian: "Instalasi Jaringan", desc: "Membangun jaringan LAN, WAN, WiFi, dan fiber optik skala kecil hingga enterprise" },
              { keahlian: "Pasang CCTV", desc: "Instalasi dan konfigurasi sistem keamanan CCTV analog maupun IP Camera" },
              { keahlian: "Rakit Komputer", desc: "Perakitan, konfigurasi, dan troubleshooting perangkat keras komputer" },
              { keahlian: "Server & Router", desc: "Konfigurasi server, router, switch, dan manajemen jaringan berbasis Cisco" },
            ].map((t, i) => (
              <div key={i} className="keahlian-card" style={{ background: "#004D26", padding: "36px 28px", cursor: "default", transition: "background 0.2s" }}>
                <p style={{ fontSize: "28px", marginBottom: "16px" }}>{t.icon}</p>
                <p style={{ color: "#F5F9F6", fontSize: "14px", fontWeight: "600", marginBottom: "10px", fontFamily: "'Space Grotesk', sans-serif" }}>{t.keahlian}</p>
                <p style={{ color: "rgba(245,249,246,0.5)", fontSize: "13px", lineHeight: 1.7, fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="section" style={{ background: "#EDF5F0" }}>
        <div className="container">
          <span className="label">Portofolio</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 600, marginBottom: "48px" }}>Hasil Karya & Proyek</h2>
          <div className="karya-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3px" }}>
            {data.karya.map((k, i) => (
              <div key={i} className="karya-card" style={{ position: "relative", aspectRatio: "1/1", background: "#C8E6D4", overflow: "hidden" }}>
                {k.image ? (
                  <img src={k.image} alt={k.judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? "#C8E6D4" : "#B8DEC8" }}>
                    <span style={{ fontSize: "48px" }}>{["🌐", "📷", "🖥️", "⚡"][i]}</span>
                  </div>
                )}
                <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,61,31,0.92)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px" }}>
                  <p style={{ color: "#00CC66", fontSize: "10px", letterSpacing: "0.18em", fontFamily: "'Space Grotesk', sans-serif" }}>{k.tahun}</p>
                  <p style={{ color: "#F5F9F6", fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 500, marginTop: "4px" }}>{k.judul}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section id="guru" className="section">
        <div className="container">
          <span className="label">Tim Pengajar</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 600, marginBottom: "48px" }}>Guru Pengajar</h2>
          <div className="guru-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3px" }}>
            {data.guru.map((g, i) => (
              <div key={i} style={{ background: "#EDF5F0", borderTop: i === 0 ? "3px solid #007A3D" : "3px solid transparent" }}>
                <div style={{ aspectRatio: "1/1", background: "#C8E6D4", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {g.image ? (
                    <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 700, color: "rgba(0,61,31,0.15)" }}>{g.nama.split(" ").pop().charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>{g.nama}</p>
                  <p style={{ fontSize: "11px", color: "#007A3D", letterSpacing: "0.04em", opacity: 0.8, lineHeight: 1.5 }}>{g.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" className="section" style={{ background: "#EDF5F0" }}>
        <div className="container">
          <span className="label">Sarana & Prasarana</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 600, marginBottom: "48px" }}>Fasilitas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "3px" }}>
            {data.fasilitas.map((f, i) => (
              <div key={i} style={{ background: "#F5F9F6", padding: "40px", borderLeft: "3px solid #00CC66" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700, color: "rgba(0,122,61,0.12)", marginBottom: "16px" }}>{String(i + 1).padStart(2, "0")}</p>
                <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>{f.nama}</p>
                <p style={{ color: "#1A4D2E", fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section" style={{ background: "#003D1F" }}>
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <span className="label" style={{ color: "#7EC8A0" }}>
                Bergabunglah
              </span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 600, color: "#F5F9F6", lineHeight: 1.2, marginBottom: "20px" }}>
                Tertarik bergabung di <span style={{ color: "#00CC66" }}>TJKT?</span>
              </h2>
              <p style={{ color: "rgba(245,249,246,0.45)", fontSize: "14px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>Hubungi kami untuk informasi pendaftaran, kunjungan lab, atau bertanya seputar jurusan TJKT.</p>
              {[
                { icon: "📍", label: "ALAMAT", val: data.contact.alamat },
                { icon: "📞", label: "TELEPON", val: data.contact.telepon },
                { icon: "🕐", label: "JAM OPERASIONAL", val: data.contact.jamOperasional },
                { icon: "✉️", label: "EMAIL", val: data.contact.email },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", border: "1px solid rgba(0,204,102,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#7EC8A0", marginBottom: "2px", opacity: 0.6 }}>{c.label}</p>
                    <p style={{ fontSize: "14px", color: "rgba(245,249,246,0.7)", fontWeight: 300 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "NAMA LENGKAP", placeholder: "Masukkan nama Anda", key: "nama" },
                { label: "NOMOR HP / WA", placeholder: "08xxxxxxxxxx", key: "hp" },
                { label: "KEPERLUAN", placeholder: "Informasi pendaftaran / kunjungan / lainnya", key: "keperluan" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7EC8A0", display: "block", marginBottom: "8px", opacity: 0.6 }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(0,204,102,0.15)", background: "rgba(245,249,246,0.05)", color: "#F5F9F6", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7EC8A0", display: "block", marginBottom: "8px", opacity: 0.6 }}>PESAN</label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                  value={formData.pesan}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pesan: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    border: "1px solid rgba(0,204,102,0.15)",
                    background: "rgba(245,249,246,0.05)",
                    color: "#F5F9F6",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>
              <button
                onClick={handleKirimWA}
                style={{ background: "#007A3D", color: "#F5F9F6", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "0.15em", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, marginTop: "8px" }}
              >
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#001F10", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ color: "rgba(245,249,246,0.25)", fontSize: "11px", letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif" }}>© 2026 TJKT — SMK NEGERI 5 MALANG</p>
        <p style={{ color: "rgba(245,249,246,0.25)", fontSize: "11px", letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif" }}>JARINGAN · CCTV · KOMPUTER · SERVER</p>
      </footer>
    </div>
  );
}
