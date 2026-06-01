"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const defaultData = {
  hero: {
    tagline: "Desain adalah",
    tagline2: "Bahasa Universal",
    subtitle: "Jurusan Desain Komunikasi Visual — SMK Negeri 5 Malang",
    heroImage: "/images/dkv/gambar1.jpg",
  },
  sejarah: {
    tahun: "",
    judul: "Kreativitas Tanpa Batas",
    teks: "Jurusan Desain Komunikasi Visual SMK Negeri 5 Malang hadir untuk mencetak generasi desainer profesional yang menguasai desain grafis, tipografi, fotografi, videografi, dan komunikasi visual. Kami percaya bahwa setiap karya visual adalah cerita yang menunggu untuk diceritakan.",
    image: "/images/dkv/gambar2.jpg",
  },
  stats: [
    { angka: "100+", label: "Alumni Desainer" },
    { angka: "6", label: "Guru Ahli" },
    { angka: "50+", label: "Karya Terbaik" },
    { angka: "5+", label: "Bidang Keahlian" },
  ],
  karya: {
    poster: [
      { judul: "Poster Campaign", tahun: "2024", image: "/images/dkv/po1.jpeg" },
      { judul: "Poster Sosial", tahun: "2024", image: "/images/dkv/po2.jpeg" },
      { judul: "Poster Budaya", tahun: "2023", image: "/images/dkv/po3.jpeg" },
    ],
    photography: [
      { judul: "Urban Photography", tahun: "2024", image: "/images/dkv/p1.jpeg" },
      { judul: "Portrait Series", tahun: "2024", image: "/images/dkv/p2.jpeg" },
      { judul: "Product Photography", tahun: "2023", image: "/images/dkv/p3.jpeg" },
    ],
  },
  keahlian: [
    { nama: "Desain Grafis", desc: "Menciptakan identitas visual, layout, dan materi komunikasi yang efektif dan estetis", icon: "◈" },
    { nama: "Tipografi", desc: "Menguasai seni pengaturan huruf untuk menyampaikan pesan secara visual yang kuat", icon: "Aa" },
    { nama: "Sketsa & Ilustrasi", desc: "Mengembangkan kemampuan menggambar manual dan digital sebagai dasar desain", icon: "✏" },
    { nama: "Fotografi", desc: "Teknik pengambilan gambar profesional untuk kebutuhan komersial dan artistik", icon: "◎" },
    { nama: "Videografi", desc: "Produksi konten video mulai dari konsep, pengambilan gambar, hingga editing", icon: "▷" },
    { nama: "Branding & Identitas", desc: "Merancang identitas merek yang konsisten dan berkesan di benak audiens", icon: "◇" },
  ],
  guru: [
    { nama: "Bapak Riza", image: "/images/dkv/guru3.jpg" },
    { nama: "Bapak Tri", image: "/images/dkv/guru4.jpg" },
    { nama: "Bapak Agus", image: "/images/dkv/guru2.jpg" },
    { nama: "Bapak Denys", image: "/images/dkv/guru1.jpg" },
    { nama: "Bapak Zaky", image: "" },
  ],
  fasilitas: [
    { nama: "Lab Desain", desc: "Ruang komputer dengan software desain profesional seperti Adobe Creative Suite" },
    { nama: "Studio Foto", desc: "Studio fotografi lengkap dengan lighting profesional dan berbagai backdrop" },
    { nama: "Ruang Editing", desc: "Ruang khusus editing video dan audio dengan perangkat berkualitas tinggi" },
    { nama: "Perpustakaan Visual", desc: "Koleksi buku desain, majalah kreatif, dan referensi visual internasional" },
    { nama: "Galeri Karya", desc: "Ruang pameran permanen karya terbaik siswa DKV setiap angkatan" },
    { nama: "Ruang Sketsa", desc: "Ruang gambar manual dengan peralatan lengkap untuk ilustrasi dan sketsa" },
  ],
  contact: {
    alamat: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142",
    telepon: "(0341) 478195",
    email: "dkv@smkn5malang.sch.id",
    jamOperasional: "Senin – Jumat: 07.00 – 16.00 WIB",
  },
};

export default function JurusanDKV() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });
  const [activeTab, setActiveTab] = useState("poster");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "jurusan", "dkv"));
        if (snap.exists()) {
          setData({ ...defaultData, ...snap.data() });
        }
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
    const nomorWA = "6281234567890";
    const text = `Halo DKV SMK Negeri 5 Malang!%0A%0A*Nama:* ${nama}%0A*No. HP:* ${hp}%0A*Keperluan:* ${keperluan || "-"}%0A*Pesan:* ${pesan || "-"}`;
    window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
  };

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#EEEFF2" }}>
        <p style={{ color: "#1B5FD4", letterSpacing: "0.3em", fontSize: "11px" }}>MEMUAT...</p>
      </div>
    );

  const activeKarya = data.karya[activeTab] || [];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#EEEFF2", color: "#1A1A1A", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link { color: #1A1A1A; text-decoration: none; font-size: 12px; letter-spacing: 0.08em; opacity: 0.6; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; color: #1B5FD4; }
        .btn-primary { background: linear-gradient(135deg, #1B5FD4 0%, #3B9EF5 100%); color: white; border: none; padding: 14px 36px; font-size: 11px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.3s; font-family: inherit; font-weight: 600; border-radius: 2px; }
        .btn-primary:hover { background: linear-gradient(135deg, #3B9EF5 0%, #1B5FD4 100%); transform: scale(1.02); }
        .btn-outline { background: transparent; color: #1A1A1A; border: 1px solid #1B5FD4; padding: 13px 36px; font-size: 11px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.2s; font-family: inherit; border-radius: 2px; }
        .btn-outline:hover { border-color: #3B9EF5; color: #1B5FD4; background: rgba(27,95,212,0.05); }
        .section { padding: 120px 0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .label { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #1B5FD4; margin-bottom: 20px; }
        .karya-card:hover .karya-overlay { opacity: 1; }
        .karya-overlay { opacity: 0; transition: opacity 0.3s; background: linear-gradient(135deg, rgba(27,95,212,0.95) 0%, rgba(59,158,245,0.95) 100%) !important; }
        .tab-btn { background: none; border: none; font-family: inherit; cursor: pointer; font-size: 11px; letter-spacing: 0.2em; padding: 10px 24px; transition: all 0.2s; border-radius: 2px; }
        .guru-card:hover .guru-info { opacity: 1; }
        .guru-info { opacity: 0; transition: opacity 0.3s; background: linear-gradient(135deg, rgba(27,95,212,0.95) 0%, rgba(59,158,245,0.95) 100%) !important; }
        @media (max-width: 768px) {
          .container { padding: 0 24px; }
          .section { padding: 72px 0; }
          .hero-title { font-size: 48px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .karya-grid { grid-template-columns: repeat(1, 1fr) !important; }
          .guru-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .fasilitas-grid { grid-template-columns: repeat(1, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .sejarah-grid { grid-template-columns: 1fr !important; }
          .keahlian-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-links { display: none !important; }
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
          background: "rgba(238,239,242,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(27,95,212,0.2)",
          padding: "0 48px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #1B5FD4, #3B9EF5)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" }}>
            <span style={{ color: "white", fontSize: "13px", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" }}>D</span>
          </div>
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.2em",
              fontWeight: "500",
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, #1B5FD4, #3B9EF5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DKV
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "40px" }}>
          {["Sejarah", "Karya", "Keahlian", "Guru", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a
          href="/admin/login?jurusan=dkv"
          style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#1B5FD4", textDecoration: "none", border: "1px solid rgba(27,95,212,0.4)", padding: "6px 16px", transition: "all 0.2s", borderRadius: "2px" }}
        >
          ADMIN
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", paddingTop: "60px", position: "relative", overflow: "hidden", paddingBottom: "80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${data.hero.heroImage}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)" }}></div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(238,239,242,0.1) 0%, rgba(238,239,242,0.95) 90%)" }}></div>

        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px" }}>
            <div style={{ maxWidth: "700px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#1B5FD4", marginBottom: "32px", fontWeight: "500" }}>SMK NEGERI 5 MALANG — DESAIN KOMUNIKASI VISUAL</p>
              <h1 className="hero-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "80px", color: "#1A1A1A", lineHeight: 1.0, fontWeight: 700, marginBottom: "8px" }}>
                {data.hero.tagline}
              </h1>
              <h1
                className="hero-title"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "80px",
                  background: "linear-gradient(135deg, #1B5FD4, #3B9EF5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.0,
                  fontWeight: 700,
                  marginBottom: "40px",
                }}
              >
                {data.hero.tagline2}
              </h1>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}>
                  LIHAT KARYA
                </button>
                <button className="btn-outline" onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}>
                  HUBUNGI KAMI
                </button>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "13px", color: "#1A1A1A", lineHeight: 1.8, maxWidth: "280px", background: "rgba(238,239,242,0.8)", padding: "12px" }}>{data.hero.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "white", padding: "0", borderTop: "1px solid rgba(27,95,212,0.15)", borderBottom: "1px solid rgba(27,95,212,0.15)" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ padding: "48px 32px", borderRight: i < 3 ? "1px solid rgba(27,95,212,0.15)" : "none" }}>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "48px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #1B5FD4, #3B9EF5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}
                >
                  {s.angka}
                </p>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#1B5FD4", marginTop: "10px", fontWeight: "500" }}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section id="sejarah" className="section" style={{ background: "#EEEFF2" }}>
        <div className="container">
          <div className="sejarah-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "96px", alignItems: "center" }}>
            <div>
              <p className="label">Tentang Kami</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "44px", lineHeight: 1.15, marginBottom: "32px", fontWeight: 600, color: "#1A1A1A" }}>{data.sejarah.judul}</h2>
              <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #1B5FD4, #3B9EF5)", marginBottom: "28px" }}></div>
              <p style={{ color: "#4A4A4A", lineHeight: 1.9, fontSize: "15px" }}>{data.sejarah.teks}</p>
              {data.sejarah.tahun && <p style={{ marginTop: "36px", fontSize: "10px", letterSpacing: "0.25em", color: "#1B5FD4", fontWeight: "500" }}>BERDIRI SEJAK {data.sejarah.tahun}</p>}
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "#D8DBE4" }}>
                {data.sejarah.image ? (
                  <img src={data.sejarah.image} alt="Sejarah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "80px", color: "rgba(27,95,212,0.1)", fontWeight: 700 }}>DKV</span>
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", top: "-16px", left: "-16px", width: "80px", height: "80px", border: "1px solid #1B5FD4", zIndex: -1 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p className="label">Portofolio</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "44px", fontWeight: 600, color: "#1A1A1A" }}>Karya Siswa</h2>
            </div>
            <div style={{ display: "flex", border: "1px solid rgba(27,95,212,0.3)", borderRadius: "2px" }}>
              {[
                { key: "poster", label: "POSTER" },
                { key: "photography", label: "PHOTOGRAPHY" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className="tab-btn"
                  onClick={() => setActiveTab(tab.key)}
                  style={{ color: activeTab === tab.key ? "white" : "#1B5FD4", background: activeTab === tab.key ? "linear-gradient(135deg, #1B5FD4, #3B9EF5)" : "transparent", fontWeight: "500" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="karya-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
            {activeKarya.map((k, i) => (
              <div key={i} className="karya-card" style={{ position: "relative", aspectRatio: activeTab === "poster" ? "2/3" : "4/3", background: "#D8DBE4", overflow: "hidden" }}>
                {k.image ? (
                  <img src={k.image} alt={k.judul} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#D8DBE4" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", color: "rgba(27,95,212,0.15)", fontWeight: 700 }}>{activeTab === "poster" ? "POSTER" : "PHOTO"}</span>
                  </div>
                )}
                <div
                  className="karya-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(27,95,212,0.95) 0%, rgba(59,158,245,0.95) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "24px",
                    opacity: 0,
                  }}
                >
                  <p style={{ color: "white", fontSize: "10px", letterSpacing: "0.2em", fontWeight: "bold" }}>{k.tahun}</p>
                  <p style={{ color: "white", fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", marginTop: "6px", fontWeight: 700 }}>{k.judul}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEAHLIAN */}
      <section id="keahlian" className="section" style={{ background: "#EEEFF2" }}>
        <div className="container">
          <p className="label">Kurikulum</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "44px", fontWeight: 600, marginBottom: "56px", color: "#1A1A1A" }}>Yang Dipelajari</h2>
          <div className="keahlian-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#D8DBE4" }}>
            {data.keahlian.map((k, i) => (
              <div
                key={i}
                style={{ background: "white", padding: "40px 36px", transition: "all 0.3s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F0F4FF";
                  e.currentTarget.style.borderLeft = "3px solid #1B5FD4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderLeft = "3px solid transparent";
                }}
              >
                <p style={{ fontSize: "24px", color: "#1B5FD4", marginBottom: "20px", fontFamily: "'Space Grotesk', sans-serif" }}>{k.icon}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: "600", fontSize: "16px", marginBottom: "12px", color: "#1A1A1A" }}>{k.nama}</p>
                <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.75 }}>{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section id="guru" className="section" style={{ background: "white" }}>
        <div className="container">
          <p className="label">Tim Pengajar</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "44px", fontWeight: 600, marginBottom: "56px", color: "#1A1A1A" }}>Guru Pengajar</h2>
          <div className="guru-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "3px" }}>
            {data.guru.map((g, i) => (
              <div key={i} className="guru-card" style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ aspectRatio: "3/4", background: "#D8DBE4", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {g.image ? (
                    <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "48px", color: "rgba(27,95,212,0.2)", fontWeight: 700 }}>{g.nama?.split(" ").pop()?.charAt(0) || "?"}</span>
                  )}
                </div>
                <div
                  className="guru-info"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(27,95,212,0.95) 0%, rgba(59,158,245,0.95) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "20px",
                    opacity: 0,
                  }}
                >
                  <p style={{ color: "white", fontWeight: "700", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif" }}>{g.nama}</p>
                  <p style={{ color: "white", fontSize: "11px", marginTop: "6px", lineHeight: 1.5, opacity: 0.9 }}>{g.jabatan}</p>
                </div>
                <div style={{ padding: "16px 12px", background: "#EEEFF2" }}>
                  <p style={{ color: "#1A1A1A", fontWeight: "500", fontSize: "13px" }}>{g.nama}</p>
                  <p style={{ color: "#1B5FD4", fontSize: "11px", marginTop: "4px", lineHeight: 1.4 }}>{g.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" className="section" style={{ background: "#EEEFF2" }}>
        <div className="container">
          <p className="label">Sarana</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "44px", fontWeight: 600, marginBottom: "56px", color: "#1A1A1A" }}>Fasilitas</h2>
          <div className="fasilitas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#D8DBE4" }}>
            {data.fasilitas.map((f, i) => (
              <div
                key={i}
                style={{ background: "white", padding: "40px 36px", transition: "all 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F4FF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", color: "rgba(27,95,212,0.2)", marginBottom: "20px", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</p>
                <p style={{ fontWeight: "600", fontSize: "15px", marginBottom: "12px", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif" }}>{f.nama}</p>
                <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section" style={{ background: "white" }}>
        <div className="container">
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "96px" }}>
            <div>
              <p className="label">Bergabunglah</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "44px", lineHeight: 1.15, marginBottom: "20px", fontWeight: 600, color: "#1A1A1A" }}>
                Wujudkan kreativitasmu bersama <em style={{ color: "#1B5FD4", fontStyle: "italic" }}>DKV SMKN 5</em>
              </h2>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.8, marginBottom: "40px" }}>Hubungi kami untuk informasi pendaftaran, kunjungan studio, atau sekadar bertanya.</p>
              {[
                { icon: "◎", label: "ALAMAT", val: data.contact.alamat },
                { icon: "◎", label: "TELEPON", val: data.contact.telepon },
                { icon: "◎", label: "JAM OPERASIONAL", val: data.contact.jamOperasional },
                { icon: "◎", label: "EMAIL", val: data.contact.email },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "flex-start" }}>
                  <span style={{ color: "#1B5FD4", fontSize: "16px", marginTop: "1px" }}>{c.icon}</span>
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#1B5FD4", marginBottom: "4px", fontWeight: "500" }}>{c.label}</p>
                    <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {[
                { label: "NAMA LENGKAP", placeholder: "Masukkan nama Anda", key: "nama" },
                { label: "NOMOR HP / WA", placeholder: "08xxxxxxxxxx", key: "hp" },
                { label: "KEPERLUAN", placeholder: "Informasi pendaftaran / kunjungan / lainnya", key: "keperluan" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#1B5FD4", display: "block", marginBottom: "10px", fontWeight: "500" }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "12px 0", border: "none", borderBottom: "1px solid rgba(27,95,212,0.3)", background: "transparent", fontSize: "14px", outline: "none", fontFamily: "inherit", color: "#1A1A1A" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#1B5FD4", display: "block", marginBottom: "10px", fontWeight: "500" }}>PESAN</label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                  value={formData.pesan}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pesan: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    border: "none",
                    borderBottom: "1px solid rgba(27,95,212,0.3)",
                    background: "transparent",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "#1A1A1A",
                    resize: "vertical",
                  }}
                />
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "8px" }} onClick={handleKirimWA}>
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1A1A1A", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <p style={{ color: "#888", fontSize: "11px", letterSpacing: "0.12em" }}>© 2026 DKV — SMK NEGERI 5 MALANG</p>
        <p style={{ background: "linear-gradient(135deg, #1B5FD4, #3B9EF5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "11px", letterSpacing: "0.12em", fontWeight: "bold" }}>
          DESAIN • TIPOGRAFI • FOTOGRAFI • VIDEOGRAFI • BRANDING
        </p>
      </footer>
    </div>
  );
}
